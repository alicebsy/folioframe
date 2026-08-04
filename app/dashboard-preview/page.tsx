import DashboardClient from "@/components/dashboard/DashboardClient";
import type { DashboardData } from "@/lib/models";

const previewData: DashboardData = {
  user: {
    id: "preview-user",
    email: "preview@folioframe.kr",
  },
  portfolio: {
    id: "preview-portfolio",
    name: "김코덱스",
    jobTitle: "프로덕트 매니저",
    bio: "복잡한 사용자 문제를 단순한 제품 경험으로 바꿉니다.",
    contactEmail: "hello@folioframe.kr",
    slug: "kim-codex",
    isPublished: false,
    publishedAt: null,
    theme: "minimal",
    experienceLevel: "신입 · 프로젝트 경험 중심",
    interests: "사용자의 복잡한 작업을 단순하게 만드는 B2C·생산성 제품",
    strengths: ["문제 정의", "우선순위 설계", "끝까지 실행"],
    aboutMe: "관찰한 불편을 구조화하고, 작은 실험으로 답을 찾아가는 사람입니다. 낯선 문제도 사용자와 팀의 언어로 풀어내는 과정에서 가장 큰 에너지를 얻습니다.",
    workStyle: "답을 정해두기보다 먼저 질문을 선명하게 만듭니다. 공유할 수 있는 문서와 빠른 시제품으로 생각을 맞추고 끝까지 실행합니다.",
    values: "멋있어 보이는 해결책보다 실제 사용자의 하루를 나아지게 하는 변화를 중요하게 생각합니다.",
    lookingFor: "사용자 문제를 가까이에서 발견하고, 다양한 직군과 함께 제품의 처음부터 성장까지 책임지는 역할을 찾고 있습니다.",
    resumeUrl: "",
    githubUrl: "https://github.com/alicebsy/folioframe",
    linkedinUrl: "",
    blogUrl: "",
    careers: [
      { id: "career-preview-1", organization: "개인 프로젝트", role: "프로덕트 매니저", period: "2026.01 – 현재", description: "Folioframe의 문제 정의부터 기획, 구현, 배포까지 전 과정을 진행했습니다." },
    ],
  },
  projects: [
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
      targetAudience: "자신의 기여와 문제 해결 과정을 설명하기 어려운 취업 준비생",
      goal: "면접관이 프로젝트의 역할과 성과를 빠르게 이해할 수 있는 작성 구조를 만드는 것",
      constraints: "짧은 시간 안에 작성할 수 있어야 하고, 직무가 달라도 사용할 수 있어야 했습니다.",
      keyDecision: "결과물 중심 입력 대신 역할·문제·판단·성과 순서로 작성하도록 구조화했습니다.",
      collaboration: "사용자 피드백을 정리하고 우선순위를 직접 결정해 설계와 구현에 반영했습니다.",
      learnings: "정보가 많을수록 한 화면에 모두 보여주기보다 먼저 요약하고 단계적으로 공개해야 한다는 점을 배웠습니다.",
      nextTime: "실제 채용 담당자 인터뷰를 늘리고 직무별 템플릿의 효과를 검증하겠습니다.",
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
    {
      id: "preview-project-2",
      title: "쇼핑몰 전환 경험 개선",
      summary: "모바일 구매 과정의 이탈 원인을 분석한 프로젝트입니다.",
      role: "퍼널 분석과 사용자 인터뷰를 담당했습니다.",
      problem: "",
      troubleshooting: "",
      result: "",
      targetAudience: "",
      goal: "",
      constraints: "",
      keyDecision: "",
      collaboration: "",
      learnings: "",
      nextTime: "",
      evidence: "",
      periodStart: "",
      periodEnd: "",
      teamSize: "",
      contribution: "",
      techStacks: [],
      coverImageUrl: "",
      isPublic: false,
      displayOrder: 1,
      links: [],
    },
  ],
};

export default function DashboardPreviewPage() {
  return <DashboardClient initialData={previewData} previewMode />;
}
