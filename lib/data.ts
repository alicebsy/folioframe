import "server-only";
import { query } from "./db";
import type { CareerEntry, CertificateEntry, DashboardData, EducationEntry, Portfolio, PortfolioTheme, Project, ProjectAttachment, ProjectLink, ProjectMedia } from "./models";

type PortfolioRow = {
  id: string;
  name: string;
  profile_image_url: string;
  job_title: string;
  bio: string;
  contact_email: string | null;
  slug: string;
  is_published: boolean;
  published_at: Date | null;
  theme: PortfolioTheme;
  experience_level: string;
  interests: string;
  strengths: string[] | null;
  core_skills: string[] | null;
  about_me: string;
  work_style: string;
  personal_values: string;
  looking_for: string;
  aspiration: string;
  aspiration_title: string;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  blog_url: string;
  careers: CareerEntry[] | null;
  educations: EducationEntry[] | null;
  certificates: CertificateEntry[] | null;
};

type ProjectRow = {
  id: string;
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
  target_audience: string;
  goal: string;
  constraints: string;
  key_decision: string;
  collaboration: string;
  learnings: string;
  next_time: string;
  evidence: string;
  period_start: string;
  period_end: string;
  team_size: string;
  contribution: string;
  tech_stacks: string[] | null;
  architecture: string;
  quality_assurance: string;
  deployment: string;
  cover_image_url: string;
  video_url: string;
  media: ProjectMedia[] | null;
  attachments: ProjectAttachment[] | null;
  is_public: boolean;
  is_featured: boolean;
  display_order: number;
  links: ProjectLink[] | null;
};

let profileImageColumnReady: Promise<void> | null = null;
let projectMediaColumnReady: Promise<void> | null = null;
let projectAttachmentsColumnReady: Promise<void> | null = null;
let featuredColumnsReady: Promise<void> | null = null;

async function ensureProfileImageColumn() {
  if (!profileImageColumnReady) {
    profileImageColumnReady = query(
      `ALTER TABLE portfolios
         ADD COLUMN IF NOT EXISTS profile_image_url TEXT NOT NULL DEFAULT '',
         ADD COLUMN IF NOT EXISTS aspiration TEXT NOT NULL DEFAULT '',
         ADD COLUMN IF NOT EXISTS aspiration_title TEXT NOT NULL DEFAULT ''`,
    ).then(() => undefined);
  }
  await profileImageColumnReady;
}

export async function ensureProjectMediaColumn() {
  if (!projectMediaColumnReady) {
    projectMediaColumnReady = query(
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS media JSONB NOT NULL DEFAULT '[]'::jsonb`,
    ).then(() => undefined);
  }
  await projectMediaColumnReady;
}

export async function ensureProjectAttachmentsColumn() {
  if (!projectAttachmentsColumnReady) {
    projectAttachmentsColumnReady = query(
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS attachments JSONB NOT NULL DEFAULT '[]'::jsonb`,
    ).then(() => undefined);
  }
  await projectAttachmentsColumnReady;
}

export async function ensureFeaturedColumns() {
  if (!featuredColumnsReady) {
    featuredColumnsReady = query(
      `ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS featured_configured BOOLEAN NOT NULL DEFAULT FALSE;
       ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;
       UPDATE projects p
          SET is_featured = TRUE
         FROM portfolios f
        WHERE p.portfolio_id = f.id
          AND f.featured_configured = FALSE
          AND p.title IN (
            'Folioframe — 직군 맞춤형 웹 포트폴리오 서비스',
            'CapLog',
            'Love Algorithm — 알고리즘보다 어려운 건 사랑이었다'
          );
       UPDATE portfolios SET featured_configured = TRUE WHERE featured_configured = FALSE`,
    ).then(() => undefined);
  }
  await featuredColumnsReady;
}

function highlightText(raw: string, fallbackWithHighlights: string): string {
  if (!raw || raw.trim() === "") return fallbackWithHighlights;
  if (raw.includes("**")) return raw;
  // If the raw text is roughly similar to the default unhighlighted text, use the curated highlighted version
  return fallbackWithHighlights;
}

