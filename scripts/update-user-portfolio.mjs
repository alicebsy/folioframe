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

const bio = "**Java와 Spring Boot를 중심**으로 데이터와 API 흐름을 설계하고 구현하는 **백엔드 개발자**입니다.";

const aboutMe = `새로운 기능을 만들 때 처음부터 모든 답을 알고 시작하지는 않습니다. **필요한 내용을 빠르게 쪼개서 찾아보고, 작은 코드로 먼저 확인**하면서 제 프로젝트에 맞는 답을 찾아가는 편입니다. 무엇을 만들지 정해지면 **사용자의 입력이 API와 데이터 구조를 거쳐 어떤 결과로 이어지는지** 생각하며 하나씩 구현합니다.

프로젝트에서는 주로 **백엔드를 맡아 Java와 Spring Boot를 공부**해 왔고, **API·데이터베이스·인증·배포까지 직접 다뤄 보았습니다.** 아직 배워가는 단계이지만 **기능이 돌아가는 이유를 깊이 이해**하려고 하고, 프론트엔드와 기획·디자인이 맞물려야 서비스가 완성된다는 것도 여러 프로젝트를 통해 배웠습니다.

낯선 언어나 기술을 만났을 때도 배우는 데 오래 망설이지 않습니다. **AI에게 구현 방향과 예시를 구체적으로 질문하고, 제 코드에 맞는 부분을 골라 주도적으로 적용**합니다. 실행해 보며 막히는 부분을 다시 질문하고 고치는 과정을 반복하면서 새로운 기술을 체득해 왔습니다.

협업할 때는 의견을 자유롭게 내는 만큼 **다른 사람의 의견을 경청하고 조율하는 것**을 중요하게 생각합니다. **초3부터 고2까지의 연속 임원(매년 반장, 중3 전교부회장, 고2 학과 과장)과 동아리 회장 경험**을 바탕으로, 일정이나 역할에 문제가 생기면 **감정과 사실을 분리해 따뜻하지만 명확하게 소통**하며 함께 해결할 방법을 찾습니다.`;

const workStyle = `일을 시작할 때는 먼저 **무엇을 만들어야 하는지와 우선순위를 명확히 정리**합니다. 요구사항을 작은 단위로 나누고, **API와 데이터 흐름을 충분히 이해한 뒤 단계별로 구현**합니다. 모르는 내용은 질문을 잘게 나누어 필요한 답부터 찾아보고, 혼자 판단하기 어려운 부분은 **팀원과 적극적으로 소통하며 싱크를 맞춥니다.**

처음 접하는 기술은 **AI를 활용해 사용법과 구현 방향을 빠르게 파악**합니다. 한 번에 완성된 답을 얻으려 하기보다 **현재 막힌 부분을 구체적으로 질문하고, 예시를 프로젝트에 맞게 변환해 직접 실행**해 봅니다. 맞지 않는 부분은 디버깅하며 내재화하고, **정상 흐름뿐만 아니라 빈 입력값이나 예외 상황에서의 동작까지 꼼꼼히 검증**합니다.

협업할 때는 **각자의 진행 상황을 투명하게 공유**하고, 병목이나 이슈가 생기면 **감정에 치우치지 않고 사실을 중심으로 빠르게 공유**해 함께 최선의 대안을 모색합니다.`;

const personalValues = `일이든 말이든, **진심이 있어야 끝까지 책임질 수 있다**고 생각합니다. 진심은 **잘 모르는 것을 솔직하게 인정하고 배우려는 태도**, **잘되지 않았을 때 포기하지 않고 다시 시도하는 끈기**, 그리고 **함께하는 동료를 배려하는 태도**에서 드러난다고 믿습니다.

기술적으로는 **제가 정확히 이해한 만큼 구현**하고, 부족한 부분은 끝까지 파고들어 질문하며 채워가려고 합니다. 의견이 다를 때도 **더 나은 제품과 성장을 위한 건강한 피드백**으로 받아들입니다.

AI 도구가 고도화될수록 **결국 사람과 사람 사이의 신뢰와 진정성 있는 소통이 가장 강력한 경쟁력**이라고 믿습니다. 팀에 긍정적인 에너지를 전하고, **동료들이 다시 함께 일하고 싶어 하는 든든한 동료**가 되는 것이 제 핵심 가치입니다.`;

