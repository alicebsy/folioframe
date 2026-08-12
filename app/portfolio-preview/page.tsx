import PublicPortfolio from "@/components/PublicPortfolio";
import type { Portfolio, PortfolioTheme, Project } from "@/lib/models";

export const portfolio: Portfolio = {
  id: "preview-portfolio",
  name: "김코덱스",
  profileImageUrl: "",
  jobTitle: "프론트엔드 개발자",
  bio: "사용자 경험과 안정적인 구조를 함께 설계하는 프론트엔드 개발자입니다.",
  contactEmail: "hello@folioframe.kr",
  slug: "kim-codex",
  isPublished: true,
  publishedAt: "2026-07-27T00:00:00.000Z",
  theme: "editorial",
  experienceLevel: "주니어 · 웹 애플리케이션 개발",
  interests: "프론트엔드 아키텍처 · 웹 성능 · 개발자 경험",
  strengths: ["문제 원인 추적", "유지보수 가능한 설계", "끝까지 운영"],
  coreSkills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Playwright", "Vercel"],
  aboutMe: "화면을 구현하는 데서 멈추지 않고, 사용자가 겪는 문제와 코드가 오래 유지될 구조를 함께 고민하는 개발자입니다. 모호한 문제를 재현 가능한 단위로 나누고 실제 동작으로 검증하는 과정에 몰입합니다.",
  workStyle: "문제를 재현한 뒤 가설과 로그를 남기고, 작은 단위로 구현해 빠르게 검증합니다. 코드 리뷰에서 선택의 이유를 설명하고 팀이 다시 사용할 수 있는 문서와 컴포넌트를 남깁니다.",
  values: "빠르게 만드는 것과 안정적으로 운영하는 것 사이의 균형, 그리고 동료가 이해할 수 있는 코드를 중요하게 생각합니다.",
  lookingFor: "사용자와 가까운 웹 제품을 만들며 프론트엔드 구조, 성능, 품질을 함께 책임지는 개발자로 성장하고 싶습니다.",
  aspiration: "좋은 동료와 함께 복잡한 문제를 단순한 경험으로 바꾸고, 오래 쓰이는 제품을 만드는 개발자가 되고 싶습니다.",
  aspirationTitle: "오래 쓰이는 제품을 만드는 개발자",
  resumeUrl: "https://folioframe-lake.vercel.app/portfolio-preview",
  githubUrl: "https://github.com/alicebsy/folioframe",
  linkedinUrl: "https://www.linkedin.com/",
  blogUrl: "https://medium.com/",
  careers: [
    { id: "career-preview-1", organization: "Folioframe", role: "프론트엔드 개발 · 개인 프로젝트", period: "2026.01 – 현재", description: "Next.js 기반 포트폴리오 작성·발행 흐름을 설계하고 데이터 저장부터 배포까지 구현했습니다." },
    { id: "career-preview-2", organization: "웹 개발 스터디", role: "프론트엔드 팀원", period: "2025.07 – 2025.12", description: "React 렌더링, 테스트 자동화, 웹 성능 사례를 학습하고 코드 리뷰를 통해 개선 내용을 공유했습니다." },
  ],
  educations: [
    { id: "education-preview-1", school: "한국대학교", major: "컴퓨터공학과", period: "2022.03 – 2026.02", description: "자료구조, 데이터베이스, 운영체제, 웹 프로그래밍을 학습하고 개발 동아리에서 팀 프로젝트와 코드 리뷰를 경험했습니다." },
  ],
  certificates: [
    { id: "certificate-preview-1", name: "정보처리기사", issuer: "한국산업인력공단", issuedAt: "2025.06", credentialUrl: "https://www.q-net.or.kr/" },
    { id: "certificate-preview-2", name: "SQL 개발자 (SQLD)", issuer: "한국데이터산업진흥원", issuedAt: "2024.09", credentialUrl: "https://www.dataq.or.kr/" },
  ],
};

