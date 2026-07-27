import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folioframe — 경험이 증거가 되는 포트폴리오",
  description: "역할과 문제 해결 과정을 중심으로 완성하는 웹 포트폴리오",
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