const lookingFor = `**Java와 Spring Boot를 중심으로 백엔드 기본기를 더 탄탄하게** 쌓고 싶습니다. **대용량 트래픽을 고려한 API와 데이터베이스 설계**, **안정적인 예외 처리와 트랜잭션 관리, CI/CD 배포 파이프라인**을 실전 서비스를 통해 깊이 있게 확장해 나가겠습니다.

새로운 기술이나 언어를 배울 때는 **AI를 적극 활용해 학습 속도를 극대화**하고, 직접 코드를 작성하고 검증하며 단단한 제 것으로 체화하겠습니다. 백엔드 개발을 중심으로 성장하면서도 **사용자가 실제로 마주하는 흐름과 서비스 전체의 완성도를 함께 고민하는 개발자**로 성장하고자 합니다.`;

const aspiration = `**끝까지 배우고 확인해, 믿을 수 있는 결과를 만드는 사람**

모르는 문제를 만나도 피하지 않고 **하나씩 원인을 짚어가며 배우겠습니다.** 빠르게 시작할 때는 AI의 도움을 받되, **원리를 온전히 이해한 뒤 제 방식으로 적용하고 결과를 직접 검증**하겠습니다.

혼자만 잘하는 사람보다 **함께 일하는 기준을 맞추고, 어려운 순간에도 다시 해보자고 힘을 실어줄 수 있는 동료**가 되고 싶습니다. 작은 역할이라도 **진심과 책임감**을 다해, 함께한 사람들이 **꼭 다시 같이 일하고 싶은 개발자**로 기억되는 결과를 만들어가겠습니다.`;

const aspirationTitle = "같이 일하고 싶은 개발자가 되고 싶습니다.";

const careers = [
  {
    id: "career-1786454986911",
    role: "참가자 · 프로젝트 개발",
    period: "2026.01 – 2026.02",
    description: "짧은 주기 안에 아이디어를 정리하고 **매주 하나의 완성도 높은 산출물을 개발**했습니다. Ticker, Localhost, EGGO, Love Algorithm을 차례로 만들며 **새로운 기술을 기민하게 습득하고, 구현·테스트·회고로 이어지는 전 사이클을 반복**했습니다. 정해진 시간 제약 속에서도 **실제 동작하는 결과물을 끝까지 완성해내는 강한 실행력과 회복탄력성**을 길렀습니다.",
    organization: "KAIST 몰입캠프"
  },
  {
    id: "career-1786505229375",
    role: "기획부원 · 기획부장 · 회장",
    period: "2023.03 – 2025.02",
    description: "초등학교 3학년부터 고등학교 2학년까지 매년 **학급 반장**, 중3 **전교부회장**, 고2 **중국어과 과장**을 역임하며 다져온 조직 운영 노하우를 바탕으로 자율 동아리 '데포르테'를 기획·창설했습니다. 50명 규모의 연합동아리에서 **기획부원부터 회장까지** 활동하며 소외되는 사람 없이 모두가 주도적으로 참여하는 문화를 이끌었습니다. 부원 개개인의 의견을 세심하게 조율하고 **감정과 사실을 분리해 따뜻하지만 명확하게 소통**하여, 높은 만족도와 끈끈한 팀 협업 문화를 구축했습니다.",
    organization: "데포르테 · 신촌×안암 연합동아리"
  },
  {
    id: "career-1786505237436",
    role: "스터디 · 아이디어톤·프로젝트 협업",
    period: "2024.03 – 2024.08",
    description: "매주 **Node.js 서버 스터디에 참여하며 백엔드 기초 역량**을 다졌습니다. 6월 아이디어톤에서는 **팀 기획에 주도적으로 참여해 우수상을 수상**했으며, 7~8월 실전 프로젝트에서는 **PM·프론트엔드 개발자와 API 규격을 정의하고 연동하는 협업**을 완수했습니다. 진행 상황과 변경 사항을 투명하게 맞추며 **팀 단위로 서비스를 완성해가는 협업 메커니즘**을 체득했습니다.",
    organization: "UMC"
  }
];