export const projects: Project[] = [
  {
    id: "preview-project-1",
    title: "개발자 포트폴리오 빌더 Folioframe",
    summary:
      "개발자가 기술 선택과 문제 해결 과정을 구조적으로 기록하고 하나의 링크로 발행할 수 있는 웹 서비스를 개발했습니다.",
    role: "정보 구조 설계, Next.js 화면 구현, PostgreSQL 데이터 모델링, 인증과 Vercel 배포를 담당했습니다.",
    problem:
      "개발 프로젝트 설명이 기술 목록과 결과 화면에 치우쳐 면접관이 구현 판단과 실제 기여를 파악하기 어려웠습니다.",
    troubleshooting:
      "입력 상태를 한 컴포넌트에서 관리하던 구조를 프로필·프로젝트 단위로 분리하고, 서버 검증과 미리보기 데이터를 같은 타입으로 연결했습니다.",
    result:
      "프로필 작성, 프로젝트 편집, 테마 선택, 공개 발행이 하나의 데이터 흐름으로 동작하며 실제 배포 환경에서 사용할 수 있게 했습니다.",
    targetAudience: "기술 선택과 문제 해결 과정을 정리해 취업 포트폴리오로 발행하려는 개발자",
    goal: "개발자의 기여 범위와 구현 판단을 면접관이 빠르게 이해할 수 있는 작성·발행 경험을 만드는 것",
    constraints: "로그인 사용자 데이터와 공개 페이지를 분리하면서도 미리보기와 실제 발행 화면이 동일하게 보여야 했습니다.",
    keyDecision: "Next.js App Router에서 서버 데이터 조회와 클라이언트 편집 상태를 분리하고 공통 Portfolio·Project 타입을 기준으로 연결했습니다.",
    collaboration: "사용자 피드백을 이슈 단위로 정리하고 디자인 변경과 데이터 구조 변경을 작은 배포 단위로 검증했습니다.",
    learnings: "화면 구조를 먼저 확장하면 데이터 모델이 뒤따라 복잡해지므로, 입력·저장·발행 구조를 함께 설계해야 한다는 점을 배웠습니다.",
    nextTime: "이미지 업로드 저장소와 자동화 테스트 범위를 확장하고 실제 개발자 인터뷰로 항목별 유용성을 검증하겠습니다.",
    evidence: "배포된 서비스, GitHub 커밋 기록, 주요 화면의 브라우저 테스트로 동작을 확인했습니다.",
    periodStart: "2026-01",
    periodEnd: "2026-03",
    teamSize: "3명",
    contribution: "기획·설계·개발·배포 100%",
    techStacks: ["TypeScript", "React", "Next.js", "PostgreSQL", "CSS", "Vercel"],
    architecture: "App Router 기반 서버 컴포넌트에서 공개 데이터를 조회하고, 대시보드 편집은 클라이언트 상태와 API 라우트로 분리했습니다. Portfolio와 Project 타입을 공통 계약으로 사용했습니다.",
    qualityAssurance: "TypeScript 타입 검사와 프로덕션 빌드를 기본 검증으로 사용하고, 로그인·편집·미리보기·발행 경로를 브라우저에서 반복 확인했습니다.",
    deployment: "GitHub 저장소와 Vercel을 연결해 변경 사항을 미리보기 배포에서 검수한 뒤 프로덕션에 반영하고, PostgreSQL 스키마는 반복 실행 가능한 ALTER 문으로 관리했습니다.",
    coverImageUrl: "/og.png",
    videoUrl: "",
    isPublic: true,
    isFeatured: true,
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
    title: "실시간 이슈 모니터링 대시보드",
    summary: "여러 저장소의 이슈와 배포 상태를 한 화면에서 확인하고 장애 상황에서도 핵심 정보를 유지하는 대시보드를 구현했습니다.",
    role: "프론트엔드 구조 설계, API 상태 관리, 오류 복구 UI와 테스트 코드 작성을 담당했습니다.",
    problem: "여러 API의 응답 속도와 실패 조건이 달라 일부 요청이 실패하면 전체 화면이 비거나 같은 요청이 반복되는 문제가 있었습니다.",
    troubleshooting: "요청 키를 기준으로 캐시를 통합하고 독립적인 오류 경계를 적용했습니다. 마지막 정상 데이터를 유지하면서 실패한 영역만 다시 요청하도록 구성했습니다.",
    result: "중복 요청을 줄이고 일부 API가 실패해도 나머지 정보와 마지막 정상 상태를 계속 확인할 수 있게 했습니다.",
    targetAudience: "여러 저장소와 배포 환경을 함께 관리하는 소규모 개발팀",
    goal: "실패에 강하고 상태 변화의 원인을 빠르게 추적할 수 있는 운영 화면을 만드는 것",
    constraints: "외부 API 요청 제한을 지켜야 했고 각 데이터의 갱신 주기와 오류 형식이 달랐습니다.",
    keyDecision: "모든 데이터를 하나의 요청으로 묶지 않고 쿼리 키별 캐시와 오류 경계를 사용해 화면을 독립적으로 복구하도록 했습니다.",
    collaboration: "백엔드 응답 형식과 오류 코드를 문서로 합의하고 QA 시나리오를 함께 작성해 실패 조건을 재현했습니다.",
    learnings: "정상 상태만 구현하는 것보다 로딩·빈 결과·부분 실패·재시도 상태를 먼저 정의하면 운영 화면의 신뢰도가 높아진다는 점을 배웠습니다.",
    nextTime: "실제 오류 추적 도구와 연결하고 장시간 실행 시 캐시 갱신과 메모리 사용량을 관찰하겠습니다.",
    evidence: "API 실패 시나리오 테스트, 네트워크 요청 기록, 주요 상태별 화면 캡처로 확인했습니다.",
    periodStart: "2025-09",
    periodEnd: "2025-11",
    teamSize: "4명",
    contribution: "프론트엔드 개발 80%",
    techStacks: ["TypeScript", "React", "TanStack Query", "Vitest", "MSW"],
    architecture: "서버 상태는 TanStack Query의 쿼리 키로 분리하고 화면 상태는 로컬 UI 상태와 구분했습니다. 각 위젯에 독립적인 오류 경계를 두어 부분 실패를 허용했습니다.",
    qualityAssurance: "MSW로 지연·빈 응답·오류 응답을 재현하고 Vitest로 캐시와 재시도 로직을 검증했습니다. 키보드 탐색과 상태 메시지도 함께 확인했습니다.",
    deployment: "미리보기 환경에서 API별 환경 변수를 분리하고 빌드 전 타입 검사와 테스트가 통과해야 배포되도록 파이프라인을 구성했습니다.",
    coverImageUrl: "/og.png",
    videoUrl: "",
    isPublic: true,
    isFeatured: false,
    displayOrder: 1,
    links: [
      { label: "GitHub 저장소", url: "https://github.com/" },
      { label: "기술 문서", url: "https://www.notion.so/" },
    ],
  },
];

export const previewThemes = new Set<PortfolioTheme>(["editorial", "minimal", "bold", "noir"]);

export default async function PortfolioPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const requestedTheme = (await searchParams).theme as PortfolioTheme | undefined;
  const theme = requestedTheme && previewThemes.has(requestedTheme)
    ? requestedTheme
    : portfolio.theme;

  return <PublicPortfolio data={{ portfolio: { ...portfolio, theme }, projects }} projectBasePath="/portfolio-preview/project" />;
}
