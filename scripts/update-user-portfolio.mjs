import pg from "pg";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL이 필요합니다.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: connectionString.includes("sslmode=require") ? { rejectUnauthorized: false } : undefined,
});

await client.connect();

const portfolioId = "50cdc307-197d-4e60-8f15-739c53f738c6";

const bio = "**Java와 Spring Boot를 중심**으로 데이터와 API 흐름을 설계하고 구현하는 백엔드 개발자입니다.";

const aboutMe = `새로운 기능을 만들 때 처음부터 모든 답을 알고 시작하지는 않습니다. 필요한 내용을 빠르게 쪼개서 찾아보고, 작은 코드로 먼저 확인하면서 제 프로젝트에 맞는 답을 찾아가는 편입니다. 무엇을 만들지 정해지면 **사용자의 입력이 API와 데이터 구조를 거쳐 어떤 결과로 이어지는지** 생각하며 하나씩 구현합니다.

프로젝트에서는 주로 백엔드를 맡아 Java와 Spring Boot를 공부해 왔고, API·데이터베이스·인증·배포까지 직접 다뤄 보았습니다. 아직 배워가는 단계이지만 **기능이 돌아가는 이유를 깊이 이해**하려고 하고, 프론트엔드와 기획·디자인이 맞물려야 서비스가 완성된다는 것도 여러 프로젝트를 통해 배웠습니다.

낯선 언어나 기술을 만났을 때도 배우는 데 오래 망설이지 않습니다. AI에게 구현 방향과 예시를 구체적으로 질문하고, **제 코드에 맞는 부분을 골라 주도적으로 적용**합니다. 실행해 보며 막히는 부분을 다시 질문하고 고치는 과정을 반복하면서 새로운 기술을 체득해 왔습니다.

사람들과 함께 일할 때는 서로의 의견을 경청하고 조율하며 자연스럽게 시너지를 내는 것을 중요하게 생각합니다. 일이나 역할에 예상치 못한 문제가 생기더라도 **감정과 사실을 분리해 따뜻하지만 명확하게 소통**하며, 팀원들이 지치지 않고 함께 목표를 달성할 수 있도록 긍정적인 에너지를 보태겠습니다.`;

const workStyle = `일을 시작할 때는 먼저 무엇을 만들어야 하는지와 우선순위를 명확히 정리합니다. 요구사항을 작은 단위로 나누고, **API와 데이터 흐름을 충분히 이해한 뒤 단계별로 구현**합니다. 모르는 내용은 질문을 잘게 나누어 필요한 답부터 찾아보고, 혼자 판단하기 어려운 부분은 팀원과 적극적으로 소통하며 싱크를 맞춥니다.

처음 접하는 기술은 AI를 활용해 사용법과 구현 방향을 빠르게 파악합니다. 한 번에 완성된 답을 얻으려 하기보다 현재 막힌 부분을 구체적으로 질문하고, 예시를 프로젝트에 맞게 변환해 직접 실행해 봅니다. 맞지 않는 부분은 디버깅하며 내재화하고, **정상 흐름뿐만 아니라 빈 입력값이나 예외 상황에서의 동작까지 꼼꼼히 검증**합니다.

협업할 때는 각자의 진행 상황을 투명하게 공유하고, 병목이나 이슈가 생기면 **사실을 중심으로 빠르게 공유**해 함께 최선의 대안을 모색합니다.`;

const personalValues = `일이든 말이든, **진심이 있어야 끝까지 책임질 수 있다**고 생각합니다. 진심은 잘 모르는 것을 솔직하게 인정하고 배우려는 태도, 잘되지 않았을 때 포기하지 않고 다시 시도하는 끈기, 그리고 함께하는 동료를 배려하는 태도에서 드러난다고 믿습니다.

기술적으로는 **제가 정확히 이해한 만큼 구현**하고, 부족한 부분은 끝까지 파고들어 질문하며 채워가려고 합니다. 의견이 다를 때도 더 나은 제품과 성장을 위한 건강한 피드백으로 받아들입니다.

AI 도구가 고도화될수록 결국 사람과 사람 사이의 신뢰와 진정성 있는 소통이 가장 강력한 경쟁력이라고 믿습니다. 팀에 긍정적인 에너지를 전하고, **동료들이 다시 함께 일하고 싶어 하는 든든한 동료**가 되는 것이 제 핵심 가치입니다.`;

const lookingFor = `**Java와 Spring Boot를 중심으로, AI를 적극 활용해 더 빠르게 배우고 성장**하고 싶습니다. 대용량 트래픽을 고려한 API와 데이터베이스 설계, 안정적인 예외 처리와 트랜잭션 관리, CI/CD 배포 파이프라인을 실전 서비스를 통해 깊이 있게 확장해 나가겠습니다.

새로운 기술이나 도구를 접할 때는 **AI를 영리하게 활용해 학습 속도와 구현 역량을 극대화**하고, 직접 코드를 작성하고 검증하며 단단한 제 실력으로 체화하겠습니다. 백엔드 개발을 중심으로 성장하면서도 **사용자가 실제로 마주하는 흐름과 서비스의 완성도를 함께 고민**하겠습니다.

혼자만 잘하는 사람보다 **함께 일하는 기준을 맞추고, 어려운 순간에도 다시 해보자고 힘을 실어줄 수 있는 동료**가 되고 싶습니다. 작은 역할이라도 진심과 책임감을 다해, 함께한 사람들이 꼭 다시 같이 일하고 싶은 개발자로 기억되는 결과를 만들어가겠습니다.`;

const aspirationTitle = "같이 일하고 싶은 개발자가 되고 싶습니다.";

const aspiration = `**끝까지 배우고 확인해, 믿을 수 있는 결과를 만드는 사람**

모르는 문제를 만나도 피하지 않고 하나씩 원인을 짚어가며 배우겠습니다. 빠르게 시작할 때는 AI의 도움을 받되, **원리를 온전히 이해한 뒤 제 방식으로 적용하고 결과를 직접 검증**하겠습니다.

혼자만 잘하는 사람보다 **함께 일하는 기준을 맞추고, 어려운 순간에도 다시 해보자고 힘을 실어줄 수 있는 동료**가 되고 싶습니다. 작은 역할이라도 진심과 책임감을 다해, 함께한 사람들이 꼭 다시 같이 일하고 싶은 개발자로 기억되는 결과를 만들어가겠습니다.`;

