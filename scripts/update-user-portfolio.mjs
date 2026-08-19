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

협업할 때는 의견을 자유롭게 내는 만큼 다른 사람의 의견을 경청하고 조율하는 것을 중요하게 생각합니다. 초등학교 3학년부터 고등학교 2학년까지 매년 학급 반장, 중3 전교부회장, 고2 학과 과장을 역임하고 50명 규모 연합동아리 회장을 맡으며 다져온 경험을 바탕으로, 일정이나 역할에 문제가 생기면 **감정과 사실을 분리해 따뜻하지만 명확하게 소통**하며 함께 해결할 방법을 찾습니다.`;

const workStyle = `일을 시작할 때는 먼저 무엇을 만들어야 하는지와 우선순위를 명확히 정리합니다. 요구사항을 작은 단위로 나누고, **API와 데이터 흐름을 충분히 이해한 뒤 단계별로 구현**합니다. 모르는 내용은 질문을 잘게 나누어 필요한 답부터 찾아보고, 혼자 판단하기 어려운 부분은 팀원과 적극적으로 소통하며 싱크를 맞춥니다.

처음 접하는 기술은 AI를 활용해 사용법과 구현 방향을 빠르게 파악합니다. 한 번에 완성된 답을 얻으려 하기보다 현재 막힌 부분을 구체적으로 질문하고, 예시를 프로젝트에 맞게 변환해 직접 실행해 봅니다. 맞지 않는 부분은 디버깅하며 내재화하고, **정상 흐름뿐만 아니라 빈 입력값이나 예외 상황에서의 동작까지 꼼꼼히 검증**합니다.

협업할 때는 각자의 진행 상황을 투명하게 공유하고, 병목이나 이슈가 생기면 **사실을 중심으로 빠르게 공유**해 함께 최선의 대안을 모색합니다.`;

const personalValues = `일이든 말이든, **진심이 있어야 끝까지 책임질 수 있다**고 생각합니다. 진심은 잘 모르는 것을 솔직하게 인정하고 배우려는 태도, 잘되지 않았을 때 포기하지 않고 다시 시도하는 끈기, 그리고 함께하는 동료를 배려하는 태도에서 드러난다고 믿습니다.

기술적으로는 **제가 정확히 이해한 만큼 구현**하고, 부족한 부분은 끝까지 파고들어 질문하며 채워가려고 합니다. 의견이 다를 때도 더 나은 제품과 성장을 위한 건강한 피드백으로 받아들입니다.

AI 도구가 고도화될수록 결국 사람과 사람 사이의 신뢰와 진정성 있는 소통이 가장 강력한 경쟁력이라고 믿습니다. 팀에 긍정적인 에너지를 전하고, **동료들이 다시 함께 일하고 싶어 하는 든든한 동료**가 되는 것이 제 핵심 가치입니다.`;

const lookingFor = `**Java와 Spring Boot를 중심으로 백엔드 기본기**를 더 탄탄하게 쌓고 싶습니다. 대용량 트래픽을 고려한 API와 데이터베이스 설계, 안정적인 예외 처리와 트랜잭션 관리, CI/CD 배포 파이프라인을 실전 서비스를 통해 깊이 있게 확장해 나가겠습니다.

