"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { ArchetypeResult } from "../lib/scoring";
import { DimensionScores, Archetype } from "../data/types";
import ShareCard from "./ShareCard";

interface ResultProps {
  result: ArchetypeResult;
  onRetake: () => void;
}

// Only the 4 protection dimensions show in the gap chart.
// `aware` is a soft axis that only influences archetype match.
const GAP_DIMS: Array<keyof DimensionScores> = ["life", "ci", "med", "wealth"];

const dimLabel: Record<keyof DimensionScores, string> = {
  life: "寿险",
  ci: "重疾",
  med: "医疗",
  wealth: "储蓄",
  aware: "风险认知",
};

const dimSubtitle: Record<keyof DimensionScores, string> = {
  life: "家庭责任杠杆",
  ci: "重大疾病储备",
  med: "医疗现金流",
  wealth: "财富增值与传承",
  aware: "风险认知",
};

function gapSeverity(score: number): { label: string; color: string; bg: string } {
  if (score < 30) return { label: "严重缺口", color: "#b23a48", bg: "#fce8eb" };
  if (score < 55) return { label: "明显不足", color: "#d88870", bg: "#fcefe8" };
  if (score < 75) return { label: "基本可用", color: "#c9a961", bg: "#fbf3dc" };
  return { label: "配置良好", color: "#287370", bg: "#edf3f3" };
}

function rationale(scores: DimensionScores, primary: Archetype): string {
  const gaps = GAP_DIMS
    .map((k) => ({ k, gap: 100 - scores[k] }))
    .sort((a, b) => b.gap - a.gap);
  const biggest = gaps[0];
  const aware = scores.aware;
  const awareDesc =
    aware < 30 ? "风险认知也在低位" :
    aware < 60 ? "风险认知中等" :
    "风险认知已经觉醒";
  return `你在「${dimSubtitle[biggest.k]}」上的缺口最大（${biggest.gap} 分），${awareDesc}。这与「${primary.name}」的典型画像高度吻合。`;
}

