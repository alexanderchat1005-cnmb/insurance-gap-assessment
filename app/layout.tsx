import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "保障裸奔指数 — 柏泰保险经纪 Better",
  description: "13道灵魂拷问，测出你的家庭保障缺口。柏泰保险经纪提供的免费自测工具。",
  openGraph: {
    title: "保障裸奔指数 — 测测你的人生，还能撑几集",
    description: "13道灵魂拷问，测出你的家庭保障缺口",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