const educations = [
  {
    id: "education-1786454992523",
    major: "중어중문학 주전공 · 컴퓨터공학 복수전공",
    period: "2022.03 – 2026.08 (졸업예정)",
    school: "이화여자대학교",
    description: "**컴퓨터공학과 중어중문학을 복수전공**하며 논리적 사고와 다각적인 커뮤니케이션 역량을 함께 길렀습니다. **자료구조, 알고리즘, 데이터베이스, 운영체제** 등 컴퓨터공학 핵심 전공을 이수하고, **다양한 팀 프로젝트와 스터디를 통해 실전 개발 기본기**를 탄탄히 다졌습니다."
  },
  {
    id: "education-1786505244521",
    major: "Java 기반 풀스택 과정",
    period: "2024.07 – 2025.01",
    school: "중앙HTA",
    description: "**Java와 Spring Boot를 기반으로 기획, UI 설계, ERD 데이터 모델링, API 명세서 작성, GitHub 협업까지 웹 서비스 개발 전 과정**을 체계적으로 수료했습니다. 그룹웨어 프로젝트에서 **요구사항을 구조화하고 개발 아키텍처를 주도적으로 정리**하며, 프레임워크의 동작 원리를 올바르게 이해하고 구현하는 기반을 마련했습니다."
  },
  {
    id: "education-1786710920154",
    major: "이화여자대학교 창업지원단",
    period: "현재 수료 과정",
    school: "AI 바이브 코딩 창업 부트캠프",
    description: "**AI를 전략적 도구로 활용해 아이디어를 빠르게 검증하고 실제 웹 서비스로 구현하는 과정**을 수료 중입니다. AI가 제안한 코드를 무비판적으로 수용하지 않고, **아키텍처와 요구사항을 먼저 설계한 뒤 동작·보안·데이터 흐름을 직접 검증하고 리팩토링**합니다. 이 과정에서 **Folioframe 서비스를 기획·배포하고 실제 사용자 포트폴리오 발행 흐름까지 성공적으로 구축**했습니다."
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

console.log("Successfully updated portfolio table for 배서연!");

const projectUpdates = {
  "Folioframe — 직군 맞춤형 웹 포트폴리오 서비스": {
    summary: "개발자가 **기술 선택과 문제 해결 과정을 구조적으로 기록하고 하나의 링크로 발행**할 수 있는 웹 서비스를 개발했습니다.",
    role: "**정보 구조 설계, Next.js 화면 구현, PostgreSQL 데이터 모델링, 인증과 Vercel 배포**를 담당했습니다.",
    problem: "개발 프로젝트 설명이 기술 목록과 결과 화면에 치우쳐 **면접관이 구현 판단과 실제 기여를 파악하기 어려운 문제**가 있었습니다.",
    troubleshooting: "입력 상태를 **프로필·프로젝트 단위로 분리**하고, **서버 검증과 미리보기 데이터를 공통 계약 타입으로 연결**했습니다.",
    result: "**프로필 작성부터 프로젝트 편집, 테마 선택, 공개 발행까지 단일 데이터 흐름으로 연결**하여 실제 서비스로 배포·운영 중입니다.",
    target_audience: "**기술 선택과 문제 해결 과정을 정리해 취업 포트폴리오로 발행**하려는 개발자",
    goal: "개발자의 **기여 범위와 구현 판단을 면접관이 빠르게 이해**할 수 있는 작성·발행 경험 구축",
    constraints: "**로그인 사용자 데이터와 공개 페이지를 철저히 분리**하면서도 미리보기와 실제 발행 화면이 동일해야 했습니다.",
    key_decision: "**Next.js App Router와 Server Actions/API Route 분리 설계**를 채택해 렌더링 성능과 데이터 정합성을 동시에 확보했습니다.",
    collaboration: "**1인 풀스택 개발 프로젝트**로 기획부터 배포, 사용자 피드백 수렴 및 지속적 기능 개선을 전담했습니다.",
    architecture: "**Next.js App Router, TypeScript, PostgreSQL(Neon), CSS Modules** 기반의 확장성 있는 풀스택 아키텍처",
    quality_assurance: "**Playwright E2E 테스트와 TypeScript 엄격 모드**를 적용해 런타임 오류 방지 및 배포 안정성 확보",
    deployment: "**Vercel CI/CD 자동화와 Neon Serverless Postgres**를 연동해 빠른 배포 및 무중단 운영",
    evidence: "GitHub README와 Vercel 실제 배포 환경(folioframe-lake.vercel.app)에서 확인할 수 있습니다.",
    learnings: "데이터 구조 설계 시 **미리보기와 실제 공개 뷰의 타입 일관성이 개발 생산성에 미치는 영향**을 체감했습니다.",
    next_time: "향후 **방문자 통계 분석 대시보드와 커스텀 도메인 연결 기능**을 추가로 고도화할 계획입니다.",
  },
  "CapLog": {
    summary: "스크린샷 속 텍스트와 이미지를 **On-Device OCR 및 Vision AI로 분석해 자동으로 카테고리화하고 관리**하는 지능형 스크린샷 큐레이션 서비스입니다.",
    role: "iOS 앱에서 Photos·PhotoKit의 스크린샷을 읽고 **Apple Vision OCR·이미지 분류로 분석하는 흐름과 Spring Boot API 연동**을 담당했습니다. **개인정보 패턴 마스킹, AI 카드 생성, 폴더·검색·위치 기반 추천·알림, 친구·채팅·카드 공유, JWT 인증과 사용자별 데이터 격리**를 구현했습니다. 이후에는 **SwiftUI 화면 구조와 UI/UX를 재설계**하고 Mock 기능을 실제 서버 데이터 흐름으로 전환했으며, **로컬 이미지 보호 저장과 AI 실패 시 대체 카드 처리**까지 보완했습니다.",
    problem: "스크린샷이 사진첩에 무분별하게 쌓여 **필요한 정보를 제때 찾지 못하고 개인정보 노출 위험**이 존재하는 문제를 해결하고자 했습니다.",
    troubleshooting: "**Apple Vision 프레임워크를 활용한 온디바이스 1차 전처리**와 **Spring Boot 비동기 AI 분석 파이프라인**을 구축해 처리 속도를 대폭 단축했습니다.",
    result: "**Apple Vision 기반 온디바이스 스크린샷 텍스트 인식과 Spring Boot API 연동을 완성**하고, 개인정보 보호 마스킹과 카드 큐레이션 기능을 구현했습니다.",
    target_audience: "**스크린샷으로 정보(링크, 계좌, 약속 등)를 자주 캡처하지만 정리가 어려운 스마트폰 사용자**",
    goal: "캡처 즉시 **내용을 자동 인식해 필요할 때 바로 찾아주는 스마트 캡처 비서** 구현",
    constraints: "**대용량 이미지 처리 시 모바일 메모리 부하 방지** 및 **민감 개인정보의 외부 서버 전송 차단(온디바이스 마스킹)**",
    key_decision: "**온디바이스 Vision OCR과 서버 경량화 모델의 하이브리드 파이프라인**을 채택해 반응성과 보안을 모두 확보했습니다.",
    collaboration: "**2024년 9월부터 2025년 8월까지 2인 팀으로 졸업 프로젝트**를 진행했고, 이후에는 **혼자 개발을 이어가며 현재까지 고도화**하고 있습니다.",
    architecture: "**iOS (SwiftUI, PhotoKit, Vision Framework) + Spring Boot (Java, JPA, PostgreSQL, JWT)**",
    quality_assurance: "**다양한 해상도 및 저화질 스크린샷 대상 OCR 인식률 테스트**와 **메모리 릭 프로파일링(Xcode Instruments)** 진행",
    deployment: "**AWS EC2 기반 백엔드 컨테이너화 배포** 및 **TestFlight를 통한 모바일 베타 테스트**",
    evidence: "GitHub 리포지토리의 iOS/Spring Boot 코드와 API 명세서, 시연 데모에서 확인할 수 있습니다.",
    learnings: "클라이언트 온디바이스 연산과 백엔드 비동기 처리 간의 **역할 분담이 모바일 사용자 경험에 미치는 절대적 영향**을 배웠습니다.",
    next_time: "CoreLocation 기반 **지오펜싱(Geo-fencing) 알고리즘을 정교화**하여 특정 장소 방문 시 관련 캡처를 추천하는 기능 고도화 예정",
  },
  "Ticker — Human Stock Market": {
    summary: "개인의 가치와 성과를 **주식 시장 메커니즘으로 시각화하고 상호 투자·응원하는 소셜 파이낸스 플랫폼**입니다.",
    role: "팀원들과 함께 개발한 협업 프로젝트에서 **백엔드 아키텍처 설계, 실시간 주가 변동 알고리즘, 트랜잭션 무결성 보장 및 RESTful API 구현**을 담당했습니다.",
    problem: "동시 다발적인 가상 주식 거래 요청 시 **동시성 이슈(Race Condition)와 데이터 불일치 위험**이 발생했습니다.",
    troubleshooting: "**데이터베이스 비관적 락(Pessimistic Lock)과 트랜잭션 격리 수준**을 최적화하여 동시 주문 시에도 잔고와 체결가를 완벽히 일치시켰습니다.",
    result: "**가상 주식 매수·매도 거래 체결, 포트폴리오 평가액 산출, 실시간 호가 반영 API를 완성**하여 협업 프로젝트를 성공적으로 완수했습니다.",
    target_audience: "**자기계발 성과를 정량화하고 동료들과 게이미피케이션으로 동기부여**를 얻고 싶은 사용자",
    goal: "현실 주식 시장의 메커니즘을 적용한 **직관적이고 신뢰할 수 있는 소셜 가치 거래 시스템** 구축",
    constraints: "**주문 체결 중복 방지 및 트랜잭션 원자성(ACID) 보장**",
    key_decision: "**트랜잭션 격리 수준 강화 및 이벤트 기반 로깅 설계**로 금융 도메인의 안정성 확보",
    collaboration: "팀원들과 함께 개발한 협업 프로젝트에서 **백엔드를 담당**했습니다.",
    architecture: "Node.js·Express 백엔드 API와 PostgreSQL 데이터베이스, React 기반 프론트엔드 연동 아키텍처",
    quality_assurance: "동시 매수 요청 시나리오 단위 테스트 및 잔고 정합성 무결성 검증",
    deployment: "Vercel 및 클라우드 인프라를 통한 웹 서비스 배포",
    evidence: "GitHub README의 기능·기술 스택·구조·실행 방법과 배서연 명의의 backend·api 관련 커밋에서 확인할 수 있습니다.",
    learnings: "금융/거래 도메인에서 **동시성 제어와 트랜잭션 격리 수준 설계의 중요성**을 깊이 체득했습니다.",
    next_time: "Redis 기반 인메모리 주문 큐를 도입하여 초당 주문 처리량(Throughput) 극대화 계획",
  },
  "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": {
    summary: "알고리즘 문제 해결 상황을 **인터랙티브 스토리텔링과 연애 시뮬레이션 게임으로 풀어낸 웹 콘텐츠**입니다.",
    role: "팀원들과 함께 **스토리텔링과 분기 구조를 설계**하고 **백엔드 API 및 상태 저장 로직, 분기별 엔딩 계산 엔진**을 구현했습니다.",
    problem: "사용자의 선택지에 따라 수많은 분기가 생성될 때 **세션 상태 유실 없이 매끄럽게 다음 시나리오를 렌더링**해야 했습니다.",
    troubleshooting: "**상태 머신(State Machine) 패턴을 백엔드에 적용**하여 분기 전환 비용을 최소화하고 상태 복구 안정성을 높였습니다.",
    result: "**사용자 선택에 따른 12가지 분기별 엔딩 계산 엔진과 세션 유지 API를 구현**하여 웹 인터랙티브 게임을 완성했습니다.",
    target_audience: "**개발자 밈과 스토리텔링을 통해 재미있게 알고리즘 개념을 접하고 싶은 학습자**",
    goal: "난해한 알고리즘 개념을 **흥미진진한 인터랙티브 스토리**로 재해석",
    constraints: "복잡한 조건 분기에서도 상태 꼬임 없이 일관된 엔딩 도출",
    key_decision: "프론트엔드 종속적인 상태 관리를 탈피하고 **서버 상태 머신 구조로 분기 로직 집중화**",
    collaboration: "팀원들과 함께 **스토리텔링과 분기 구조를 설계**하고 **백엔드를 구현**했습니다.",
    architecture: "Next.js 풀스택 아키텍처 기반의 인터랙티브 스토리 엔진 및 세션 스토리지 연동",
    quality_assurance: "전체 12가지 엔딩 분기 경로 E2E 시나리오 테스트 수행",
    deployment: "Vercel 플랫폼을 통한 글로벌 엣지 배포",
    evidence: "GitHub README의 스토리 라인·분기 다이어그램·API 구조와 배서연 명의의 커밋에서 확인할 수 있습니다.",
    learnings: "복잡한 비즈니스 로직일수록 **상태 머신 등 정형화된 디자인 패턴 적용이 유지보수성을 극대화**함을 배웠습니다.",
    next_time: "사용자별 선택 통계 및 엔딩 수집률 인포그래픽 대시보드 추가",
  },
  "EGGO — 농꾸하고 작심삼일 타파하자": {
    summary: "목표 달성 습관 형성을 위해 **농장 꾸미기 게이미피케이션과 AI 미션 인증을 결합한 습관 관리 앱**입니다.",
    role: "팀원과 **기획·디자인을 함께 정리**하고 **Flutter/Dart 기반 크로스플랫폼 프론트엔드 개발, Google ML Kit 및 Gemini AI 연동**을 담당했습니다.",
    problem: "사용자가 습관 인증 사진을 올릴 때 **허위 인증을 방지하고 즉각적인 피드백을 제공**해야 했습니다.",
    troubleshooting: "**Google ML Kit 온디바이스 이미지 분류와 Gemini 비전 API**를 이중 결합하여 실시간으로 인증 사진의 유효성을 자동 검증했습니다.",
    result: "**Flutter 기반 UI 화면과 잔디 심기 성장 시스템, Google ML Kit 이미지 인증 및 인증 제한 로직을 구현**하여 실제 동작하는 습관 관리 앱을 완성했습니다.",
    target_audience: "**반복되는 작심삼일을 극복하고 재미있게 루틴을 형성**하고 싶은 현대인",
    goal: "AI 기술과 게임 요소를 접목해 **지속 가능한 목표 실천 경험** 제공",
    constraints: "모바일 네트워크 환경에서도 지연 없는 빠른 온디바이스 이미지 분류 처리",
    key_decision: "1차 온디바이스 ML Kit 필터링 후 2차 Gemini API 정밀 검증으로 **비용 및 응답 속도 최적화**",
    collaboration: "팀원과 **기획·디자인을 함께 정리**하고 **프론트엔드를 담당**했습니다.",
    architecture: "Flutter/Dart 모바일 앱 + Google ML Kit Vision + Gemini AI REST API 연동",
    quality_assurance: "다양한 실내/실외 조도 환경에서의 사물 인식률 테스트 및 예외 사진 처리 검증",
    deployment: "Android Studio 빌드 및 APK 패키징 배포",
    evidence: "GitHub README의 기획 의도·AI 검열·성장 시스템·폴더 구조와 배서연 명의의 UI·AI·잔디·인증 제한 관련 커밋에서 확인할 수 있습니다.",
    learnings: "온디바이스 경량 AI 모델과 클라우드 LLM API의 **하이브리드 파이프라인 구축 노하우**를 습득했습니다.",
    next_time: "사용자 간 습관 공유 및 그룹 챌린지 랭킹 시스템 고도화",
  },
  "자율 추종 스마트 카트 — Aruco·LiDAR 센서 융합": {
    summary: "**Aruco 마커와 LiDAR 센서를 결합해 사용자를 인식하고 안전 거리를 유지하며 따라가는 스마트 카트**를 ROS2·Gazebo 가상 환경에서 구현한 1인 프로젝트입니다.",
    role: "**ROS2 가상 주행 환경 구축부터 센서 데이터 필터링, Aruco 인식, P-control 로봇 제어, LiDAR 긴급 정지, 시뮬레이션 디버깅과 데모 영상 제작까지 전 과정을 1인으로 수행**했습니다. 단순히 알고리즘만 작성한 것이 아니라 **센서·판단·제어 노드가 실제로 이어지는 실행 환경을 구축**하고 통신 문제를 완벽히 해결했습니다.",
    problem: "카메라만 사용하면 **대상을 놓치거나 돌발 장애물을 즉시 감지하기 어려웠고**, 최신 Gazebo Sim에서는 기존 Gazebo Classic과 모델 스폰·메시지 규격이 달라 **주행 명령이 로봇까지 전달되지 않는 문제**가 있었습니다.",
    troubleshooting: "OpenCV Aruco 4x4_50 마커의 모서리·중심점·면적을 이용해 **방향과 거리를 추정하고, 중심 오차와 마커 크기에 P-control을 적용해 선속도·각속도를 계산**했습니다. LiDAR는 전방 약 -20°~+20°만 필터링해 **0.5m 이하 장애물 감지 시 모든 주행 명령을 0으로 덮어쓰는 긴급 정지 로직**을 구현했습니다. Gazebo Sim의 TwistStamped 요구 문제는 **ros_gz_bridge로 Twist 규격을 명시적으로 중계**하여 해결했습니다.",
    result: "**ROS2와 Gazebo Sim 환경에서 Aruco 마커 인식 P-control 주행과 LiDAR 0.5m 이내 긴급 정지 2중 안전 제어를 검증**하고 최종 시연 영상을 제작했습니다.",
    target_audience: "**물류 창고, 쇼핑몰, 공항 등에서 사용자를 안전하게 보조 추종하는 스마트 모빌리티 시스템**",
    goal: "비전 인식과 LiDAR 안전 거리 제어를 융합한 **고신뢰성 실시간 자율 추종 카트 시스템** 구현",
    constraints: "센서 딜레이 상황에서도 오작동 없이 즉시 반응하는 안전 브레이크 메커니즘",
    key_decision: "주행 제어 토픽보다 **LiDAR 긴급 정지 토픽의 우선순위를 최상위로 오버라이드**하는 안전 설계",
    collaboration: "**1인 풀스택 로보틱스 프로젝트**로 ROS2 노드 설계부터 Gazebo 시뮬레이션, 제어 알고리즘 구현 및 데모 영상 제작까지 전담했습니다.",
    architecture: "**Gazebo Sim 카메라·LiDAR(/camera, /scan) → cart_control 노드 구독 → P-control 기반 /cmd_vel Twist 발행 (Python, ROS2, OpenCV Aruco, LiDAR, ros_gz_bridge)**",
    quality_assurance: "**마커 미검출, 중앙 이탈, 거리 변화, 목표 거리 도달, 전방 0.5m 이하 장애물 긴급 정지** 상황을 Gazebo와 터미널 로그로 반복 검증했습니다.",
    deployment: "**Ubuntu 기반 ROS2·Gazebo Sim 가상 환경에서 실행 검증 완료** 및 최종 추종 시연·발표 데모 영상 제작",
    evidence: "GitHub README의 시스템 구조·센서 융합·트러블슈팅과 최종 시연 영상 https://www.youtube.com/watch?v=A6RttHGQd1o, 발표 영상 https://www.youtube.com/watch?v=4W_OzlCRSqA에서 확인할 수 있습니다.",
    learnings: "로보틱스 시스템에서 센서 데이터의 노이즈 처리와 **하드웨어/통신 계층 간 브릿지 설정의 중요성**을 배웠습니다.",
    next_time: "실제 라즈베리파이 및 모터 드라이버 하드웨어 환경으로의 포팅 및 실물 카트 주행 테스트",
  },
  "Localhost — 멀티플레이어 뮤직 퀴즈 게임": {
    summary: "여러 사용자가 실시간으로 접속해 **음악을 듣고 퀴즈를 맞히는 멀티플레이어 실시간 웹 게임**입니다.",
    role: "팀원과 **기획·디자인을 함께 정리**하고 **웹소켓(WebSocket) 기반 실시간 동기화 프론트엔드 UI/UX 및 오디오 스트리밍 플레이어**를 구현했습니다.",
    problem: "네트워크 지연으로 인해 사용자 간 **음악 재생 타이밍과 정답 제출 순서의 불일치**가 발생했습니다.",
    troubleshooting: "**서버 기준 타임스탬프 동기화 및 지연 보정 알고리즘**을 프론트엔드에 구현해 모든 플레이어의 동기화 오차를 최소화했습니다.",
    result: "**WebSocket 기반 실시간 동기화 게임 화면, 애니메이션 효과 및 오디오 재생 흐름을 구현**하여 여러 사용자가 동시 접속해 즐길 수 있는 음악 퀴즈 게임을 완성했습니다.",
    target_audience: "**친구들과 온라인으로 가볍고 신나게 음악 퀴즈를 즐기고 싶은 사용자**",
    goal: "저지연 오디오 스트리밍과 **정확한 동기화 기반의 실시간 퀴즈 게임** 구현",
    constraints: "다양한 네트워크 환경의 클라이언트 간 완벽한 재생 싱크 유지",
    key_decision: "클라이언트 자체 타이머 대신 **서버 틱(Server Tick) 기반 타임스탬프 브로드캐스팅 구조** 채택",
    collaboration: "팀원과 **기획·디자인을 함께 정리**하고 **프론트엔드를 담당**했습니다.",
    architecture: "Next.js·React·TypeScript 기반 프론트엔드 + Express·Socket.io 실시간 서버 + PostgreSQL/Redis + Docker Compose",
    quality_assurance: "방 생성·참가·퇴장, 게임 시작, 곡 동기화, 정답 처리, 채팅, 로그인 흐름 기능별 검증",
    deployment: "Docker Compose 기반 PostgreSQL, Redis, 백엔드, 프론트엔드 통합 컨테이너 배포",
    evidence: "GitHub README의 기능·기술 스택·구조·실행 방법과 배서연 명의의 animation·socket·domain·game screen 관련 커밋에서 확인할 수 있습니다.",
    learnings: "실시간 멀티플레이어 환경에서 **웹소켓 이벤트 라이프사이클 관리와 상태 동기화 기법**을 깊이 학습했습니다.",
    next_time: "웹RTC(WebRTC) 기반 음성 채팅 기능 추가 및 3D 그래픽 최적화",
  },
  "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": {
    summary: "복잡한 공공·기술 정보를 **누구나 이해하기 쉬운 비주얼 카드와 요약 콘텐츠로 변환해주는 정보 접근성 플랫폼**입니다.",
    role: "**3일 해커톤**에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업하여 **핵심 콘텐츠 뷰어 및 백엔드 API 구현**을 전담했습니다.",
    problem: "짧은 해커톤 시간(72시간) 안에 **복잡한 정보 구조를 단순화하고 백엔드 API와 클라우드 배포**를 완성해야 했습니다.",
    troubleshooting: "**Spring Boot 기반 도메인 분리 설계와 Docker·GitHub Actions 자동 배포 파이프라인**을 구축해 개발 속도와 배포 안정성을 확보했습니다.",
    result: "3일 해커톤 동안 **회원가입·JWT 인증, 복지 정보 CRUD·필터링·북마크, Excel 뉴스 등록 및 요약 백엔드 API를 구현**하여 MVP 서비스를 완성했습니다.",
    target_audience: "**어려운 전문 정보를 쉽고 빠르게 습득하고 싶은 일반 대중**",
    goal: "누구나 손쉽게 정보에 접근할 수 있는 **직관적인 비주얼 카드 뷰어 및 API 플랫폼** 제작",
    constraints: "72시간 제한된 일정 속에서 백엔드 API와 프론트엔드 완벽 연동 및 라이브 배포 달성",
    key_decision: "복잡한 로직 대신 **Spring Boot 모듈화와 Docker/EC2 빠른 CI/CD 구조**로 배포 성공률 극대화",
    collaboration: "**3일 해커톤**에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업했습니다.",
    architecture: "Java 17·Spring Boot 3·Spring Security 기반 REST API + MySQL + Redis + Docker + AWS EC2/ECR 배포",
    quality_assurance: "회원가입/로그인 Bearer 토큰 인증, 복지 조건 필터링, 북마크 CRUD, Excel 파싱 API 검증",
    deployment: "GitHub Actions CI/CD → AWS ECR 이미지 빌드 및 EC2 컨테이너 자동 배포 (HTTPS 적용)",
    evidence: "GitHub README의 기획 배경·기능·API·ERD·배포 문서와 백엔드 구현 커밋에서 확인할 수 있습니다.",
    learnings: "단기 해커톤 환경에서 **명확한 API 계약과 빠른 CI/CD 자동화가 협업 효율에 미치는 결정적 영향**을 배웠습니다.",
    next_time: "Elasticsearch 기반 전문 검색 엔진 연동 및 사용자 맞춤형 공공 정책 추천 알고리즘 구현",
  }
};

const projects = await client.query("SELECT id, title FROM projects WHERE portfolio_id = $1", [portfolioId]);
console.log(`Updating ${projects.rows.length} projects in DB with rich, detailed content...`);

for (const row of projects.rows) {
  const patch = projectUpdates[row.title];
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
    console.log("Restored rich content for:", row.title);
  }
}

await client.end();
console.log("All rich portfolio and project content restored successfully!");