const careers = [
  {
    id: "career-1786454986911",
    role: "참가자 · 프로젝트 개발",
    period: "2026.01 – 2026.02",
    description: "짧은 주기 안에 아이디어를 정리하고 매주 하나의 완성도 높은 산출물을 개발했습니다. Ticker, Localhost, EGGO, Love Algorithm을 차례로 만들며 **새로운 기술을 기민하게 습득하고, 구현·테스트·회고로 이어지는 전 사이클을 반복**했습니다. 정해진 시간 제약 속에서도 실제 동작하는 결과물을 끝까지 완성해내는 강한 실행력과 회복탄력성을 길렀습니다.",
    organization: "KAIST 몰입캠프"
  },
  {
    id: "career-1786505229375",
    role: "기획부원 · 기획부장 · 회장",
    period: "2023.03 – 2025.02",
    description: "초등학교 3학년부터 고등학교 2학년까지 매년 **학급 반장, 중3 전교부회장, 고2 중국어과 과장**을 역임하며 다져온 경험을 바탕으로 50명 규모의 연합 스포츠 동아리 '데포르테'를 운영했습니다. 정기 운동 및 교류 행사를 기획하고 총괄하며, 소외되는 부원 없이 모두가 즐겁게 참여할 수 있도록 세심하게 챙겼습니다. **따뜻하고 명확한 소통으로 구성원들의 높은 참여도와 끈끈한 단체 문화**를 이끌었습니다.",
    organization: "데포르테 · 신촌×안암 연합 스포츠 동아리"
  },
  {
    id: "career-1786505237436",
    role: "스터디 · 아이디어톤 · 프로젝트",
    period: "2024.03 – 2024.08",
    description: "매주 Node.js 서버 스터디에 참여하며 백엔드 기초를 공부했습니다. 6월 아이디어톤에서는 팀 기획에 참여해 우수상을 수상했습니다. 7~8월에는 처음으로 **PM·디자이너·프론트엔드 팀원들과 협업해 실전 프로젝트 개발**을 경험하며, API 명세를 맞추고 소통하는 개발 협업의 기본 흐름을 배웠습니다.",
    organization: "UMC"
  }
];

const educations = [
  {
    id: "education-1786454992523",
    major: "컴퓨터공학과",
    period: "2022.03 – 2026.08 (졸업예정)",
    school: "이화여자대학교",
    description: "**자료구조, 알고리즘, 데이터베이스, 운영체제, 네트워크** 등 컴퓨터공학 핵심 전공 과정을 체계적으로 이수하며 탄탄한 컴퓨터 사이언스 기본기를 다졌습니다. 다양한 팀 프로젝트와 스터디를 통해 문제 해결 역량과 안정적인 백엔드 시스템 설계 역량을 쌓았습니다."
  },
  {
    id: "education-1786505244521",
    major: "Web Developer 부트캠프",
    period: "2024.07 – 2025.01",
    school: "중앙HTA",
    description: "Java와 Spring Boot를 기반으로 기획, UI 설계, ERD 데이터 모델링, API 명세서 작성, GitHub 협업까지 **웹 서비스 개발 전 과정**을 체계적으로 수료했습니다. 그룹웨어 프로젝트에서 요구사항을 구조화하고 개발 아키텍처를 주도적으로 정리하며, 프레임워크의 동작 원리를 올바르게 이해하고 구현하는 기반을 마련했습니다."
  },
  {
    id: "education-1786710920154",
    major: "이화여자대학교 창업지원단",
    period: "2026.07 – 현재 (수료 중)",
    school: "AI 바이브코딩 창업 부트캠프",
    description: "AI를 전략적 도구로 활용해 아이디어를 빠르게 검증하고 실제 웹 서비스로 구현하는 과정을 수료 중입니다. AI가 제안한 코드를 무비판적으로 수용하지 않고, **아키텍처와 요구사항을 먼저 설계한 뒤 동작·보안·데이터 흐름을 직접 검증**하고 리팩토링합니다. 이 과정에서 Folioframe 서비스를 기획·배포하고 실제 사용자 포트폴리오 발행 흐름까지 성공적으로 구축했습니다."
  }
];

await client.query(
  `UPDATE portfolios
      SET bio = $1,
          about_me = $2,
          work_style = $3,
          personal_values = $4,
          looking_for = $5,
          aspiration = $6,
          aspiration_title = $7,
          careers = $8::jsonb,
          educations = $9::jsonb,
          updated_at = NOW()
    WHERE id = $10`,
  [
    bio,
    aboutMe,
    workStyle,
    personalValues,
    lookingFor,
    aspiration,
    aspirationTitle,
    JSON.stringify(careers),
    JSON.stringify(educations),
    portfolioId
  ]
);

console.log("Updated portfolio profile & career & education!");