새로운 기술이나 언어를 배울 때는 AI를 적극 활용해 학습 속도를 극대화하고, 직접 코드를 작성하고 검증하며 단단한 제 것으로 체화하겠습니다. 백엔드 개발을 중심으로 성장하면서도 **사용자가 실제로 마주하는 흐름과 서비스의 완성도를 함께 고민**하겠습니다.

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
    description: "초등학교 3학년부터 고등학교 2학년까지 매년 **학급 반장, 중3 전교부회장, 고2 학과 과장**을 역임하며 다져온 조직 운영 노하우를 바탕으로 자율 동아리 '데포르테'를 기획·창설했습니다. 50명 규모의 연합동아리에서 기획부원부터 회장까지 활동하며 소외되는 사람 없이 모두가 주도적으로 참여하는 문화를 이끌었습니다. 부원 개개인의 의견을 세심하게 조율하고 **감정과 사실을 분리해 따뜻하지만 명확하게 소통**하여, 높은 만족도와 끈끈한 팀 협업 문화를 구축했습니다.",
    organization: "데포르테 · 신촌×안암 연합동아리"
  },
  {
    id: "career-1786505237436",
    role: "스터디 · 아이디어톤·프로젝트 협업",
    period: "2024.03 – 2024.08",
    description: "매주 Node.js 서버 스터디에 참여하며 백엔드 기초 역량을 다졌습니다. 6월 아이디어톤에서는 팀 기획에 주도적으로 참여해 우수상을 수상했으며, 7~8월 실전 프로젝트에서는 **PM·프론트엔드 개발자와 API 규격을 정의하고 연동하는 협업**을 완수했습니다. 진행 상황과 변경 사항을 투명하게 맞추며 팀 단위로 서비스를 완성해가는 협업 메커니즘을 체득했습니다.",
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
    "summary": "개발자가 기술 선택과 문제 해결 과정을 구조적으로 기록하고 하나의 링크로 발행할 수 있는 웹 서비스를 개발했습니다. 지금 보고 계신 이 웹 포트폴리오 역시 Folioframe 서비스를 직접 기획하고 개발하여 발행한 실제 프로덕션 결과물입니다. 단순한 이력 나열을 넘어 기여도와 문제 해결 능력을 온전히 전달할 수 있도록 돕습니다.",
    "role": "1인 풀스택 개발자로서 서비스 기획, 정보 구조(IA) 설계, Next.js App Router 기반 화면 구현, Neon PostgreSQL 데이터 모델링 및 마이그레이션, Vercel CI/CD 배포 파이프라인 구축 전 과정을 전담했습니다. 실시간 대시보드 에디터와 공개 발행 뷰 간의 데이터 흐름을 일원화하고, 직군별 4가지 테마 시스템(Editorial, Minimal, Bold, Noir), 파일 첨부 스토리지 연동, 반응형 뷰어 UI를 직접 구현했습니다.",
    "problem": "기존 노션이나 정적 블로그 기반 포트폴리오는 프로젝트 설명이 단순 기술 스택 나열이나 완성된 결과 화면 캡처에 치우쳐 있어, 채용 담당자와 면접관이 지원자의 실제 기여도와 트러블슈팅 과정, 기술적 판단 근거를 파악하기 어려웠습니다. 또한 작성자 입장에서도 레이아웃을 통일성 있게 유지하고 모바일과 PC 환경에 맞추어 깔끔한 링크로 공유하기 번거로운 문제가 있었습니다.",
    "troubleshooting": "프로필 입력 상태와 프로젝트 데이터 구조를 분리하고, 서버 측 검증 스키마와 대시보드 실시간 미리보기 데이터를 공통 TypeScript 계약 타입으로 단일화했습니다. Next.js App Router와 Server Actions/API Route 분리 설계를 채택하여 편집 시의 지연 시간을 최소화하고, Serverless Neon PostgreSQL과의 커넥션 풀링을 최적화해 데이터 정합성과 빠른 렌더링 성능을 동시에 확보했습니다.",
    "result": "프로필 작성부터 8개 상세 프로젝트 편집, 4가지 맞춤 테마 전환, 25MB 파일 첨부, 고유 슬러그 기반의 웹 포트폴리오 즉시 발행까지 단일 데이터 흐름으로 이어지는 웹 빌더를 완성하여 실제 서비스로 배포·운영 중입니다. (현재 보고 계신 이 포트폴리오도 Folioframe으로 직접 빌드하고 배포한 실제 라이브 서비스입니다.)",
    "target_audience": "자신의 프로젝트 경험과 문제 해결 과정을 구조적으로 정리해 면접관에게 설득력 있는 단일 링크로 전달하고자 하는 개발자 및 취업 준비생",
    "goal": "채용 담당자가 개발자의 실제 기여 범위와 기술적 깊이, 문제 해결 과정을 한눈에 빠르고 명확하게 파악할 수 있는 최적의 포트폴리오 작성·발행 플랫폼 구축",
    "constraints": "로그인된 사용자의 편집 권한 및 비공개 초안 데이터와 외부에 공개되는 퍼블릭 포트폴리오 페이지를 철저히 분리하면서도, 대시보드 미리보기와 실제 발행 뷰가 100% 동일한 레이아웃으로 렌더링되어야 하는 제약이 있었습니다.",
    "key_decision": "Next.js App Router의 서버 컴포넌트와 클라이언트 인터랙션 계층을 명확히 분리하고, Serverless PostgreSQL(Neon)과의 연결을 최적화하여 빠른 초기 로딩 속도와 데이터 일관성을 확보했습니다.",
    "collaboration": "1인 풀스택 개발 프로젝트로 요구사항 정의, 사용자 인터뷰, UI/UX 디자인, 프론트엔드·백엔드 구현, 배포 및 실제 피드백 수렴을 통한 지속적 기능 개선을 전담했습니다.",
    "architecture": "Next.js 15 App Router, React, TypeScript, PostgreSQL(Neon), CSS Modules, Vercel Serverless Functions 기반 풀스택 웹 아키텍처",
    "quality_assurance": "Playwright E2E 테스트와 TypeScript Strict Mode를 적용해 런타임 오류를 방지하고, 테마 전환 및 모바일/태블릿/데스크톱 반응형 렌더링 무결성을 반복 검증했습니다.",
    "deployment": "GitHub 연동 Vercel CI/CD 자동화 배포 파이프라인 구축 및 Neon Serverless PostgreSQL 연동을 통해 무중단 운영 환경을 구성했습니다.",
    "evidence": "GitHub 공개 저장소(https://github.com/alicebsy/folioframe) 및 실제 도메인 배포 환경(https://folioframe-lake.vercel.app)에서 실시간 서비스 동작을 직접 확인할 수 있습니다.",
    "learnings": "대시보드 에디터와 공개 뷰 사이의 데이터 계약 일관성과 상태 동기화 설계가 웹 서비스의 개발 생산성과 유지보수성에 미치는 결정적 영향을 체감했습니다.",
    "next_time": "포트폴리오 방문자 유입 통계 분석 대시보드(조회수, 체류 시간) 및 사용자 커스텀 도메인(CNAME) 연결 기능을 추가로 고도화할 계획입니다."
  },
  "CapLog": {
    "summary": "스마트폰 사진 보관함의 스크린샷을 기기 내부에서 분석하여 제목, 요약, 카테고리, 태그, 장소, 날짜 등이 정리된 검색 가능한 생활 정보 카드로 자동 변환해주는 지능형 iOS 스크린샷 큐레이션 서비스입니다. 2025년 이화여자대학교 컴퓨터공학 졸업프로젝트로 시작해 장려상을 수상한 후, 현재까지 1인 개발로 전면 재설계 및 실서버 전환 고도화를 이어가고 있습니다.",
    "role": "iOS 앱에서 Photos·PhotoKit을 통한 스크린샷 자동 탐색 및 Apple Vision Framework 기반 온디바이스 OCR과 이미지 분류 파이프라인을 구축하고, Spring Boot 백엔드 REST API 설계를 담당했습니다. 개인정보 정규식 마스킹(계좌번호, 주민번호, 전화번호 등), AI 기반 요약 카드 자동 생성, 스마트 폴더 분류, 텍스트 검색, CoreLocation 기반 위치 추천 및 마감일 리마인더 알림, 친구·채팅·카드 스냅샷 공유, JWT 기반 사용자 인증 및 데이터 격리 구조를 구현했습니다. 졸업프로젝트 완료 후에는 SwiftUI 화면 구조와 UI/UX를 전면 재설계하고, Mock 데이터로 동작하던 기능들을 실제 Spring Boot 서버 데이터 흐름으로 전환했으며, 로컬 이미지 보안 저장 및 AI 분석 실패 시 Fallback 대체 카드 처리 로직까지 완벽히 보완했습니다.",
    "problem": "현대 스마트폰 사용자는 유용한 정보(쿠폰 만료일, 채용 공고, 맛집 위치, 계좌번호 등)를 스크린샷으로 자주 저장하지만, 사진첩에 수천 장의 사진과 뒤섞여 정작 필요한 순간에 검색하거나 찾기 어려워 '디지털 무덤'으로 방치됩니다. 또한 금융 정보나 개인정보가 포함된 스크린샷을 외부 클라우드 AI 서버로 무분별하게 전송할 경우 심각한 프라이버시 침해 위험이 발생하는 문제가 있었습니다.",
    "troubleshooting": "Apple Vision Framework를 활용해 기기 내부(On-Device)에서 1차로 텍스트를 인식하고 정규표현식 기반으로 민감 개인정보를 마스킹한 뒤, 필요한 텍스트 메타데이터만 Spring Boot 백엔드로 비동기 전송하여 AI 요약을 수행하는 하이브리드 파이프라인을 구축했습니다. 이를 통해 사용자 프라이버시를 원천 보호하면서도 서버 트래픽과 연산 비용을 대폭 절감하고, 네트워크 지연 없이 빠른 분석 속도를 확보했습니다.",
    "result": "총 200건의 실측 스크린샷 데이터셋 대상 자동 분류 정확도 95% 달성, 서로 다른 3개 지역(이화여대, 일산, 광화문) 현장 테스트에서 위치 기반 장소 추천 성공률 90%를 검증했습니다. 2025년 컴퓨터공학 졸업프로젝트 장려상을 수상했으며, 이후 1인 개발로 SwiftUI 아키텍처 리팩토링 및 Spring Boot 실서버 연동 고도화를 성공적으로 완수했습니다.",
    "target_audience": "스크린샷으로 일상과 업무 정보를 자주 캡처하지만 사진첩 정리가 어렵고, 나중에 원하는 정보를 위치나 마감일에 맞추어 빠르게 다시 찾아보고 싶은 스마트폰 사용자",
    "goal": "스크린샷을 캡처하는 즉시 내용을 자동으로 분석하고 구조화하여, 필요한 순간에 검색과 위치 기반 알림으로 바로 찾아주는 스마트 캡처 비서 구현",
    "constraints": "고해상도 이미지 처리 시 모바일 기기의 메모리 과부하를 방지해야 했으며, 금융 정보나 개인 식별 정보가 포함된 원본 스크린샷이 외부 클라우드 서버에 노출되지 않도록 철저한 온디바이스 보안 처리가 요구되었습니다.",
    "key_decision": "온디바이스 Apple Vision OCR 전처리와 서버 경량화 AI 모델의 하이브리드 아키텍처를 채택하여 클라이언트 반응성과 데이터 보안성을 동시에 확보했습니다.",
    "collaboration": "2024년 9월부터 2025년 8월까지 2인 팀으로 졸업 프로젝트를 진행하여 기본 시스템을 완성했고, 2025년 8월 이후에는 혼자 개발을 이어가며 화면 재설계 및 실서버 전환 고도화를 진행하고 있습니다.",
    "architecture": "iOS 클라이언트(Swift, SwiftUI, PhotoKit, Apple Vision Framework, Combine) + 백엔드(Java 17, Spring Boot, Spring Data JPA, PostgreSQL/MySQL, Spring Security, JWT, AWS S3)",
    "quality_assurance": "다양한 해상도, 기울어진 이미지, 저화질 스크린샷을 대상으로 한 OCR 인식률 테스트 및 Xcode Instruments를 활용한 메모리 릭(Memory Leak) 프로파일링과 예외 처리 검증을 진행했습니다.",
    "deployment": "AWS EC2 기반 백엔드 컨테이너화 배포 및 TestFlight를 통한 모바일 베타 테스트 환경을 구축했습니다.",
    "evidence": "GitHub 리포지토리의 iOS 및 Spring Boot 백엔드 코드베이스, API 명세서, 시연 데모 영상, 그리고 졸업 프로젝트 최종 보고서에서 확인할 수 있습니다.",
    "learnings": "모바일 클라이언트 온디바이스 연산과 백엔드 비동기 분산 처리 간의 적절한 역할 분담이 모바일 사용자 경험과 보안에 미치는 절대적 영향을 체감했습니다.",
    "next_time": "CoreLocation 기반 지오펜싱(Geo-fencing) 알고리즘을 고도화하여 특정 상점이나 위치 방문 시 관련 캡처 내역을 푸시 알림으로 제안하는 위치 맥락 추천 기능을 추가할 계획입니다."
  },
  "Ticker — Human Stock Market": {
    "summary": "개인의 가치, 성장 지표, 성과를 주식 시장 메커니즘으로 시각화하고 상호 투자·응원할 수 있는 소셜 파이낸스 플랫폼입니다. 실시간 호가 변동과 가상 주식 거래 시스템을 웹으로 구현했습니다.",
    "role": "팀원들과 함께 서비스 기획 및 프론트엔드 연동 회의를 주도하고, 백엔드 아키텍처 설계, 실시간 주가 변동 알고리즘, 가상 주식 매수·매도 거래 체결 엔진, 트랜잭션 무결성 보장 및 RESTful API 구현 전반을 담당했습니다.",
    "problem": "여러 사용자가 동시에 특정 인물의 가상 주식을 매수하거나 매도할 때 데이터베이스 동시성 이슈(Race Condition)가 발생해 잔고가 음수가 되거나 체결가가 왜곡되는 데이터 불일치 위험이 있었습니다.",
    "troubleshooting": "데이터베이스 비관적 락(Pessimistic Lock)과 트랜잭션 격리 수준을 도메인 특성에 맞게 강화하고, 주문 체결 전 잔고 검증 및 주문 큐 로직을 설계하여 동시 주문 상황에서도 잔고와 주가 정합성을 100% 보장했습니다.",
    "result": "가상 주식 매수·매도 거래 체결, 포트폴리오 자산 평가액 산출, 실시간 호가 반영 API를 완성하여 동시 다발적인 가상 거래 요청을 안정적으로 처리하는 소셜 주식 플랫폼을 완성했습니다.",
    "target_audience": "자기계발 성과를 정량적인 지표로 확인하고, 동료들과 게이미피케이션 요소를 통해 서로를 응원하며 동기부여를 얻고 싶은 사용자",
    "goal": "현실 주식 시장의 거래 메커니즘을 친근하게 재해석하여 신뢰할 수 있는 소셜 가치 거래 및 동기부여 시스템 구축",
    "constraints": "가상 자산 거래이더라도 금융 도메인에 준하는 트랜잭션 원자성(ACID)과 엄격한 잔고 무결성이 보장되어야 했습니다.",
    "key_decision": "동시성 제어를 위해 데이터베이스 레벨의 락킹 전략과 이벤트 로깅 테이블을 함께 설계하여 거래 추적성과 무결성을 동시에 달성했습니다.",
    "collaboration": "팀원들과 함께 개발한 협업 프로젝트에서 백엔드를 담당했습니다.",
    "architecture": "Node.js, Express REST API, PostgreSQL 데이터베이스, Redis 세션 관리, React 프론트엔드 연동 아키텍처",
    "quality_assurance": "동시 다중 매수/매도 요청 시나리오를 가정한 동시성 스트레스 테스트 및 단위 테스트를 수행하여 잔고 오차와 교착 상태(Deadlock)를 검증했습니다.",
    "deployment": "Vercel 및 클라우드 인프라를 통한 웹 서비스 배포",
    "evidence": "GitHub README의 기능·기술 스택·구조·실행 방법과 배서연 명의의 backend·api 관련 커밋에서 확인할 수 있습니다.",
    "learnings": "금융/거래 도메인에서 동시성 제어, 트랜잭션 격리 수준, 락킹 전략의 미세한 차이가 시스템 전체 정합성에 미치는 중요성을 깊이 체득했습니다.",
    "next_time": "Redis 기반 인메모리 주문 매칭 엔진을 도입하여 초당 주문 처리량(Throughput)을 극대화할 계획입니다."
  },
  "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": {
    "summary": "알고리즘 문제 해결 상황과 개발자 밈을 인터랙티브 스토리텔링과 연애 시뮬레이션 게임으로 유쾌하게 풀어낸 웹 콘텐츠입니다.",
    "role": "팀원들과 함께 스토리텔링과 복잡한 선택지 분기 구조를 설계하고, 백엔드 세션 API, 진행 상태 저장 로직, 12가지 분기별 멀티 엔딩 계산 엔진을 구현했습니다.",
    "problem": "사용자의 다양한 선택에 따라 수많은 스토리 분기와 캐릭터 호감도 수치가 실시간으로 갱신되는데, 새로고침이나 네트워크 지연 시 세션 상태가 유실되어 엉뚱한 엔딩으로 이어지는 문제가 있었습니다.",
    "troubleshooting": "상태 머신(State Machine) 패턴을 백엔드에 도입하여 각 단계별 선택지와 상태 전이(State Transition) 규칙을 정형화하고, 세션 토큰 기반으로 진행 내역을 안전하게 캐싱·복구하도록 구현했습니다.",
    "result": "12가지 다채로운 멀티 엔딩 분기 계산 엔진과 끊김 없는 인터랙티브 웹 스토리 엔진을 완성하여 완성도 높은 게임 경험을 제공했습니다.",
    "target_audience": "개발자 문화와 알고리즘 개념을 친근하고 유쾌한 스토리텔링 게임을 통해 접하고 싶은 학생 및 개발자",
    "goal": "어렵게 느껴질 수 있는 알고리즘 개념을 대중적이고 몰입감 있는 인터랙티브 시뮬레이션으로 재해석",
    "constraints": "복잡한 조건 분기에서도 상태 꼬임 없이 일관된 엔딩 도출",
    "key_decision": "프론트엔드 상태에만 의존하지 않고 서버 사이드 상태 머신에서 스토리 흐름의 무결성을 검증하는 구조를 선택했습니다.",
    "collaboration": "팀원들과 함께 스토리텔링과 분기 구조를 설계하고 백엔드를 구현했습니다.",
    "architecture": "Next.js 풀스택 아키텍처 기반의 인터랙티브 스토리 엔진 및 세션 스토리지 연동",
    "quality_assurance": "전체 12가지 엔딩 분기 경로 E2E 시나리오 테스트 수행",
    "deployment": "Vercel 플랫폼을 통한 글로벌 엣지 배포",
    "evidence": "GitHub README의 스토리 라인·분기 다이어그램·API 구조와 배서연 명의의 커밋에서 확인할 수 있습니다.",
    "learnings": "복잡한 비즈니스 로직일수록 상태 머신 등 정형화된 디자인 패턴 적용이 유지보수성을 극대화함을 배웠습니다.",
    "next_time": "사용자별 선택 통계 및 엔딩 수집률 인포그래픽 대시보드 추가"
  },
  "EGGO — 농꾸하고 작심삼일 타파하자": {
    "summary": "지속적인 목표 달성 습관 형성을 돕기 위해 귀여운 농장 꾸미기 게이미피케이션과 온디바이스 AI 미션 인증을 결합한 스마트 습관 관리 모바일 앱입니다.",
    "role": "팀원과 함께 기획 및 UI/UX를 정리하고, Flutter/Dart 기반 크로스플랫폼 모바일 앱 개발, Google ML Kit 온디바이스 비전 모델 연동 및 Gemini AI API 검증 파이프라인을 전담했습니다.",
    "problem": "사용자가 올린 습관 인증 사진이 실제 미션 조건(예: 텀블러 사용, 책 읽기 등)에 부합하는지 실시간으로 검증해야 했으나, 모든 사진을 클라우드 LLM API로만 처리하면 비용과 응답 지연이 과도해지는 문제가 있었습니다.",
    "troubleshooting": "Google ML Kit의 On-Device 이미지 라벨링 모델로 모바일 기기 내부에서 1차 객체 인식을 초고속으로 수행하고, 모호하거나 정밀 판별이 필요한 경우에만 2차로 Gemini Vision API를 호출하는 2단계 하이브리드 AI 검증 체계를 구현했습니다.",
    "result": "Flutter 기반 모바일 UI 화면과 잔디 심기 일일 성장 시스템, Google ML Kit 온디바이스 이미지 인증 및 일일 인증 제한 로직을 구현하여 실제 동작하는 완성도 높은 앱을 완성했습니다.",
    "target_audience": "반복되는 작심삼일을 극복하고 재미있게 루틴을 형성하고 싶은 현대인",
    "goal": "AI 기술과 게임 요소를 접목해 지속 가능한 목표 실천 경험 제공",
    "constraints": "모바일 네트워크가 불안정한 환경에서도 지연 없는 빠른 온디바이스 이미지 분류 처리",
    "key_decision": "1차 온디바이스 ML Kit 필터링 후 2차 Gemini API 정밀 검증으로 비용 및 응답 속도 최적화",
    "collaboration": "팀원과 기획·디자인을 함께 정리하고 프론트엔드를 담당했습니다.",
    "architecture": "Flutter/Dart 모바일 앱 + Google ML Kit Vision + Gemini AI REST API 연동",
    "quality_assurance": "다양한 실내/실외 조도 환경에서의 사물 인식률 테스트 및 예외 사진 처리 검증",
    "deployment": "Android Studio 빌드 및 APK 패키징 배포",
    "evidence": "GitHub README의 기획 의도·AI 검열·성장 시스템·폴더 구조와 배서연 명의의 UI·AI·잔디·인증 제한 관련 커밋에서 확인할 수 있습니다.",
    "learnings": "온디바이스 경량 AI 모델과 클라우드 LLM API의 하이브리드 파이프라인 구축 노하우를 습득했습니다.",
    "next_time": "사용자 간 습관 공유 및 그룹 챌린지 랭킹 시스템 고도화"
  },
  "자율 추종 스마트 카트 — Aruco·LiDAR 센서 융합": {
    "summary": "Aruco 비전 마커와 2D LiDAR 센서를 결합해 사용자를 인식하고 안전 거리를 유지하며 스스로 따라가는 지능형 스마트 카트를 ROS2와 Gazebo 가상 환경에서 구현한 1인 로보틱스 프로젝트입니다.",
    "role": "ROS2 가상 주행 환경 구축부터 센서 데이터 필터링, OpenCV Aruco 마커 검출, P-control 로봇 제어, LiDAR 긴급 정지 안전 알고리즘, Gazebo Sim 통신 브릿지 디버깅, 데모 영상 제작까지 전 과정을 1인으로 수행했습니다.",
    "problem": "카메라만 사용하면 대상을 놓치거나 조명 변화 시 돌발 장애물을 감지하기 어려웠고, 최신 Gazebo Sim 환경에서 메시지 규격 차이로 인해 주행 명령(/cmd_vel)이 로봇까지 전달되지 않는 문제가 있었습니다.",
    "troubleshooting": "OpenCV Aruco 4x4_50 마커의 모서리·중심점·면적을 이용해 방향과 거리를 추정하고, 중심 오차와 마커 크기에 P-control을 적용해 선속도·각속도를 계산했습니다. LiDAR는 전방 약 -20°~+20°만 필터링해 0.5m 이하 장애물 감지 시 모든 주행 명령을 0으로 덮어쓰는 긴급 정지 로직을 구현했습니다. Gazebo Sim의 TwistStamped 요구 문제는 ros_gz_bridge로 Twist 규격을 명시적으로 중계하여 해결했습니다.",
    "result": "ROS2와 Gazebo Sim 환경에서 Aruco 마커 인식 P-control 주행과 LiDAR 0.5m 이내 긴급 정지 2중 안전 제어를 검증하고 최종 시연 영상을 제작했습니다.",
    "target_audience": "물류 창고, 쇼핑몰, 공항 등에서 사용자를 안전하게 보조 추종하는 스마트 모빌리티 시스템",
    "goal": "비전 인식과 LiDAR 안전 거리 제어를 융합한 고신뢰성 실시간 자율 추종 카트 시스템 구현",
    "constraints": "센서 딜레이 상황에서도 오작동 없이 즉시 반응하는 안전 브레이크 메커니즘",
    "key_decision": "주행 제어 토픽보다 LiDAR 긴급 정지 토픽의 우선순위를 최상위로 오버라이드하는 안전 설계",
    "collaboration": "1인 풀스택 로보틱스 프로젝트로 ROS2 노드 설계부터 Gazebo 시뮬레이션, 제어 알고리즘 구현 및 데모 영상 제작까지 전담했습니다.",
    "architecture": "Gazebo Sim 카메라·LiDAR(/camera, /scan) → cart_control 노드 구독 → P-control 기반 /cmd_vel Twist 발행 (Python, ROS2, OpenCV Aruco, LiDAR, ros_gz_bridge)",
    "quality_assurance": "마커 미검출, 중앙 이탈, 거리 변화, 목표 거리 도달, 전방 0.5m 이하 장애물 긴급 정지 상황을 Gazebo와 터미널 로그로 반복 검증했습니다.",
    "deployment": "Ubuntu 기반 ROS2·Gazebo Sim 가상 환경에서 실행 검증 완료 및 최종 추종 시연·발표 데모 영상 제작",
    "evidence": "GitHub README의 시스템 구조·센서 융합·트러블슈팅과 최종 시연 영상 https://www.youtube.com/watch?v=A6RttHGQd1o, 발표 영상 https://www.youtube.com/watch?v=4W_OzlCRSqA에서 확인할 수 있습니다.",
    "learnings": "로보틱스 시스템에서 센서 데이터의 노이즈 처리와 하드웨어/통신 계층 간 브릿지 설정의 중요성을 배웠습니다.",
    "next_time": "실제 라즈베리파이 및 모터 드라이버 하드웨어 환경으로의 포팅 및 실물 카트 주행 테스트"
  },
  "Localhost — 멀티플레이어 뮤직 퀴즈 게임": {
    "summary": "여러 사용자가 웹 브라우저를 통해 실시간으로 방에 접속해 음악을 함께 듣고 퀴즈를 맞히는 멀티플레이어 실시간 웹 게임입니다.",
    "role": "팀원과 함께 기획 및 UI/UX를 정리하고, 웹소켓(WebSocket/Socket.io) 기반 실시간 동기화 프론트엔드 UI/UX, 반응형 게임 애니메이션 및 오디오 스트리밍 플레이어를 구현했습니다.",
    "problem": "네트워크 지연으로 인해 사용자 간 음악 재생 타이밍과 정답 제출 순서의 불일치가 발생해 공정한 게임 진행이 어려운 문제가 있었습니다.",
    "troubleshooting": "서버 기준 타임스탬프 동기화 및 지연 보정 알고리즘을 프론트엔드에 구현해 모든 플레이어의 동기화 오차를 최소화했습니다.",
    "result": "WebSocket 기반 실시간 동기화 게임 화면, 애니메이션 효과 및 오디오 재생 흐름을 구현하여 여러 사용자가 동시 접속해 즐길 수 있는 음악 퀴즈 게임을 완성했습니다.",
    "target_audience": "친구들과 온라인으로 가볍고 신나게 음악 퀴즈를 즐기고 싶은 사용자",
    "goal": "저지연 오디오 스트리밍과 정확한 동기화 기반의 실시간 퀴즈 게임 구현",
    "constraints": "다양한 네트워크 환경의 클라이언트 간 완벽한 재생 싱크 유지",
    "key_decision": "클라이언트 자체 타이머 대신 서버 틱(Server Tick) 기반 타임스탬프 브로드캐스팅 구조 채택",
    "collaboration": "팀원과 기획·디자인을 함께 정리하고 프론트엔드를 담당했습니다.",
    "architecture": "Next.js·React·TypeScript 기반 프론트엔드 + Express·Socket.io 실시간 서버 + PostgreSQL/Redis + Docker Compose",
    "quality_assurance": "방 생성·참가·퇴장, 게임 시작, 곡 동기화, 정답 처리, 채팅, 로그인 흐름 기능별 검증",
    "deployment": "Docker Compose 기반 PostgreSQL, Redis, 백엔드, 프론트엔드 통합 컨테이너 배포",
    "evidence": "GitHub README의 기능·기술 스택·구조·실행 방법과 배서연 명의의 animation·socket·domain·game screen 관련 커밋에서 확인할 수 있습니다.",
    "learnings": "실시간 멀티플레이어 환경에서 웹소켓 이벤트 라이프사이클 관리와 상태 동기화 기법을 깊이 학습했습니다.",
    "next_time": "웹RTC(WebRTC) 기반 음성 채팅 기능 추가 및 3D 그래픽 최적화"
  },
  "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": {
    "summary": "복잡하고 방대한 공공 복지 정책 및 기술 정보를 누구나 이해하기 쉬운 비주얼 카드와 요약 콘텐츠로 변환해주는 정보 접근성 향상 플랫폼입니다. 3일 해커톤에서 개발되었습니다.",
    "role": "3일 해커톤에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업하여 Java 17·Spring Boot 기반 REST API 백엔드 설계, 회원가입 및 JWT 인증, 복지 정보 CRUD·필터링·북마크, Apache POI Excel 뉴스 일괄 등록 및 AI 요약 API 구현, Docker/AWS EC2 배포 파이프라인 구축을 전담했습니다.",
    "problem": "72시간이라는 극도로 짧은 해커톤 시간 안에 복잡한 복지 데이터 모델을 설계하고, 대량의 엑셀 뉴스 데이터를 파싱해 요약 카드로 변환하는 백엔드 API와 클라우드 실서버 배포까지 완수해야 했습니다.",
    "troubleshooting": "Spring Boot 도메인 기반 모듈화 설계를 통해 인증, 복지, 뉴스 도메인을 신속하게 분리하고, Apache POI를 이용한 엑셀 일괄 파싱과 OpenAI API 연동 비동기 파이프라인을 구축했습니다. 또한 Docker와 GitHub Actions를 결합한 CI/CD를 구성해 해커톤 기간 중에도 프론트엔드 팀원이 즉시 연동 가능한 라이브 HTTPS API 환경을 제공했습니다.",
    "result": "72시간 해커톤 동안 회원가입·JWT 토큰 인증, 맞춤형 복지 조건 필터링 검색, 북마크 관리, Excel 뉴스 등록 및 AI 요약 백엔드 API를 완벽히 구현하여 실제 서비스 가능한 MVP를 성공적으로 완성했습니다.",
    "target_audience": "어렵고 복잡한 정부 복지 정책이나 전문 기술 정보를 쉽고 빠르게 찾아보고 요약 카드로 확인하고 싶은 일반 대중",
    "goal": "누구나 손쉽게 정보에 접근할 수 있는 직관적인 비주얼 카드 뷰어 및 API 플랫폼 제작",
    "constraints": "72시간 제한된 일정 속에서 백엔드 API와 프론트엔드 완벽 연동 및 라이브 배포 달성",
    "key_decision": "복잡한 로직 대신 Spring Boot 모듈화와 Docker/EC2 빠른 CI/CD 구조로 배포 성공률 극대화",
    "collaboration": "3일 해커톤에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업했습니다.",
    "architecture": "Java 17·Spring Boot 3·Spring Security 기반 REST API + MySQL + Redis + Docker + AWS EC2/ECR 배포",
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
    console.log("Updated full case study for:", row.title);
  }
}

await client.end();
console.log("All 8 projects successfully updated in database with full original content!");
