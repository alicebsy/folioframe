import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://folioframe-lake.vercel.app"),
  title: "Folioframe — 개발 과정이 보이는 포트폴리오",
  description: "기술 선택, 구현, 테스트, 배포 과정을 중심으로 완성하는 개발자 포트폴리오",
  openGraph: {
    title: "Folioframe — 개발 과정이 보이는 포트폴리오",
    description: "기술 선택과 문제 해결, 테스트와 배포 경험을 한 편의 개발 프로젝트 이야기로 정리하세요.",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/og.png", width: 1716, height: 918, alt: "Folioframe 프로젝트 포트폴리오" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Folioframe — 개발 과정이 보이는 포트폴리오",
    description: "기술 선택과 문제 해결, 테스트와 배포 경험을 한 편의 개발 프로젝트 이야기로 정리하세요.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <script
          src="https://analytics.earnlearning.com/api/script.js"
          data-site-id="d3c62d4d64b1"
          defer
        />
      </body>
    </html>
  );
}