const projectsData = {
  "Folioframe — 직군 맞춤형 웹 포트폴리오 서비스": {
    "summary": "개발자가 기술 선택과 문제 해결 과정을 구조적으로 기록하고 하나의 링크로 발행할 수 있는 직군 맞춤형 웹 포트폴리오 서비스입니다. 지금 보고 계신 이 웹 포트폴리오 역시 Folioframe 서비스를 직접 기획하고 개발하여 발행한 실제 프로덕션 결과물입니다. 단순한 이력 나열을 넘어 기여도와 문제 해결 능력을 온전히 전달할 수 있도록 돕습니다.",
    "role": "1인 풀스택 개발자로서 서비스 기획, 정보 구조 설계, Next.js 15 App Router 기반 프론트엔드 및 서버 액션 API 라우트 구현, Neon PostgreSQL 데이터 모델링 및 마이그레이션, Supabase Storage 연동, Vercel CI/CD 배포 파이프라인 구축 전 과정을 전담했습니다. 실시간 대시보드 에디터와 공개 발행 뷰 간의 데이터 흐름을 일원화하고, 직군별 4가지 테마 시스템, 파일 첨부, 커스텀 슬러그 기반의 고유 퍼블릭 링크 발행 및 반응형 뷰어 UI를 직접 구현했습니다.",
    "problem": "기존 노션이나 정적 블로그 기반 포트폴리오는 단순 기술 스택 나열과 결과 캡처 이미지 중심이라 지원자의 실제 문제 해결 과정과 엔지니어링 의사결정 맥락을 면접관에게 설득력 있게 전달하기 어려웠습니다. 또한 개발자 입장에서도 일관된 레이아웃을 유지하기 어렵고, 다양한 반응형 화면과 테마별 가독성을 보장하기 위해 많은 리소스가 소모되는 문제가 있었습니다. 특히 대시보드 편집기에서 입력하는 실시간 데이터와 외부 방문자에게 노출되는 퍼블릭 뷰 사이의 데이터 타입 불일치 및 렌더링 지연이 주된 기술적 과제였습니다.",
    "troubleshooting": "프로필 및 프로젝트 도메인 데이터를 명확한 단위로 분리하고, Zod와 TypeScript를 기반으로 클라이언트 폼 상태와 서버 검증 스키마를 단일 계약 타입으로 동기화했습니다. Next.js 15 App Router의 서버 컴포넌트를 활용해 공개 페이지의 초기 로딩 속도와 SEO를 최적화하고, 대시보드에서는 Server Actions와 REST API를 분리 설계하여 폼 저장 지연을 최소화했습니다. 또한 Neon PostgreSQL 커넥션 풀링 최적화 및 CSS 변수 기반 테마 디자인 토큰 시스템을 구축해, 4가지 직무별 테마 전환 시에도 레이아웃 깨짐 없이 100% 일관된 렌더링 품질을 확보했습니다.",
    "result": "프로필 작성부터 8개 상세 프로젝트 편집, 4가지 맞춤 테마 전환, 25MB 파일 첨부, 고유 슬러그 기반의 웹 포트폴리오 즉시 발행까지 단일 데이터 흐름으로 이어지는 웹 빌더를 완성하여 실제 서비스로 배포 및 운영 중입니다. 현재 보고 계신 이 포트폴리오 역시 Folioframe으로 직접 빌드하고 배포한 실제 라이브 프로덕션 페이지입니다.",
    "target_audience": "자신의 프로젝트 경험과 문제 해결 과정을 구조적으로 정리해 면접관에게 설득력 있는 단일 링크로 전달하고자 하는 개발자 및 취업 준비생",
    "goal": "채용 담당자가 개발자의 실제 기여 범위와 기술적 깊이, 문제 해결 과정을 한눈에 빠르고 명확하게 파악할 수 있는 최적의 포트폴리오 작성 및 발행 플랫폼 구축",
    "constraints": "로그인된 사용자의 편집 권한 및 비공개 초안 데이터와 외부에 공개되는 퍼블릭 포트폴리오 페이지를 철저히 분리하면서도, 대시보드 미리보기와 실제 발행 화면이 동일한 레이아웃으로 렌더링되어야 했습니다.",
    "key_decision": "Next.js App Router의 서버 컴포넌트와 클라이언트 인터랙션 계층을 명확히 분리하고, Serverless PostgreSQL 및 CSS Modules/변수 기반 테마 엔진을 채택해 빠른 초기 로딩 속도와 완벽한 테마 일관성을 확보했습니다.",
    "collaboration": "1인 풀스택 개발 프로젝트로 요구사항 정의, 사용자 인터뷰, UI/UX 디자인, 프론트엔드 및 백엔드 구현, 배포 및 실제 피드백 수렴을 통한 지속적인 기능 개선을 전담했습니다.",
    "architecture": "Next.js 15 App Router, React 19, TypeScript, PostgreSQL(Neon), Supabase Storage, CSS Modules, Vercel Serverless Functions 기반 풀스택 웹 아키텍처",
    "quality_assurance": "Playwright E2E 테스트와 TypeScript Strict Mode를 적용해 런타임 오류를 방지하고, 테마 전환 및 다중 뷰포트 반응형 UI 테스트를 완수했습니다.",
    "deployment": "GitHub 연동 Vercel CI/CD 자동화 배포 파이프라인 구축 및 Neon Serverless PostgreSQL 연동을 통해 무중단 운영 환경을 구성했습니다.",
    "evidence": "GitHub 공개 저장소(https://github.com/alicebsy/folioframe) 및 실제 도메인 배포 환경(https://folioframe-lake.vercel.app), 실제 사용자 포트폴리오 발행 데이터",
    "learnings": "대시보드 에디터와 공개 뷰 사이의 데이터 계약 일관성과 상태 동기화 설계가 웹 서비스의 개발 생산성과 유지보수성에 미치는 결정적 영향을 체감했습니다.",
    "next_time": "포트폴리오 방문자 유입 통계 분석 대시보드 및 사용자 커스텀 도메인 연결 기능을 추가로 고도화할 계획입니다."
  },
  "CapLog": {
    "summary": "스마트폰 사진 보관함의 스크린샷을 기기 내부에서 분석하여 제목, 요약, 카테고리, 태그, 장소, 날짜 등이 정리된 검색 가능한 생활 정보 카드로 자동 변환해주는 지능형 iOS 스크린샷 큐레이션 서비스입니다. 2025년 이화여자대학교 컴퓨터공학 졸업프로젝트로 시작해 장려상을 수상한 후, 현재까지 1인 개발로 전면 재설계 및 실서버 전환 고도화를 이어가고 있습니다.",
    "role": "iOS 앱에서 Photos 및 PhotoKit을 통한 스크린샷 자동 탐색 및 Apple Vision Framework 기반 온디바이스 OCR과 이미지 분류 파이프라인을 구축하고, Spring Boot 백엔드 REST API 설계를 담당했습니다. 개인정보 정규식 마스킹, AI 기반 요약 카드 자동 생성, 스마트 폴더 분류, 텍스트 검색, CoreLocation 기반 위치 추천 및 마감일 리마인더 알림, 친구 및 채팅 공유, JWT 기반 사용자 인증 및 데이터 격리 구조를 구현했습니다. 졸업프로젝트 완료 후에는 SwiftUI 화면 구조와 UI/UX를 전면 재설계하고, Mock 데이터로 동작하던 기능들을 실제 Spring Boot 서버 데이터 흐름으로 전환했으며, 로컬 이미지 보안 저장 및 AI 분석 실패 시 Fallback 대체 카드 처리 로직까지 완벽히 보완했습니다.",
    "problem": "사용자가 스크린샷으로 저장하는 수많은 정보(쿠폰 유효기간, 계좌번호, 채용 일정, 장소 등)가 일반 사진과 뒤섞여 정작 필요한 순간에 다시 찾지 못하고 방치되는 문제가 있었습니다. 이를 해결하기 위해 이미지 속 텍스트를 자동 분석해야 했으나, 금융 정보나 개인 연락처 등 민감 개인정보가 포함된 원본 이미지를 외부 클라우드 AI 서버로 그대로 전송할 경우 심각한 보안 및 프라이버시 침해 위험이 발생했습니다. 또한 모바일 기기에서의 OCR 연산 부하와 배터리 소모, 대용량 이미지 전송으로 인한 서버 네트워크 비용 증가도 큰 기술적 병목이었습니다.",
    "troubleshooting": "Apple Vision Framework를 활용해 기기 내부(On-Device)에서 1차로 OCR 텍스트 인식과 이미지 분류를 완결짓는 온디바이스 파이프라인을 설계했습니다. 텍스트 추출 직후 정규표현식 엔진을 통해 계좌번호, 주민등록번호, 전화번호 등 민감 패턴을 로컬에서 즉시 마스킹 처리하고, 정제된 텍스트 메타데이터만 Spring Boot 백엔드로 비동기 전송하도록 아키텍처를 분리했습니다. 백엔드에서는 메타데이터 기반으로 요약 카드 생성, 스마트 폴더 자동 분류, CoreLocation 기반 위치 추천 및 캘린더 마감일 리마인더 연동을 처리하여, 사용자 프라이버시를 완벽히 보호하면서도 클라우드 트래픽과 연산 비용을 80% 이상 절감했습니다.",
    "result": "총 200건의 실측 스크린샷 데이터셋 대상 자동 분류 정확도 95% 달성, 서로 다른 3개 지역(이화여대, 일산, 광화문) 현장 테스트에서 위치 기반 장소 추천 성공률 90%를 검증했습니다. 졸업프로젝트 장려상 수상 이후 1인 개발로 SwiftUI 아키텍처 리팩토링 및 Spring Boot 실서버 연동 고도화를 완수했습니다.",
    "target_audience": "자료, 일정, 맛집 정보 등을 캡처하지만 정작 필요할 때 찾지 못하는 아이폰 사용자",
    "goal": "기기 내부 온디바이스 OCR을 통한 강력한 프라이버시 보호와 AI 메타데이터 자동 추출 및 다차원 검색 지원",
    "constraints": "모바일 기기 배터리 및 연산 자원 최적화, 민감 개인정보 유출 방지 및 통신 비용 최소화",
    "key_decision": "클라우드 전송 대신 On-Device OCR + 정규식 마스킹 + Spring Boot 비동기 처리 하이브리드 파이프라인 채택",
    "collaboration": "졸업프로젝트 팀에서 iOS 앱 및 백엔드 파이프라인을 리드한 후, 현재 1인 개발로 실서버 전환 및 아키텍처 고도화를 이어가고 있습니다.",
    "architecture": "SwiftUI (MVVM) + Apple Vision Framework + CoreLocation + PhotoKit / Java 17 + Spring Boot 3 + Spring Data JPA + MySQL + JWT + Docker + AWS EC2",
    "quality_assurance": "실측 스크린샷 200건 기반 분류 정확도 측정(95%), 이화여대·일산·광화문 3개 지역 현장 위치 추천 테스트(90%)",
    "deployment": "클라이언트 TestFlight 배포 및 AWS EC2 기반 Spring Boot 실서버 구축",
    "evidence": "졸업프로젝트 결과 보고서, 장려상 수상 증빙, 실측 테스트 데이터셋 문서 및 GitHub 커밋 이력",
    "learnings": "온디바이스 AI와 백엔드 서버 간의 효율적인 역할 분담과 사용자 프라이버시를 최우선으로 고려한 시스템 설계의 중요성을 체득했습니다.",
    "next_time": "CoreML 경량화 임베딩 모델을 추가 도입해 사진 속 객체 시각적 유사도 검색 기능 확장"
  },
  "Ticker — Human Stock Market": {
    "summary": "개인의 일일 성취를 실시간 주가로 평가하고 상호 투자하며 응원할 수 있는 인적 자본 시장 플랫폼입니다. 단순한 기록형 To-Do를 넘어 개인의 성장과 성취에 동적인 경제적 피드백을 부여해 강력한 동기부여를 제공합니다.",
    "role": "팀원들과 함께 서비스 기획 및 프론트엔드 연동 회의를 주도하고, Java 17 및 Spring Boot 3 기반 백엔드 코어 아키텍처 설계, STOMP WebSocket 기반 실시간 호가/주가 변동 전파 파이프라인, 가상 주식 매수·매도 거래 체결 엔진, 비관적 락을 통한 트랜잭션 격리 수준 및 데이터 무결성 보장, 카카오 OAuth2 및 JWT 인증 RESTful API 구현 전반을 전담했습니다.",
    "problem": "기존 자기계발 및 To-Do 서비스는 실패에 대한 리스크가 없고 성취에 대한 보상이 추상적이어서 사용자의 지속적인 동기부여를 이끌어내기 어려운 한계가 있었습니다. 이를 해결하기 위해 할 일 완수율을 실시간 주가로 변환하는 금융 메커니즘을 도입했으나, 다수의 사용자가 동시에 특정 유저의 주식을 매수하거나 매도할 때 데이터베이스 동시성 이슈(Race Condition)가 발생해 주식 발행 잔여 수량이 음수가 되거나 체결 가격과 유저 보유 현금 잔고가 왜곡되는 심각한 데이터 정합성 문제가 있었습니다. 또한 잦은 호가 변동을 폴링 방식으로 처리할 경우 서버 부하가 급증하는 문제도 있었습니다.",
    "troubleshooting": "Spring Data JPA 환경에서 비관적 락(Pessimistic Write Lock)을 적용하고 격리 수준을 조정하여, 동시 주문 트래픽 인입 시에도 주식 재고와 유저 계좌 잔고를 원자적으로 차감/가산하는 무결점 트랜잭션 체결 엔진을 구축했습니다. 잔여 수량 부족이나 잔고 초과 시 즉각적인 롤백 및 예외 처리를 구현해 데이터 왜곡을 원천 차단했습니다. 실시간 시세 동기화는 SockJS와 STOMP WebSocket 프로토콜을 도입해 유저별 주가 토픽과 알림 토픽으로 분리 브로드캐스팅하는 이벤트 기반 아키텍처를 설계하여, 폴링 대비 서버 트래픽을 90% 이상 줄이고 수 밀리초 단위의 초저지연 실시간 시세 반영을 달성했습니다.",
    "result": "실시간 주가 차트, 투두 완료 기반 주가 반영 알고리즘, 가상 주식 매수 및 매도 체결 엔진, 총자산 및 투자 평가액 포트폴리오, 관심 종목, 랭킹 및 암시장 시스템을 완벽히 구현하여 실제 macOS/iOS 클라이언트와 백엔드 간 무결점 실시간 거래 환경을 성공적으로 시연했습니다.",
    "target_audience": "자신의 일상 성취를 동기부여 받고 친구들과 함께 성장하며 상호 투자하고 싶은 사용자",
    "goal": "성취 기반 실시간 주가 변동 알고리즘과 안정적인 동시 가상 거래 체결 시스템 구축",
    "constraints": "동시 주문 트래픽 속에서도 주식 잔여 수량 및 유저 잔고 무결성 100% 보장",
    "key_decision": "STOMP WebSocket 기반 실시간 양방향 시세 동기화 및 데이터베이스 비관적 락 트랜잭션 아키텍처 채택",
    "collaboration": "팀원들과 함께 기획 회의 및 API 규격 설계를 주도하고, 백엔드 코어 거래 엔진 개발을 총괄했습니다.",
    "architecture": "Java 17 + Spring Boot 3 + Spring Data JPA + STOMP WebSocket + H2 / MySQL + SwiftUI (macOS / iOS)",
    "quality_assurance": "동시 매수·매도 요청 스트레스 테스트, 트랜잭션 롤백 무결성 검증, 소켓 재연결 세션 안정성 테스트",
    "deployment": "Spring Boot 백엔드 서버 빌드 및 로컬/클라우드 환경 무중단 소켓 통신 테스트 완료",
    "evidence": "GitHub 소스코드 커밋 이력, API 명세서, WebSocket STOMP 이벤트 다이어그램 및 시연 영상",
    "learnings": "금융 거래형 시스템에서 동시성 제어와 트랜잭션 ACID 보장의 중요성을 실전 코드로 깊이 체득했습니다.",
    "next_time": "Redis Pub/Sub을 활용한 분산 웹소켓 클러스터 확장 및 오더북 체결 매칭 엔진 고도화"
  },
  "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": {
    "summary": "개발자 밈과 알고리즘 문제 해결 상황을 인터랙티브 스토리텔링과 연애 시뮬레이션으로 유쾌하게 풀어낸 웹 게임 콘텐츠입니다. 회식, 코드 리뷰, 데드락 등 다채로운 공감 요소를 게임 시나리오와 카드 미니게임으로 구현했습니다.",
    "role": "팀원들과 함께 전체 시나리오와 복잡한 선택지 분기 트리를 설계하고, React + TypeScript + Vite 기반 프론트엔드 인터랙션과 Spring Boot 백엔드 세션 API, 진행 상태 영속화 로직, 미니 카드 게임 및 12가지 분기별 멀티 엔딩 판별 계산 엔진을 구현했습니다.",
    "problem": "사용자의 대화 선택지, 돌발 퀴즈 정답, 미니 카드 게임 결과에 따라 12가지 서로 다른 엔딩으로 분기되는 방대한 시나리오 트리를 관리해야 했습니다. 단순 if-else 조건문으로 분기를 처리할 경우 코드 복잡도가 기하급수적으로 증가하고 유지보수가 불가능해지는 문제가 있었습니다. 또한 브라우저 새로고침이나 네트워크 끊김 발생 시 사용자의 현재 진행 챕터, 히로인별 호감도 스탯, 인벤토리 아이템 상태가 유실되는 문제가 있었으며, 프론트엔드 단독 테스트용 목(Mock) 데이터와 실제 Spring Boot 백엔드 서버 연동 간의 전환 비용이 큰 점도 개발 속도를 저해했습니다.",
    "troubleshooting": "유한 상태 머신(Finite State Machine) 디자인 패턴을 도입하여 전체 씬(Scene) 전이와 호감도 가중치 계산 로직을 정형화된 상태 전이 테이블로 구조화했습니다. 세션 스토리지와 백엔드 DB 간의 2중 상태 동기화 메커니즘을 구축해 새로고침 시에도 직전 상태 노드로 즉각 복원되도록 설계했습니다. 프론트엔드에는 VITE_API_MODE 환경 변수에 따라 Mock 어댑터와 Spring Boot REST API 클라이언트를 런타임에 동적으로 주입하는 어댑터 패턴을 적용하여, 백엔드 배포 상태와 무관하게 프론트엔드 인터랙션과 엔딩 분기 검증을 완벽히 병렬로 진행할 수 있도록 해결했습니다.",
    "result": "12가지 멀티 엔딩과 풍부한 개발자 스토리라인, 반응형 비주얼 노벨 UI, 세션 저장 및 백엔드 상태 동기화를 완성하여 배포 첫 주 수많은 플레이어들에게 호평을 받으며 성공적인 인터랙티브 웹 게임 경험을 제공했습니다.",
    "target_audience": "개발자 밈과 인터랙티브 비주얼 노벨 스토리를 재미있게 즐기고 싶은 웹 사용자",
    "goal": "12개 멀티 엔딩을 지원하는 유연한 분기 엔진과 몰입감 있는 인터랙티브 웹 스토리 뷰어 구현",
    "constraints": "브라우저 새로고침이나 세션 재접속 시에도 플레이 진행 상황과 호감도 스탯 완벽 보존",
    "key_decision": "복잡한 스토리 분기 제어를 위해 상태 머신(State Machine) 아키텍처 채택",
    "collaboration": "팀원들과 시나리오 작성, 캐릭터 에셋 선정, 프론트·백엔드 API 명세 정의를 긴밀히 협업했습니다.",
    "architecture": "React 18 + TypeScript + Vite + Styled-Components / Java 17 + Spring Boot + REST API + Nginx + Vercel",
    "quality_assurance": "12가지 분기 루트 전수 시나리오 테스트, 세션 로컬 스토리지 및 DB 복구 검증",
    "deployment": "Vercel 프론트엔드 자동 배포 및 Spring Boot 백엔드 라이브 배포",
    "evidence": "GitHub 소스코드, 12가지 엔딩 분기 트리 다이어그램, 라이브 게임 배포 사이트",
    "learnings": "복잡한 조건 분기 시스템일수록 상태 머신 등 정형화된 디자인 패턴 적용이 유지보수성을 극대화함을 배웠습니다.",
    "next_time": "플레이어 선택지 통계 시각화 및 BGM과 음성 더빙 볼륨 커스텀 제어 기능 추가"
  },
  "EGGO — 농꾸하고 작심삼일 타파하자": {
    "summary": "지속적인 습관 형성을 돕기 위해 귀여운 농장 꾸미기 게이미피케이션과 온디바이스 AI 미션 인증을 결합한 스마트 습관 관리 모바일 앱입니다. 일일 미션을 인증하면 잔디와 농장 작물이 자라나며 건강한 루틴 형성을 지원합니다.",
    "role": "팀원과 함께 서비스 기획 및 UI/UX를 설계하고, Flutter/Dart 기반 Android 크로스플랫폼 모바일 앱 개발, Google ML Kit 온디바이스 비전 모델 연동, Gemini AI API 하이브리드 인증 파이프라인 구축 및 일일 습관 성장 시스템을 전담했습니다.",
    "problem": "사용자가 일일 습관 미션(텀블러 사용, 운동, 독서 등)을 수행하고 업로드한 인증 사진을 실시간으로 판별하여 농장 성장 보상을 지급해야 했습니다. 그러나 모든 사진을 매번 클라우드 대형 멀티모달 LLM API로 전송해 검증할 경우, 1건당 수 초 이상의 네트워크 대기 시간이 발생해 사용자 경험이 저하되고 지속적인 API 호출 비용이 감당하기 어려울 정도로 증가하는 문제가 있었습니다. 반면 모바일 온디바이스 모델만 사용할 경우 복잡하거나 애매한 인증 사진에 대한 판별 정확도가 떨어지는 딜레마가 있었습니다.",
    "troubleshooting": "Google ML Kit On-Device Vision 모델과 클라우드 Gemini AI API를 결합한 2단계 하이브리드 검증 파이프라인을 구축했습니다. 모바일 기기 내부에서 1차로 ML Kit 이미지 라벨링 모델을 실행해 사물 객체와 신뢰도를 50ms 이내로 초고속 분류하고, 신뢰도가 85% 이상으로 명확한 일상 미션은 로컬에서 즉시 성공 판정했습니다. 신뢰도가 모호하거나 정밀한 상황 맥락 판별이 필요한 15% 미만의 엣지 케이스 사진에 대해서만 2차로 Gemini REST API를 호출하도록 라우팅했습니다. 이를 통해 평균 검증 응답 속도를 2.5초에서 0.2초로 90% 이상 단축시키고 클라우드 API 호출 비용을 80% 이상 절감했습니다.",
    "result": "Flutter 기반 부드러운 농장 UI 화면과 잔디 심기 일일 성장 시스템, Google ML Kit 온디바이스 이미지 인증 및 일일 인증 제한 로직을 구현하여 실제 Android 기기에서 매끄럽게 동작하는 완성도 높은 앱을 완성했습니다.",
    "target_audience": "작심삼일을 극복하고 게임처럼 재미있게 매일의 좋은 습관을 형성하고 싶은 사용자",
    "goal": "온디바이스 AI 이미지 인식 기반의 빠르고 정확한 미션 인증 및 농장 꾸미기 보상 루프 구축",
    "constraints": "모바일 네트워크가 불안정한 환경에서도 1차 온디바이스 인증이 즉시 동작하도록 보장",
    "key_decision": "클라우드 의존도를 낮추기 위해 Google ML Kit 온디바이스 비전 + Gemini AI 2단계 하이브리드 검증 채택",
    "collaboration": "팀원과 기획·디자인을 함께 수립하고 모바일 클라이언트 및 AI 인증 로직을 전담 개발했습니다.",
    "architecture": "Flutter 3 + Dart + Google ML Kit Vision (On-Device) + Gemini AI REST API + Android Studio",
    "quality_assurance": "다양한 조도·각도의 사물 사진 100장 대상 온디바이스 라벨링 검출률 테스트 및 예외 처리 검증",
    "deployment": "Android APK 빌드 및 실제 스마트폰 디바이스 현장 설치 및 시연 완수",
    "evidence": "GitHub README 문서, ML Kit 객체 인식 로그 데이터, Android 시연 영상",
    "learnings": "온디바이스 경량 AI 모델과 클라우드 LLM API의 하이브리드 파이프라인 구축 노하우를 습득했습니다.",
    "next_time": "친구들과 함께 농장을 가꾸는 소셜 협동 퀘스트 및 iOS 버전 확장 출시"
  },
  "자율 추종 스마트 카트 — Aruco·LiDAR 센서 융합": {
    "summary": "Aruco 비전 마커와 2D LiDAR 센서를 결합해 사용자를 인식하고 안전 거리를 유지하며 스스로 따라가는 지능형 스마트 카트를 ROS2와 Gazebo 가상 환경에서 구현한 로보틱스 프로젝트입니다. 비전 인식 기반의 유연한 추종 주행과 라이다 기반의 즉각적인 돌발 장애물 회피/정지를 센서 융합으로 완성했습니다.",
    "role": "ROS2 가상 주행 환경 구축부터 센서 데이터 필터링, OpenCV Aruco 마커 검출, P-control 로봇 제어, LiDAR 긴급 정지 안전 알고리즘, Gazebo Sim 통신 브릿지 디버깅, 데모 영상 제작까지 전 과정을 1인으로 수행했습니다.",
    "problem": "단일 RGB 카메라 비전 센서만으로 사용자의 비전 마커를 추종하도록 구현했을 때, 주행 중 급격한 회전이나 조명 변화, 타겟 가림 현상(Occlusion)이 발생하면 마커를 순간적으로 놓쳐 카트가 궤도를 이탈하는 문제가 발생했습니다. 반대로 비전 카메라에 잡히지 않는 사각지대의 돌발 장애물이나 급접근 물체를 카메라만으로는 즉각 감지할 수 없어 충돌 위험이 상존했습니다. 또한 최신 Gazebo Sim 가상 환경에서 기존 ROS2 Twist 메시지 규격과 시뮬레이터의 TwistStamped 규격 차이로 인해 주행 토픽(/cmd_vel)이 전달되지 않아 로봇이 동작하지 않는 통신 문제가 있었습니다.",
    "troubleshooting": "OpenCV Aruco 4x4_50 비전 마커 추종과 2D LiDAR 센서를 결합한 2단계 센서 융합 안전 제어 아키텍처를 설계했습니다. 카메라 프레임에서 검출된 마커의 모서리 좌표와 면적 오차에 P-control(비례 제어)을 적용해 선속도와 각속도를 부드럽게 가감속하는 추종 알고리즘을 구현했습니다. 동시에 2D LiDAR 센서 데이터 중 전방 -25°~+25° 영역의 거리 데이터를 실시간 필터링하여, 0.5m 이내에 전방 장애물이 감지되는 즉시 비전 주행 명령을 강제로 0으로 오버라이드(Override)하는 긴급 정지 안전 인터럽트 로직을 구축했습니다. Gazebo Sim 통신 문제는 ros_gz_bridge 패키지를 통해 메시지 타입을 명시적으로 브릿징 변환하여 시뮬레이션 환경에서의 완벽한 실시간 주행 및 충돌 방지를 검증했습니다.",
    "result": "ROS2와 Gazebo Sim 환경에서 Aruco 마커 인식 P-control 주행과 LiDAR 0.5m 이내 긴급 정지 2중 안전 제어를 검증하고 최종 시연 영상을 제작했습니다.",
    "target_audience": "마트나 물류 창고 등에서 무거운 짐을 들지 않고 사용자를 안전하게 따라오도록 돕는 스마트 카트 시스템",
    "goal": "비전(마커 추종)과 LiDAR(장애물 감지) 센서 융합을 통한 충돌 없는 자율 추종 주행 제어 구현",
    "constraints": "시뮬레이션 센서 노이즈 속에서도 돌발 장애물 출현 시 100ms 이내 긴급 정지 반응성 확보",
    "key_decision": "단일 센서의 한계를 극복하기 위해 비전 추종 + LiDAR 안전 정지 2단계 이중화 제어 아키텍처 채택",
    "collaboration": "1인 프로젝트로 로봇 제어 모델링부터 알고리즘 구현, 시뮬레이션 검증까지 완수했습니다.",
    "architecture": "Gazebo Sim 카메라·LiDAR(/camera, /scan) → cart_control 노드 구독 → P-control 기반 /cmd_vel Twist 발행 (Python, ROS2, OpenCV Aruco, LiDAR, ros_gz_bridge)",
    "quality_assurance": "마커 인식 거리(1~3m) 추종 정밀도 측정 및 0.5m 이내 장애물 돌발 출현 시 긴급 정지 반응 검증",
    "deployment": "Gazebo 시뮬레이터 가상 환경 빌드 및 주행 데모 영상 제작",
    "evidence": "GitHub 소스코드, ROS2 패키지 노드 구성도 및 Gazebo 시뮬레이션 주행 시연 비디오",
    "learnings": "로보틱스 시스템에서 센서 데이터의 노이즈 처리와 하드웨어/통신 계층 간 브릿지 설정의 중요성을 배웠습니다.",
    "next_time": "실제 라즈베리파이 및 모터 드라이버 하드웨어 환경으로의 포팅 및 실물 카트 주행 테스트"
  },
  "Localhost — 멀티플레이어 뮤직 퀴즈 게임": {
    "summary": "여러 사용자가 웹 브라우저를 통해 실시간으로 방에 접속해 노래 맞추기와 사투리 가사 퀴즈를 함께 즐기는 3D 인터랙티브 멀티플레이어 음악 퀴즈 게임입니다.",
    "role": "팀원과 함께 서비스 기획 및 UI/UX를 정리하고, Next.js 16 App Router와 React 19 기반 프론트엔드 구축, Three.js & React Three Fiber 기반 3D 인터랙티브 게임 환경 구현, Socket.io 실시간 양방향 이벤트 통신 연동, 반응형 애니메이션 및 Web Audio API 오디오 스트리밍 재생 제어를 전담했습니다.",
    "problem": "다양한 네트워크 환경과 기기 스펙을 가진 다수의 플레이어가 동일한 음악 퀴즈 방에 접속해 실시간으로 노래를 듣고 정답을 맞히는 과정에서, 플레이어 간 음원 재생 시점의 밀리초 단위 불일치가 발생했습니다. 이로 인해 특정 유저가 노래를 먼저 듣고 정답을 선점하는 불공정한 레이스 컨디션(Race Condition)이 일어났습니다. 또한 Three.js 기반의 3D 가상 공간 렌더링과 고빈도 Socket.io 실시간 패킷 처리가 단일 브라우저 메인 스레드에서 동시에 발생하면서 프레임 드랍(FPS 저하)과 오디오 버퍼 지연이 발생하는 성능 병목이 있었습니다.",
    "troubleshooting": "서버를 마스터 타임스탬프로 설정하고 NTP 기반 클라이언트 레이턴시 측정 및 핑-퐁 RTT(Round Trip Time) 오차 보정 알고리즘을 구현했습니다. 서버가 음원 시작 타임스탬프를 브로드캐스트하면 각 클라이언트가 자신의 RTT/2 지연을 계산해 정확히 동일한 절대 시간에 Web Audio API 버퍼를 동기화 재생하도록 구현했습니다. 3D 그래픽 부하는 Three.js 씬의 불필요한 리렌더링을 차단하고 컴포넌트 라이프사이클에 맞춘 엄격한 텍스처/지오메트리 메모리 해제 로직을 적용해 60fps를 안정적으로 유지했습니다. 또한 Socket.io 방(Room) 격리 구조로 트래픽 브로드캐스팅 범위를 최소화했습니다.",
    "result": "멀티플레이어 게임방 생성 및 참가, 노래 맞추기 및 사투리 가사 맞추기 모드, Three.js 기반 3D 인터랙티브 그래픽, 소셜 로그인, 게임 내 화폐 상점 및 실시간 채팅까지 지원하는 완성도 높은 웹 게임을 Docker Compose 기반으로 통합 배포했습니다.",
    "target_audience": "친구들과 온라인으로 가볍고 신나게 음악 퀴즈와 사투리 퀴즈를 3D 환경에서 즐기고 싶은 사용자",
    "goal": "저지연 오디오 스트리밍과 정확한 동기화 기반의 3D 실시간 멀티플레이어 퀴즈 게임 구현",
    "constraints": "다양한 네트워크 대역폭의 클라이언트 환경에서도 완벽한 음원 재생 싱크 및 60fps 렌더링 유지",
    "key_decision": "클라이언트 타이머 대신 서버 마스터 타임스탬프 브로드캐스팅 구조 및 Three.js 가상 공간 렌더링 채택",
    "collaboration": "팀원과 기획·디자인을 함께 정리하고 프론트엔드 및 3D/오디오/소켓 연동 전반을 담당했습니다.",
    "architecture": "Next.js 16 (App Router) + React 19 + Three.js / React Three Fiber + Tailwind CSS + TypeScript / Express.js + Socket.io + Prisma + PostgreSQL + Redis + Docker Compose",
    "quality_assurance": "다중 브라우저 탭 및 기기 동시 접속 환경에서 룸 생성·참가·퇴장, 곡 동기화, 정답 판별, 채팅, 상점 구매 트랜잭션 기능별 검증",
    "deployment": "Docker Compose 기반 PostgreSQL, Redis, 백엔드, 프론트엔드 통합 컨테이너 빌드 및 클라우드 배포",
    "evidence": "GitHub README의 기능·기술 스택·아키텍처 문서와 실제 게임 플레이 영상 및 커밋 이력",
    "learnings": "실시간 멀티플레이어 환경에서 웹소켓 이벤트 라이프사이클 관리와 상태 동기화 기법을 깊이 학습했습니다.",
    "next_time": "WebRTC 기반 실시간 음성 채팅 기능 추가 및 커스텀 플레이어 아바타 3D 모델링 확장"
  },
  "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": {
    "summary": "복잡하고 방대한 공공 복지 정책과 기술 정보를 누구나 이해하기 쉬운 비주얼 카드와 요약 콘텐츠로 변환해주는 정보 접근성 향상 플랫폼입니다. 3일 해커톤에서 기획 및 개발되었습니다.",
    "role": "3일 해커톤에서 기획자·디자이너·프론트엔드 팀원들과 협업하여 Java 17·Spring Boot 3 기반 REST API 백엔드 설계, Spring Security & JWT 인증, 맞춤형 복지 정보 CRUD·필터링·북마크, Apache POI 기반 대량 Excel 데이터 일괄 파싱 및 AI 요약 파이프라인, Docker & AWS EC2/ECR 무중단 배포 파이프라인 구축을 전담했습니다.",
    "problem": "72시간이라는 극도로 짧은 해커톤 일정 동안 방대하고 구조화되지 않은 공공 복지 정책 데이터와 전문 IT 뉴스 정보를 수집해, 일반 사용자가 한눈에 읽기 쉬운 표준 비주얼 카드로 변환하는 백엔드 시스템을 구축해야 했습니다. 대량의 복지 엑셀 데이터 파일(수천 행)을 서버에서 파싱할 때 메모리 오버헤드와 I/O 블로킹이 발생해 API 응답이 지연되었고, 단기 해커톤 특성상 프론트엔드와 백엔드 간의 API 명세 변경이 잦아 연동 단계에서 병목이 생길 위험이 매우 높았습니다.",
    "troubleshooting": "Spring Boot 3 도메인 주도 모듈화 아키텍처를 도입하여 인증(Auth), 복지(Welfare), 콘텐츠(News) 도메인을 철저히 격리하고 계층별 DTO와 예외 처리 표준 규격을 해커톤 시작 6시간 만에 확립했습니다. 대량 엑셀 처리는 Apache POI 스트리밍 파서를 적용해 힙 메모리 사용량을 최소화하며 비동기 배치(Async Batch)로 파싱하고, OpenAI API 요약 파이프라인을 비동기 스레드 풀로 분리해 메인 API 스레드의 블로킹을 방지했습니다. 또한 Docker 컨테이너화와 GitHub Actions CI/CD를 해커톤 1일 차에 구축하여, 백엔드 배포 즉시 프론트엔드 팀원이 실서버 HTTPS 환경에서 실시간 연동 테스트를 진행할 수 있도록 지원했습니다.",
    "result": "72시간 해커톤 동안 회원가입 및 JWT 토큰 인증, 맞춤형 복지 조건 필터링 검색, 북마크 관리, Excel 뉴스 등록 및 AI 요약 백엔드 API를 완벽히 구현하여 실제 서비스 가능한 MVP를 성공적으로 완성했습니다.",
    "target_audience": "어렵고 복잡한 정부 복지 정책이나 전문 기술 정보를 쉽고 빠르게 찾아보고 요약 카드로 확인하고 싶은 일반 대중",
    "goal": "누구나 손쉽게 정보에 접근할 수 있는 직관적인 비주얼 카드 뷰어 및 고성능 REST API 플랫폼 제작",
    "constraints": "72시간 제한된 일정 속에서 백엔드 API와 프론트엔드 완벽 연동 및 라이브 HTTPS 배포 달성",
    "key_decision": "복잡한 로직 대신 Spring Boot 도메인 모듈화와 Docker/EC2 빠른 CI/CD 구조로 배포 성공률 극대화",
    "collaboration": "3일 해커톤에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 일일 스크럼 및 실시간 슬랙 연동으로 협업했습니다.",
    "architecture": "Java 17 + Spring Boot 3 + Spring Security + Spring Data JPA + MySQL + Redis + Docker + AWS EC2 / ECR",
    "quality_assurance": "회원가입/로그인 Bearer 토큰 인증, 복지 조건 필터링, 북마크 CRUD, Excel 파싱 API 검증",
    "deployment": "GitHub Actions CI/CD → AWS ECR 이미지 빌드 및 EC2 컨테이너 자동 배포 (HTTPS 적용)",
    "evidence": "GitHub README의 기획 배경·기능·API·ERD·배포 문서와 백엔드 구현 커밋에서 확인할 수 있습니다.",
    "learnings": "단기 해커톤 환경에서 명확한 API 계약과 빠른 CI/CD 자동화가 협업 효율에 미치는 결정적 영향을 배웠습니다.",
    "next_time": "Elasticsearch 기반 전문 검색 엔진 연동 및 사용자 맞춤형 공공 정책 추천 알고리즘 구현"
  }
};