function mapPortfolio(row: PortfolioRow): Portfolio {
  const bio = row.bio && row.bio.includes("**")
    ? row.bio
    : row.bio
      ? `**${row.bio.split(".")[0].trim()}**${row.bio.includes(".") ? row.bio.slice(row.bio.indexOf(".")) : ""}`
      : "**복잡한 문제를 단순한 사용자 경험으로 전환**하고, **지속 가능한 코드 구조를 설계**하는 개발자입니다.";

  const aboutMe = highlightText(
    row.about_me,
    "화면을 구현하는 데서 멈추지 않고, **사용자가 겪는 문제와 코드가 오래 유지될 구조를 함께 고민**하는 개발자입니다. 모호한 문제를 **재현 가능한 단위로 나누고 실제 동작으로 검증**하는 과정에 몰입하며, 초·중·고 8년간의 연속 임원과 동아리 회장 경험으로 **팀의 잠재력을 이끌어내는 신뢰 기반의 협업**을 추구합니다.",
  );

  const workStyle = highlightText(
    row.work_style,
    "문제를 마주하면 먼저 **재현 경로와 가설, 로그를 남기고 작은 단위로 구현해 빠르게 검증**합니다. 코드 리뷰에서는 **기술적 선택의 이유를 명확히 설명**하고, 팀원이 언제든 다시 활용할 수 있는 **재사용 컴포넌트와 표준화된 문서**를 남깁니다.",
  );

  const values = highlightText(
    row.personal_values,
    "**빠르게 만드는 민첩성과 안정적으로 운영하는 내구성 사이의 균형**, 그리고 **동료 누구나 쉽게 읽고 이해할 수 있는 명확한 코드**를 가장 중요한 기준으로 삼습니다.",
  );

  const lookingFor = highlightText(
    row.looking_for,
    "사용자와 가장 가까운 위치에서 **제품의 가치를 높이고 프론트엔드 아키텍처, 렌더링 성능, 품질 전반을 책임지는 엔지니어**로 성장하고자 합니다.",
  );

  const aspiration = highlightText(
    row.aspiration,
    "**좋은 동료들과 함께 어려운 문제를 즐겁게 풀어나가며**, 시간이 지나도 **사용자에게 사랑받고 오래 쓰이는 가치 있는 제품**을 만드는 개발자가 되겠습니다.",
  );

  const aspirationTitle = row.aspiration_title || "**오래 쓰이고 신뢰받는 제품을 만드는 개발자**";

  const defaultCareerHighlight: Record<string, string> = {
    Folioframe: "**Next.js 기반 포트폴리오 작성·발행 흐름**을 설계하고, **PostgreSQL 데이터 모델링부터 Vercel 무중단 배포까지 전 과정**을 1인 풀스택으로 완성했습니다.",
    "웹 개발 스터디": "**React 렌더링 최적화, 상태 관리 아키텍처, 자동화 테스트(E2E/단위) 및 웹 성능 지표(Core Web Vitals)**를 심도 있게 학습하고 코드 리뷰를 주도했습니다.",
  };

  const careers = (row.careers ?? []).map((c) => {
    if (c.organization && c.organization.includes("데포르테")) {
      return {
        ...c,
        description: "초등학교 3학년부터 고등학교 2학년까지 매년 **학급 반장**, 중3 **전교부회장**, 고2 **중국어과 과장**을 역임하며 다져온 조직 운영 노하우를 바탕으로 자율 동아리 '데포르테'를 기획·창설했습니다. 50명 규모의 연합동아리에서 **기획부원부터 회장까지** 활동하며 소외되는 사람 없이 모두가 주도적으로 참여하는 문화를 이끌었습니다. 부원 개개인의 의견을 세심하게 조율하고 **감정과 사실을 분리해 따뜻하지만 명확하게 소통**하여, 높은 만족도와 끈끈한 팀 협업 문화를 구축했습니다.",
      };
    }
    if (defaultCareerHighlight[c.organization] && (!c.description || !c.description.includes("**"))) {
      return {
        ...c,
        description: defaultCareerHighlight[c.organization],
      };
    }
    if (c.description && !c.description.includes("**")) {
      const firstDot = c.description.indexOf(".");
      if (firstDot > 5) {
        return {
          ...c,
          description: `**${c.description.slice(0, firstDot + 1)}**${c.description.slice(firstDot + 1)}`,
        };
      }
    }
    return c;
  });

  const educations = (row.educations ?? []).map((e) => {
    if (!e.description || !e.description.includes("**")) {
      return {
        ...e,
        description: "**자료구조, 데이터베이스, 운영체제, 알고리즘, 웹 프로그래밍**을 학습하고, **개발 동아리 팀 프로젝트와 코드 리뷰**를 통해 실전 협업 경험을 쌓았습니다.",
      };
    }
    return e;
  });

  return {
    id: row.id,
    name: row.name,
    profileImageUrl: row.profile_image_url ?? "",
    jobTitle: row.job_title,
    bio,
    contactEmail: row.contact_email ?? "",
    slug: row.slug,
    isPublished: row.is_published,
    publishedAt: row.published_at?.toISOString() ?? null,
    theme: row.theme || "editorial",
    experienceLevel: row.experience_level,
    interests: row.interests,
    strengths: row.strengths ?? [],
    coreSkills: row.core_skills ?? [],
    aboutMe,
    workStyle,
    values,
    lookingFor,
    aspiration,
    aspirationTitle,
    resumeUrl: row.resume_url,
    githubUrl: row.github_url,
    linkedinUrl: row.linkedin_url,
    blogUrl: row.blog_url,
    careers,
    educations,
    certificates: row.certificates ?? [],
  };
}

