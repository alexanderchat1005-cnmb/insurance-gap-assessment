"use client";

import { useRef, useEffect, useState } from "react";
import { ArchetypeResult } from "../lib/scoring";
import { DimensionScores } from "../data/types";

interface ShareCardProps {
  result: ArchetypeResult;
  onClose: () => void;
}

const GAP_DIMS: Array<keyof DimensionScores> = ["life", "ci", "med", "wealth"];

const dimLabel: Record<keyof DimensionScores, string> = {
  life: "寿险",
  ci: "重疾",
  med: "医疗",
  wealth: "储蓄",
  aware: "认知",
};

const BRAND_TEAL = "#005956";
const BRAND_TEAL_DARK = "#003f3d";
const BRAND_PEACH = "#f0ad90";
const BRAND_CREAM = "#fbf7f2";

function gapColor(score: number): string {
  if (score < 30) return "#b23a48";
  if (score < 55) return "#d88870";
  if (score < 75) return "#c9a961";
  return "#287370";
}

export default function ShareCard({ result, onClose }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { primary, scores } = result;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 2;
    const W = 360;
    const H = 640;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // Background (cream)
    ctx.fillStyle = BRAND_CREAM;
    ctx.fillRect(0, 0, W, H);

    // White card area
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 12, 12, W - 24, H - 24, 18);
    ctx.fill();

    // Top bar with logo mark
    // Peach circle + teal circle (柏泰 brand mark)
    ctx.fillStyle = BRAND_PEACH;
    ctx.beginPath();
    ctx.arc(38, 42, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = BRAND_TEAL;
    ctx.beginPath();
    ctx.arc(48, 48, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = BRAND_TEAL;
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("柏泰 Better", 68, 51);

    ctx.fillStyle = "#999999";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(new Date().toLocaleDateString("zh-CN"), W - 24, 46);

    // Title
    ctx.fillStyle = BRAND_TEAL;
    ctx.font = "bold 19px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("保 障 体 检 报 告", W / 2, 92);

    // Dashed separator
    ctx.strokeStyle = "#dddddd";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, 108);
    ctx.lineTo(W - 24, 108);
    ctx.stroke();
    ctx.setLineDash([]);

    // Archetype band (gradient, inset with radius)
    const bandY = 118;
    const bandH = 130;
    const grad = ctx.createLinearGradient(24, bandY, W - 24, bandY + bandH);
    grad.addColorStop(0, primary.gradient[0]);
    grad.addColorStop(1, primary.gradient[1]);
    ctx.fillStyle = grad;
    roundRect(ctx, 24, bandY, W - 48, bandH, 14);
    ctx.fill();

    // Emoji
    ctx.fillStyle = "#ffffff";
    ctx.font = "34px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(primary.emoji, W / 2, bandY + 52);

    // Name
    ctx.font = "bold 19px sans-serif";
    ctx.fillText(primary.name, W / 2, bandY + 82);

    // English name
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "9px sans-serif";
    ctx.fillText(primary.englishName, W / 2, bandY + 98);

    // Tagline
    ctx.fillStyle = "#ffffff";
    ctx.font = "11px sans-serif";
    ctx.fillText(primary.tagline, W / 2, bandY + 118);

    // Gap section title
    let y = bandY + bandH + 22;
    ctx.fillStyle = BRAND_TEAL;
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("你的保障缺口", 28, y);
    ctx.fillStyle = "#999999";
    ctx.font = "9px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("条越长 = 缺口越大", W - 28, y);
    y += 14;

    // Gap bars
    for (const k of GAP_DIMS) {
      const score = scores[k];
      const gap = 100 - score;
      const color = gapColor(score);

      ctx.fillStyle = BRAND_TEAL;
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(dimLabel[k], 28, y);

      ctx.fillStyle = color;
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`缺 ${gap}`, W - 28, y);

      // Track
      ctx.fillStyle = "#edf3f3";
      roundRect(ctx, 28, y + 5, W - 56, 6, 3);
      ctx.fill();
      ctx.fillStyle = color;
      roundRect(ctx, 28, y + 5, ((W - 56) * gap) / 100, 6, 3);
      ctx.fill();

      y += 26;
    }

    // Symptoms (truncated)
    y += 6;
    ctx.fillStyle = BRAND_TEAL;
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("人格画像", 28, y);
    y += 14;

    ctx.fillStyle = "#555555";
    ctx.font = "11px sans-serif";
    const symptomLines = wrapText(ctx, primary.symptoms, W - 56);
    const maxLines = Math.min(symptomLines.length, 3);
    for (let i = 0; i < maxLines; i++) {
      ctx.fillText(symptomLines[i], 28, y);
      y += 15;
    }
    if (symptomLines.length > maxLines) {
      // ellipsis indicator on last line
      ctx.fillStyle = "#999999";
      ctx.fillText("……（完整解读请至报告页查看）", 28, y);
    }

    // Footer band (teal)
    const footerY = H - 85;
    ctx.fillStyle = BRAND_TEAL;
    roundRect(ctx, 12, footerY, W - 24, H - 12 - footerY, 18);
    ctx.fill();
    // square off top corners by overlaying a rectangle
    ctx.fillRect(12, footerY, W - 24, 10);
    ctx.fillStyle = BRAND_TEAL;
    roundRect(ctx, 12, footerY, W - 24, H - 12 - footerY, { tl: 0, tr: 0, br: 18, bl: 18 });
    ctx.fill();

    // Peach accent dot on footer
    ctx.fillStyle = BRAND_PEACH;
    ctx.beginPath();
    ctx.arc(34, footerY + 22, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("测测你的人生，还能撑几集", 46, footerY + 26);

    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "10px sans-serif";
    ctx.fillText("长按保存 · 分享给朋友", 28, footerY + 46);

    ctx.fillStyle = BRAND_PEACH;
    ctx.font = "9px sans-serif";
    ctx.fillText("柏泰保险经纪 Better · 免费 1 对 1 保障规划", 28, footerY + 62);

    // Faded stamp
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.translate(W - 58, footerY - 10);
    ctx.rotate(-0.22);
    ctx.strokeStyle = BRAND_TEAL_DARK;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = BRAND_TEAL_DARK;
    ctx.font = "bold 8px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("保障体检", 0, -3);
    ctx.fillText("已完成", 0, 9);
    ctx.restore();

    const url = canvas.toDataURL("image/png");
    setImageUrl(url);
  }, [primary, scores]);

  const handleSave = async () => {
    if (!imageUrl) return;
    setSaving(true);
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], "保障体检报告.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "保障体检报告" });
      } else {
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = "保障体检报告.png";
        a.click();
      }
    } catch {
      // user cancel / fallback
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 text-2xl p-2 active:opacity-50"
      >
        ✕
      </button>

      <canvas ref={canvasRef} className="hidden" />

      {imageUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="保障体检报告"
            className="max-w-[85vw] max-h-[70vh] rounded-xl shadow-2xl"
          />
          <p className="text-white/60 text-xs mt-3 text-center">
            长按图片保存到相册
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-3 bg-peach text-teal-dark font-bold text-sm px-8 py-3 rounded-full
              active:scale-95 transition-transform disabled:opacity-50"
          >
            {saving ? "保存中…" : "保存图片 📲"}
          </button>
        </>
      )}
    </div>
  );
}

// Rounded rectangle — `r` can be a number or per-corner object
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | { tl: number; tr: number; br: number; bl: number }
) {
  const c = typeof r === "number" ? { tl: r, tr: r, br: r, bl: r } : r;
  ctx.beginPath();
  ctx.moveTo(x + c.tl, y);
  ctx.lineTo(x + w - c.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + c.tr);
  ctx.lineTo(x + w, y + h - c.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - c.br, y + h);
  ctx.lineTo(x + c.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - c.bl);
  ctx.lineTo(x, y + c.tl);
  ctx.quadraticCurveTo(x, y, x + c.tl, y);
  ctx.closePath();
}

// Wrap CJK text into lines
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const chars = text.split("");
  const lines: string[] = [];
  let currentLine = "";
  for (const char of chars) {
    const testLine = currentLine + char;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}