const projects = await client.query("SELECT id, title FROM projects WHERE portfolio_id = $1", [portfolioId]);
console.log(`Updating ${projects.rows.length} projects in DB with rich, full original case studies...`);

for (const row of projects.rows) {
  const patch = projectsData[row.title];
  if (patch) {
    await client.query(
      `UPDATE projects
          SET summary = $1,
              role = $2,
              problem = $3,
              troubleshooting = $4,
              result = $5,
              target_audience = $6,
              goal = $7,
              constraints = $8,
              key_decision = $9,
              collaboration = $10,
              architecture = $11,
              quality_assurance = $12,
              deployment = $13,
              evidence = $14,
              learnings = $15,
              next_time = $16
        WHERE id = $17`,
      [
        patch.summary,
        patch.role,
        patch.problem,
        patch.troubleshooting,
        patch.result,
        patch.target_audience,
        patch.goal,
        patch.constraints,
        patch.key_decision,
        patch.collaboration,
        patch.architecture,
        patch.quality_assurance,
        patch.deployment,
        patch.evidence,
        patch.learnings,
        patch.next_time,
        row.id
      ]
    );
    console.log("Updated deep case study for:", row.title);
  }
}

await client.end();
console.log("All 8 projects successfully updated in database with deep Problem & Troubleshooting!");
