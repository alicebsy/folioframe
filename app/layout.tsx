import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://folioframe-lake.vercel.app"),
  title: "Folioframe — 경험이 증거가 되는 포트폴리오",
  description: "역할과 문제 해결 과정을 중심으로 완성하는 웹 포트폴리오",
  openGraph: {
    title: "Folioframe — 경험이 증거가 되는 포트폴리오",
    description: "역할과 문제 해결 과정, 성과 근거를 한 편의 프로젝트 이야기로 정리하세요.",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/og.png", width: 1716, height: 918, alt: "Folioframe 프로젝트 포트폴리오" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Folioframe — 경험이 증거가 되는 포트폴리오",
    description: "역할과 문제 해결 과정, 성과 근거를 한 편의 프로젝트 이야기로 정리하세요.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
