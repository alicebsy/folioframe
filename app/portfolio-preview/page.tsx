import PublicPortfolio from "@/components/PublicPortfolio";
import type { Portfolio, Project } from "@/lib/models";

const portfolio: Portfolio = {
  id: "preview-portfolio",
  name: "김코덱스",
  jobTitle: "프로덕트 매니저",
  bio: "복잡한 사용자 문제를 단순한 제품 경험으로 바꿉니다.",
  contactEmail: "hello@folioframe.kr",
  slug: "kim-codex",
  isPublished: true,
  publishedAt: "2026-07-27T00:00:00.000Z",
};

const projects: Project[] = [
  {
    id: "preview-project-1",
    title: "취업 포트폴리오 경험 재설계",
    summary:
      "취업 준비생이 자신의 기여와 문제 해결 과정을 선명하게 전달하도록 돕는 작성 경험을 설계했습니다.",
    role: "사용자 인터뷰 설계, 문제 정의, MVP 우선순위 수립을 담당했습니다.",
    problem:
      "기존 포트폴리오는 결과물 중심이라 지원자의 실제 기여 범위를 파악하기 어려웠습니다.",
    troubleshooting:
      "취업 준비생과 채용 담당자를 인터뷰하고 역할·문제·해결·성과 순서의 작성 프레임을 설계했습니다.",
    result:
      "프로젝트당 평균 작성 시간을 42분에서 25분으로 줄이고 기여도 이해 점수를 38% 높였습니다.",
    evidence: "사용성 테스트 기록과 작성 시간 측정표에서 확인했습니다.",
    periodStart: "2026-01",
    periodEnd: "2026-03",
    teamSize: "3명",
    contribution: "제품 기획 전담",
    techStacks: ["Figma", "Notion", "SQL"],
    coverImageUrl: "/og.png",
    isPublic: true,
    displayOrder: 0,
    links: [
      {
        label: "실제 서비스",
        url: "https://folioframe-lake.vercel.app",
      },
      {
        label: "GitHub 저장소",
        url: "https://github.com/alicebsy/folioframe",
      },
    ],
  },
];

export default function PortfolioPreviewPage() {
  return <PublicPortfolio data={{ portfolio, projects }} />;
}