export default function Result({ result, onRetake }: ResultProps) {
  const { primary, secondary, scores } = result;
  const [showShareCard, setShowShareCard] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const reason = rationale(scores, primary);
  const today = new Date().toLocaleDateString("zh-CN");

  return (
    <>
      <div ref={resultRef} className="h-full overflow-y-auto bg-cream">
        {/* Certificate header */}
        <div className="bg-white border-b border-dashed border-teal-pale px-5 pt-5 pb-4">
          <div className="flex justify-between items-center mb-3">
            <img src="/logo.svg" alt="柏泰 Better" className="h-5 w-auto" draggable={false} />
            <span className="text-[10px] text-gray-400">{today}</span>
          </div>
          <h1 className="text-center text-2xl font-black text-teal tracking-[6px]">
            保 障 体 检 报 告
          </h1>
          <p className="text-center text-[9px] text-gray-300 mt-1">
            仅供自测参考 · 不构成销售建议
          </p>
        </div>

        {/* Archetype hero */}
        <div
          className="relative px-5 py-7 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primary.gradient[0]}, ${primary.gradient[1]})`,
          }}
        >
          {/* Brand peach dot decoration */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-white/10" />

          <div className="relative text-center text-white">
            <div className="text-5xl mb-2">{primary.emoji}</div>
            <h2 className="text-2xl font-black tracking-wide">{primary.name}</h2>
            <p className="text-xs opacity-70 mt-1 tracking-[0.15em]">
              {primary.englishName}
            </p>
            <div className="w-10 h-0.5 bg-white/60 rounded-full mx-auto my-3" />
            <p className="text-sm opacity-95 font-medium">{primary.tagline}</p>
          </div>
        </div>

        {/* Gap chart */}
        <div className="bg-white px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-black text-teal">你的保障缺口</p>
              <p className="text-[10px] text-gray-400 mt-0.5">条越长 = 缺口越大</p>
            </div>
            <div className="text-[10px] text-gray-400 text-right">
              <div>
                <span className="inline-block w-2 h-2 rounded-full bg-alarm mr-1 align-middle" />
                严重
                <span className="inline-block w-2 h-2 rounded-full bg-warning mx-1 ml-3 align-middle" />
                不足
                <span className="inline-block w-2 h-2 rounded-full bg-ok mx-1 ml-3 align-middle" />
                良好
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {GAP_DIMS.map((k) => {
              const score = scores[k];
              const gap = 100 - score;
              const sev = gapSeverity(score);
              return (
                <div key={k}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-teal">
                        {dimLabel[k]}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {dimSubtitle[k]}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: sev.color, backgroundColor: sev.bg }}
                    >
                      {sev.label} · 缺 {gap}
                    </span>
                  </div>
                  <div className="h-2 bg-teal-bg rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${gap}%`,
                        backgroundColor: sev.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Symptoms + rationale */}
        <div className="bg-white px-5 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-800 leading-relaxed mb-3">
            <span className="font-bold text-teal">人格画像：</span>
            {primary.symptoms}
          </p>
          <div className="bg-teal-bg rounded-xl p-3 border border-teal-pale/40">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-teal">匹配依据：</span>
              {reason}
            </p>
          </div>
        </div>

        {/* Soul labels */}
        <div className="bg-white px-5 pb-4">
          <div className="flex flex-wrap gap-2">
            {primary.soulLabels.map((label) => (
              <span
                key={label}
                className="bg-peach-bg text-peach-dark text-xs px-3 py-1 rounded-full font-medium border border-peach/30"
              >
                #{label}
              </span>
            ))}
          </div>
        </div>

        {/* Broker note */}
        <div className="mx-5 mt-2 mb-4 bg-peach-bg rounded-xl p-3.5 border border-peach/30">
          <p className="text-sm text-teal-dark leading-relaxed">
            <span className="font-bold">柏泰经纪人建议：</span>
            {primary.brokerNote}
          </p>
        </div>

        {/* Secondary hint */}
        <div className="text-center py-3 border-t border-dashed border-teal-pale/50 mx-5">
          <p className="text-xs text-gray-400">
            次相似人格：
            <span className="font-medium text-gray-600 ml-1">
              {secondary.emoji} {secondary.name}
            </span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 space-y-3">
          <button
            onClick={() => setShowShareCard(true)}
            className="w-full py-3.5 rounded-full font-bold text-white text-sm
              bg-gradient-to-r from-teal to-teal-mid active:scale-[0.98] transition-transform
              shadow-[0_6px_18px_rgba(0,89,86,0.25)]"
          >
            生成我的保障体检报告 📋
          </button>
          <button
            onClick={onRetake}
            className="w-full py-3 rounded-full font-medium text-gray-600 text-sm
              border border-gray-200 bg-white active:scale-[0.98] transition-transform"
          >
            再测一次 🔄
          </button>
        </div>

        {/* Broker CTA */}
        <div className="mx-5 mb-4 bg-white rounded-2xl border-2 border-teal/80 overflow-hidden
          shadow-[0_8px_24px_rgba(0,89,86,0.12)]">
          <div className="bg-gradient-to-r from-teal to-teal-mid px-4 py-3">
            <p className="text-white text-sm font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-peach" />
              玩笑归玩笑，缺口真的存在
            </p>
          </div>
          <div className="px-4 py-4">
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              每个家庭的情况不同——收入结构、家庭成员、已有保单都会影响最优配置。
              柏泰保险经纪提供 <span className="font-semibold text-teal">免费 1 对 1 保障规划</span>，
              由持牌经纪人为你解读缺口、梳理现有保单、设计专属方案。
            </p>
            <button className="w-full py-3 rounded-full font-bold text-white text-sm
              bg-peach-dark active:scale-[0.98] transition-transform
              shadow-[0_4px_12px_rgba(216,136,112,0.3)]">
              免费预约柏泰经纪人 →
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              或扫码添加顾问微信（QR 占位）
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 pt-2">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            <span className="text-teal font-semibold">柏泰保险经纪 Better</span>
             · 专业家庭保障规划
          </p>
          <p className="text-[9px] text-gray-300 mt-1">
            本测试仅为自测参考，不构成保险销售或投资建议
          </p>
          <p className="text-[9px] text-gray-300">
            许可证号：[待填] · 监管单位：[待填]
          </p>
        </div>
      </div>

      {showShareCard && (
        <ShareCard result={result} onClose={() => setShowShareCard(false)} />
      )}
    </>
  );
}