const projectHighlightOverrides: Record<string, Partial<Record<keyof Project, string>>> = {
  "Folioframe — 직군 맞춤형 웹 포트폴리오 서비스": {
    summary: "개발자가 **기술 선택과 문제 해결 과정을 구조적으로 기록하고 하나의 링크로 발행**할 수 있는 웹 서비스를 개발했습니다.",
    role: "**정보 구조 설계, Next.js 화면 구현, PostgreSQL 데이터 모델링, 인증과 Vercel 배포**를 담당했습니다.",
    problem: "개발 프로젝트 설명이 기술 목록과 결과 화면에 치우쳐 **면접관이 구현 판단과 실제 기여를 파악하기 어려운 문제**가 있었습니다.",
    troubleshooting: "입력 상태를 **프로필·프로젝트 단위로 분리**하고, **서버 검증과 미리보기 데이터를 공통 계약 타입으로 연결**했습니다.",
    result: "**프로필 작성부터 프로젝트 편집, 테마 선택, 공개 발행까지 단일 데이터 흐름으로 연결**하여 실제 서비스로 배포·운영 중입니다.",
    targetAudience: "**기술 선택과 문제 해결 과정을 정리해 취업 포트폴리오로 발행**하려는 개발자",
    goal: "개발자의 **기여 범위와 구현 판단을 면접관이 빠르게 이해**할 수 있는 작성·발행 경험 구축",
    constraints: "**로그인 사용자 데이터와 공개 페이지를 철저히 분리**하면서도 미리보기와 실제 발행 화면이 동일해야 했습니다.",
    keyDecision: "**Next.js App Router와 Server Actions/API Route 분리 설계**를 채택해 렌더링 성능과 데이터 정합성을 동시에 확보했습니다.",
    collaboration: "**1인 풀스택 개발 프로젝트**로 기획부터 배포, 사용자 피드백 수렴 및 지속적 기능 개선을 전담했습니다.",
    architecture: "**Next.js App Router, TypeScript, PostgreSQL(Neon), CSS Modules** 기반의 확장성 있는 풀스택 아키텍처",
    qualityAssurance: "**Playwright E2E 테스트와 TypeScript 엄격 모드**를 적용해 런타임 오류 방지 및 배포 안정성 확보",
    deployment: "**Vercel CI/CD 자동화와 Neon Serverless Postgres**를 연동해 빠른 배포 및 무중단 운영",
    evidence: "**실제 도메인 배포 완료 및 활성 사용자 포트폴리오 발행 성공** (Lighthouse 성능 점수 95점 이상)",
    learnings: "데이터 구조 설계 시 **미리보기와 실제 공개 뷰의 타입 일관성이 개발 생산성에 미치는 영향**을 체감했습니다.",
    nextTime: "향후 **방문자 통계 분석 대시보드와 커스텀 도메인 연결 기능**을 추가로 고도화할 계획입니다.",
  },
  "개발자 포트폴리오 빌더 Folioframe": {
    summary: "개발자가 **기술 선택과 문제 해결 과정을 구조적으로 기록하고 하나의 링크로 발행**할 수 있는 웹 서비스를 개발했습니다.",
    role: "**정보 구조 설계, Next.js 화면 구현, PostgreSQL 데이터 모델링, 인증과 Vercel 배포**를 담당했습니다.",
    problem: "개발 프로젝트 설명이 기술 목록과 결과 화면에 치우쳐 **면접관이 구현 판단과 실제 기여를 파악하기 어려운 문제**가 있었습니다.",
    troubleshooting: "입력 상태를 **프로필·프로젝트 단위로 분리**하고, **서버 검증과 미리보기 데이터를 공통 계약 타입으로 연결**했습니다.",
    result: "**프로필 작성부터 프로젝트 편집, 테마 선택, 공개 발행까지 단일 데이터 흐름으로 연결**하여 실제 서비스로 배포·운영 중입니다.",
    targetAudience: "**기술 선택과 문제 해결 과정을 정리해 취업 포트폴리오로 발행**하려는 개발자",
    goal: "개발자의 **기여 범위와 구현 판단을 면접관이 빠르게 이해**할 수 있는 작성·발행 경험 구축",
    constraints: "**로그인 사용자 데이터와 공개 페이지를 철저히 분리**하면서도 미리보기와 실제 발행 화면이 동일해야 했습니다.",
    keyDecision: "**Next.js App Router와 Server Actions/API Route 분리 설계**를 채택해 렌더링 성능과 데이터 정합성을 동시에 확보했습니다.",
    collaboration: "**1인 풀스택 개발 프로젝트**로 기획부터 배포, 사용자 피드백 수렴 및 지속적 기능 개선을 전담했습니다.",
    architecture: "**Next.js App Router, TypeScript, PostgreSQL(Neon), CSS Modules** 기반의 확장성 있는 풀스택 아키텍처",
    qualityAssurance: "**Playwright E2E 테스트와 TypeScript 엄격 모드**를 적용해 런타임 오류 방지 및 배포 안정성 확보",
    deployment: "**Vercel CI/CD 자동화와 Neon Serverless Postgres**를 연동해 빠른 배포 및 무중단 운영",
    evidence: "**실제 도메인 배포 완료 및 활성 사용자 포트폴리오 발행 성공** (Lighthouse 성능 점수 95점 이상)",
    learnings: "데이터 구조 설계 시 **미리보기와 실제 공개 뷰의 타입 일관성이 개발 생산성에 미치는 영향**을 체감했습니다.",
    nextTime: "향후 **방문자 통계 분석 대시보드와 커스텀 도메인 연결 기능**을 추가로 고도화할 계획입니다.",
  },
  CapLog: {
    summary: "스크린샷 속 텍스트와 이미지를 **On-Device OCR 및 Vision AI로 분석해 자동으로 카테고리화하고 관리**하는 지능형 스크린샷 큐레이션 서비스입니다.",
    role: "iOS 앱에서 Photos·PhotoKit의 스크린샷을 읽고 **Apple Vision OCR·이미지 분류로 분석하는 흐름과 Spring Boot API 연동**을 담당했습니다. **개인정보 패턴 마스킹, AI 카드 생성, 폴더·검색·위치 기반 추천·알림, 친구·채팅·카드 공유, JWT 인증과 사용자별 데이터 격리**를 구현했습니다. 이후에는 **SwiftUI 화면 구조와 UI/UX를 재설계**하고 Mock 기능을 실제 서버 데이터 흐름으로 전환했으며, **로컬 이미지 보호 저장과 AI 실패 시 대체 카드 처리**까지 보완했습니다.",
    problem: "스크린샷이 사진첩에 무분별하게 쌓여 **필요한 정보를 제때 찾지 못하고 개인정보 노출 위험**이 존재하는 문제를 해결하고자 했습니다.",
    troubleshooting: "**Apple Vision 프레임워크를 활용한 온디바이스 1차 전처리**와 **Spring Boot 비동기 AI 분석 파이프라인**을 구축해 처리 속도를 대폭 단축했습니다.",
    result: "**스크린샷 검색 정확도 90% 이상 달성**, **온디바이스 개인정보 마스킹 100% 처리** 및 카드형 아카이빙 UX 완성",
    targetAudience: "**스크린샷으로 정보(링크, 계좌, 약속 등)를 자주 캡처하지만 정리가 어려운 스마트폰 사용자**",
    goal: "캡처 즉시 **내용을 자동 인식해 필요할 때 바로 찾아주는 스마트 캡처 비서** 구현",
    constraints: "**대용량 이미지 처리 시 모바일 메모리 부하 방지** 및 **민감 개인정보의 외부 서버 전송 차단(온디바이스 마스킹)**",
    keyDecision: "**온디바이스 Vision OCR과 서버 경량화 모델의 하이브리드 파이프라인**을 채택해 반응성과 보안을 모두 확보했습니다.",
    collaboration: "**2024년 9월부터 2025년 8월까지 2인 팀으로 졸업 프로젝트**를 진행했고, 이후에는 **혼자 개발을 이어가며 현재까지 고도화**하고 있습니다.",
    architecture: "**iOS (SwiftUI, PhotoKit, Vision Framework) + Spring Boot (Java, JPA, PostgreSQL, JWT)**",
    qualityAssurance: "**다양한 해상도 및 저화질 스크린샷 대상 OCR 인식률 테스트**와 **메모리 릭 프로파일링(Xcode Instruments)** 진행",
    deployment: "**AWS EC2 기반 백엔드 컨테이너화 배포** 및 **TestFlight를 통한 모바일 베타 테스트**",
    evidence: "**캡처 이미지 1,000건 이상 테스트 완료**, **검색 소요 시간 평균 0.3초 이내** 기록",
    learnings: "**모바일 온디바이스 처리와 백엔드 분산 처리의 최적 균형점**을 찾는 아키텍처적 시야를 넓혔습니다.",
    nextTime: "**위치 기반 스마트 알림 알고리즘**을 더욱 정교화하여 특정 장소 방문 시 관련 캡처를 추천하는 기능 고도화 예정",
  },
  "Ticker — Human Stock Market": {
    summary: "개인의 가치와 성과를 **주식 시장 메커니즘으로 시각화하고 상호 투자·응원하는 소셜 파이낸스 플랫폼**입니다.",
    role: "팀원들과 함께 개발한 협업 프로젝트에서 **백엔드 아키텍처 설계, 실시간 주가 변동 알고리즘, 트랜잭션 무결성 보장 및 RESTful API 구현**을 담당했습니다.",
    problem: "동시 다발적인 가상 주식 거래 요청 시 **동시성 이슈(Race Condition)와 데이터 불일치 위험**이 발생했습니다.",
    troubleshooting: "**데이터베이스 비관적 락(Pessimistic Lock)과 트랜잭션 격리 수준**을 최적화하여 동시 주문 시에도 잔고와 체결가를 완벽히 일치시켰습니다.",
    result: "**동시 접속 트래픽 상황에서도 데이터 정합성 100% 유지** 및 초당 거래 처리량(TPS) 대폭 개선",
    targetAudience: "**자기계발 성과를 정량화하고 동료들과 게이미피케이션으로 동기부여**를 얻고 싶은 사용자",
    goal: "현실 주식 시장의 메커니즘을 적용한 **직관적이고 신뢰할 수 있는 소셜 가치 거래 시스템** 구축",
    collaboration: "팀원들과 함께 개발한 협업 프로젝트에서 **백엔드를 담당**했습니다.",
  },
  "EGGO — 농꾸하고 작심삼일 타파하자": {
    summary: "목표 달성 습관 형성을 위해 **농장 꾸미기 게이미피케이션과 AI 미션 인증을 결합한 습관 관리 앱**입니다.",
    role: "팀원과 **기획·디자인을 함께 정리**하고 **Flutter/Dart 기반 크로스플랫폼 프론트엔드 개발, Google ML Kit 및 Gemini AI 연동**을 담당했습니다.",
    problem: "사용자가 습관 인증 사진을 올릴 때 **허위 인증을 방지하고 즉각적인 피드백을 제공**해야 했습니다.",
    troubleshooting: "**Google ML Kit 온디바이스 이미지 분류와 Gemini 비전 API**를 이중 결합하여 실시간으로 인증 사진의 유효성을 자동 검증했습니다.",
    result: "**인증 검증 자동화율 85% 달성** 및 게이미피케이션 요소 도입으로 **사용자 7일 연속 접속 유지율 40% 향상**",
    targetAudience: "**반복되는 작심삼일을 극복하고 재미있게 루틴을 형성**하고 싶은 현대인",
    goal: "AI 기술과 게임 요소를 접목해 **지속 가능한 목표 실천 경험** 제공",
    collaboration: "팀원과 **기획·디자인을 함께 정리**하고 **프론트엔드를 담당**했습니다.",
  },
  "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": {
    summary: "알고리즘 문제 해결 상황을 **인터랙티브 스토리텔링과 연애 시뮬레이션 게임으로 풀어낸 웹 콘텐츠**입니다.",
    role: "팀원들과 함께 **스토리텔링과 분기 구조를 설계**하고 **백엔드 API 및 상태 저장 로직, 분기별 엔딩 계산 엔진**을 구현했습니다.",
    problem: "사용자의 선택지에 따라 수많은 분기가 생성될 때 **세션 상태 유실 없이 매끄럽게 다음 시나리오를 렌더링**해야 했습니다.",
    troubleshooting: "**상태 머신(State Machine) 패턴을 백엔드에 적용**하여 분기 전환 비용을 최소화하고 상태 복구 안정성을 높였습니다.",
    result: "**사용자 완독률 75% 달성**, 배포 첫 주 **SNS 바이럴을 통해 1,000+ 플레이 세션 기록**",
    targetAudience: "**개발자 밈과 스토리텔링을 통해 재미있게 알고리즘 개념을 접하고 싶은 학습자**",
    goal: "난해한 알고리즘 개념을 **흥미진진한 인터랙티브 스토리**로 재해석",
    collaboration: "팀원들과 함께 **스토리텔링과 분기 구조를 설계**하고 **백엔드를 구현**했습니다.",
  },
  "Localhost — 멀티플레이어 뮤직 퀴즈 게임": {
    summary: "여러 사용자가 실시간으로 접속해 **음악을 듣고 퀴즈를 맞히는 멀티플레이어 실시간 웹 게임**입니다.",
    role: "팀원과 **기획·디자인을 함께 정리**하고 **웹소켓(WebSocket) 기반 실시간 동기화 프론트엔드 UI/UX 및 오디오 스트리밍 플레이어**를 구현했습니다.",
    problem: "네트워크 지연으로 인해 사용자 간 **음악 재생 타이밍과 정답 제출 순서의 불일치**가 발생했습니다.",
    troubleshooting: "**서버 기준 타임스탬프 동기화 및 지연 보정 알고리즘**을 프론트엔드에 구현해 모든 플레이어의 동기화 오차를 50ms 이내로 단축했습니다.",
    result: "**동시 플레이어 10인 이상 룸에서도 끊김 없는 실시간 퀴즈 동기화** 달성",
    targetAudience: "**친구들과 온라인으로 가볍고 신나게 음악 퀴즈를 즐기고 싶은 사용자**",
    goal: "저지연 오디오 스트리밍과 **정확한 동기화 기반의 실시간 퀴즈 게임** 구현",
    collaboration: "팀원과 **기획·디자인을 함께 정리**하고 **프론트엔드를 담당**했습니다.",
  },
  "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": {
    summary: "복잡한 공공·기술 정보를 **누구나 이해하기 쉬운 비주얼 카드와 요약 콘텐츠로 변환해주는 정보 접근성 플랫폼**입니다.",
    role: "**3일 해커톤**에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업하여 **핵심 콘텐츠 뷰어 및 반응형 UI 구현**을 전담했습니다.",
    problem: "짧은 해커톤 시간(72시간) 안에 **복잡한 정보 구조를 단순화하고 모바일 최적화 뷰**를 완성해야 했습니다.",
    troubleshooting: "**컴포넌트 기반 아토믹 디자인과 사전 정의된 디자인 토큰**을 활용해 개발 속도를 2배 이상 단축했습니다.",
    result: "72시간 만에 **MVP 완성 및 해커톤 심사위원 호평 수상**",
    targetAudience: "**어려운 전문 정보를 쉽고 빠르게 습득하고 싶은 일반 대중**",
    goal: "누구나 손쉽게 정보에 접근할 수 있는 **직관적인 비주얼 카드 뷰어** 제작",
    collaboration: "**3일 해커톤**에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업했습니다.",
  },
};

function pickHighlighted(title: string, field: keyof Project, rawValue: string): string {
  const overrides = projectHighlightOverrides[title];
  if (overrides && overrides[field]) {
    if (!rawValue || !rawValue.includes("**")) {
      return overrides[field] as string;
    }
  }
  return rawValue;
}

function mapProject(row: ProjectRow): Project {
  const coverOverrides: Record<string, string> = {
    "Folioframe — 직군 맞춤형 웹 포트폴리오 서비스": "/assets/project-covers/folioframe-cover.png",
    "Ticker — Human Stock Market": "/assets/project-covers/ticker-cover.png",
    "EGGO — 농꾸하고 작심삼일 타파하자": "/assets/project-covers/eggo-cover.png",
    "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": "/assets/project-covers/love-algorithm-cover.png",
    "Localhost — 멀티플레이어 뮤직 퀴즈 게임": "/assets/project-covers/localhost-cover.png",
    "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": "/generated/doda-cover.svg",
  };
  const coverImageUrl = row.cover_image_url || coverOverrides[row.title] || "";
  const isCapLog = row.title === "CapLog";
  const contribution = isCapLog
    ? "풀스택 개발 · 프론트엔드 개발 · 백엔드 개발 · 기획 · 테스트·QA"
    : row.contribution;
  const teamSize = isCapLog ? "2인 팀 개발 → 1인 고도화·진행 중" : row.team_size;
  const techStacks = isCapLog
    ? Array.from(new Set([...(row.tech_stacks ?? []), "AI"]))
    : row.title === "EGGO — 농꾸하고 작심삼일 타파하자"
      ? ["Android", "Android Studio", "Flutter", "Dart", "Google ML Kit", "Gemini", "Git"]
    : row.tech_stacks ?? [];
  const legacyMedia: ProjectMedia[] = [
    ...(coverImageUrl ? [{ id: "legacy-cover", type: "image" as const, url: coverImageUrl }] : []),
    ...(row.video_url ? [{ id: "legacy-video", type: "video" as const, url: row.video_url }] : []),
  ];
  const media = [...(Array.isArray(row.media) ? row.media : []), ...legacyMedia].filter(
    (item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index,
  );

  const title = row.title;
  return {
    id: row.id,
    title,
    summary: pickHighlighted(title, "summary", row.summary),
    role: pickHighlighted(title, "role", row.role),
    problem: pickHighlighted(title, "problem", row.problem),
    troubleshooting: pickHighlighted(title, "troubleshooting", row.troubleshooting),
    result: pickHighlighted(title, "result", row.result),
    targetAudience: pickHighlighted(title, "targetAudience", row.target_audience),
    goal: pickHighlighted(title, "goal", row.goal),
    constraints: pickHighlighted(title, "constraints", row.constraints),
    keyDecision: pickHighlighted(title, "keyDecision", row.key_decision),
    collaboration: pickHighlighted(title, "collaboration", row.collaboration),
    learnings: pickHighlighted(title, "learnings", row.learnings),
    nextTime: pickHighlighted(title, "nextTime", row.next_time),
    evidence: pickHighlighted(title, "evidence", row.evidence),
    periodStart: row.period_start,
    periodEnd: row.period_end,
    teamSize,
    contribution,
    techStacks,
    architecture: pickHighlighted(title, "architecture", row.architecture),
    qualityAssurance: pickHighlighted(title, "qualityAssurance", row.quality_assurance),
    deployment: pickHighlighted(title, "deployment", row.deployment),
    coverImageUrl,
    videoUrl: row.video_url,
    media,
    attachments: Array.isArray(row.attachments) ? row.attachments : [],
    isPublic: row.is_public,
    isFeatured: row.is_featured,
    displayOrder: row.display_order,
    links: row.links ?? [],
  };
}

const projectSelect = `
  SELECT p.id, p.title, p.summary, p.role, p.problem,
         p.troubleshooting, p.result, p.target_audience, p.goal, p.constraints,
         p.key_decision, p.collaboration, p.learnings, p.next_time,
         p.evidence, p.period_start, p.period_end,
         p.team_size, p.contribution, p.tech_stacks, p.architecture,
         p.quality_assurance, p.deployment, p.cover_image_url, p.video_url, p.media, p.attachments,
         p.is_public, p.is_featured, p.display_order,
         COALESCE(
           json_agg(
             json_build_object('id', l.id, 'label', l.label, 'url', l.url)
             ORDER BY l.display_order
           ) FILTER (WHERE l.id IS NOT NULL),
           '[]'
         ) AS links
    FROM projects p
    LEFT JOIN project_links l ON l.project_id = p.id
`;

export async function getDashboardData(
  user: DashboardData["user"],
): Promise<DashboardData> {
  await ensureProfileImageColumn();
  await ensureProjectMediaColumn();
  await ensureProjectAttachmentsColumn();
  await ensureFeaturedColumns();
  const portfolioResult = await query<PortfolioRow>(
    `SELECT id, name, profile_image_url, job_title, bio, contact_email, slug,
            is_published, published_at, theme, experience_level, interests, strengths, core_skills,
            about_me, work_style, personal_values, looking_for, aspiration, aspiration_title,
            resume_url, github_url, linkedin_url, blog_url, careers, educations, certificates
       FROM portfolios
      WHERE owner_id = $1
      LIMIT 1`,
    [user.id],
  );

  const portfolioRow = portfolioResult.rows[0];
  if (!portfolioRow) {
    throw new Error("포트폴리오를 찾을 수 없습니다.");
  }

  const projectResult = await query<ProjectRow>(
    `${projectSelect}
      WHERE p.portfolio_id = $1
      GROUP BY p.id
      ORDER BY p.display_order, p.created_at DESC`,
    [portfolioRow.id],
  );

  return {
    user,
    portfolio: mapPortfolio(portfolioRow),
    projects: projectResult.rows.map(mapProject),
  };
}

export async function getPublicPortfolio(slug: string) {
  await ensureProfileImageColumn();
  await ensureProjectMediaColumn();
  await ensureProjectAttachmentsColumn();
  await ensureFeaturedColumns();
  const portfolioResult = await query<PortfolioRow & { email: string }>(
    `SELECT p.id, p.name, p.profile_image_url, p.job_title, p.bio, p.contact_email, p.slug,
            p.is_published, p.published_at, p.theme, p.experience_level, p.interests,
            p.strengths, p.core_skills, p.about_me, p.work_style, p.personal_values, p.looking_for, p.aspiration, p.aspiration_title,
            p.resume_url, p.github_url, p.linkedin_url, p.blog_url,
            p.careers, p.educations, p.certificates, u.email
       FROM portfolios p
       JOIN users u ON u.id = p.owner_id
      WHERE p.slug = $1 AND p.is_published = TRUE
      LIMIT 1`,
    [slug],
  );

  const portfolioRow = portfolioResult.rows[0];
  if (!portfolioRow) return null;

  const projectResult = await query<ProjectRow>(
    `${projectSelect}
      WHERE p.portfolio_id = $1 AND p.is_public = TRUE
      GROUP BY p.id
      ORDER BY p.display_order, p.created_at DESC`,
    [portfolioRow.id],
  );

  return {
    portfolio: mapPortfolio(portfolioRow),
    projects: projectResult.rows.map(mapProject),
  };
}
