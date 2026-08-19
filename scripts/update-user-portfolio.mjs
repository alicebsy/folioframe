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
  "CapLog": {
    summary: `스마트폰 사진 보관함의 스크린샷을 기기 내부에서 분석하여 제목, 요약, 카테고리, 태그, 장소, 날짜 등이 정리된 **검색 가능한 생활 정보 카드로 자동 변환**해주는 지능형 iOS 스크린샷 큐레이션 서비스입니다. 2025년 이화여자대학교 컴퓨터공학 졸업프로젝트로 시작해 장려상을 수상한 후, 현재까지 1인 개발로 전면 재설계 및 실서버 전환 고도화를 이어가고 있습니다.`,
    role: `iOS 앱에서 Photos·PhotoKit을 통한 스크린샷 자동 탐색 및 **Apple Vision Framework 기반 온디바이스 OCR과 Spring Boot 백엔드 REST API 설계**를 전담했습니다. 개인정보 정규식 마스킹, AI 요약 카드 생성, 스마트 폴더 분류, 텍스트 검색, CoreLocation 기반 위치 추천 및 마감일 리마인더 알림, 친구·채팅·카드 스냅샷 공유, JWT 인증을 구현하고, SwiftUI 구조 전면 재설계 및 Mock 기능의 실서버 전환을 완수했습니다.`,
    problem: `현대 스마트폰 사용자는 유용한 정보를 스크린샷으로 자주 저장하지만, 사진첩에 수천 장의 사진과 뒤섞여 정작 필요한 순간에 검색하거나 찾기 어려워 '디지털 무덤'으로 방치됩니다. 또한 **금융·개인정보가 포함된 스크린샷의 외부 클라우드 전송 시 프라이버시 침해 위험**이 발생하는 문제가 있었습니다.`,
    troubleshooting: `Apple Vision Framework를 활용해 기기 내부(On-Device)에서 1차로 텍스트를 인식하고 정규표현식 기반으로 민감 개인정보를 마스킹한 뒤, **필요한 텍스트 메타데이터만 백엔드로 비동기 전송하는 하이브리드 파이프라인**을 구축했습니다. 이를 통해 사용자 프라이버시를 원천 보호하면서도 서버 트래픽과 연산 비용을 대폭 절감하고 빠른 응답 속도를 확보했습니다.`,
    result: `총 200건의 실측 스크린샷 데이터셋 대상 **자동 분류 정확도 95% 달성** 및 서로 다른 3개 지역 현장 테스트에서 **위치 기반 장소 추천 성공률 90%**를 검증했습니다. 졸업프로젝트 장려상 수상 이후 1인 개발로 SwiftUI 아키텍처 리팩토링 및 Spring Boot 실서버 연동 고도화를 완수했습니다.`,
    target_audience: `자료, 일정, 맛집 정보 등을 캡처하지만 정작 필요할 때 찾지 못하는 아이폰 사용자`,
    goal: `기기 내부 온디바이스 OCR을 통한 강력한 프라이버시 보호와 AI 메타데이터 자동 추출 및 다차원 검색 지원`,
    constraints: `모바일 기기 배터리 및 연산 자원 최적화, 민감 개인정보 유출 방지 및 통신 비용 최소화`,
    key_decision: `클라우드 전송 대신 On-Device OCR + 정규식 마스킹 + Spring Boot 비동기 처리 하이브리드 파이프라인 채택`,
    collaboration: `졸업프로젝트 팀에서 iOS 앱 및 백엔드 파이프라인을 리드한 후, 현재 1인 개발로 실서버 전환 및 아키텍처 고도화를 이어가고 있습니다.`,
    architecture: `SwiftUI (MVVM) + Apple Vision + CoreLocation + PhotoKit / Java 17 + Spring Boot 3 + Spring Data JPA + MySQL + JWT`,
    quality_assurance: `실측 스크린샷 200건 기반 분류 정확도 측정(95%), 이화여대·일산·광화문 3개 지역 현장 위치 추천 테스트(90%)`,
    deployment: `클라이언트 TestFlight 배포 및 AWS EC2 기반 Spring Boot 실서버 구축`,
    evidence: `졸업프로젝트 결과 보고서, 장려상 수상 증빙, 실측 테스트 데이터셋 문서 및 GitHub 커밋 이력`,
    learnings: `**온디바이스 AI와 백엔드 서버 간의 효율적인 역할 분담**과 사용자 프라이버시를 최우선으로 고려한 시스템 설계의 중요성을 체득했습니다.`,
    next_time: `CoreML 경량화 임베딩 모델을 추가 도입해 사진 속 객체 시각적 유사도 검색 기능 확장`
  },
  "Folioframe — 직군 맞춤형 웹 포트폴리오 서비스": {
    summary: `개발자가 **기술 선택과 문제 해결 과정을 구조적으로 기록**하고 하나의 링크로 발행할 수 있는 웹 서비스를 개발했습니다. 지금 보고 계신 이 웹 포트폴리오 역시 Folioframe 서비스를 직접 기획하고 개발하여 발행한 실제 프로덕션 결과물입니다. 단순한 이력 나열을 넘어 기여도와 문제 해결 능력을 온전히 전달할 수 있도록 돕습니다.`,
    role: `1인 개발자로서 기획, UI/UX 설계, **Next.js App Router와 PostgreSQL 기반 풀스택 아키텍처 구축**, Supabase 스토리지 연동 및 Vercel 배포 파이프라인까지 전 과정을 완수했습니다. 직무별 포트폴리오 에디터, 프로젝트 케이스 스터디 작성기, 커스텀 슬러그 기반 공유 페이지, 테마 전환 시스템을 설계하고 구현했습니다.`,
    problem: `기존 포트폴리오 도구들은 단순 프로젝트 나열에 그쳐 개발자가 직면한 문제와 기술적 의사결정 과정을 설득력 있게 보여주기 어려웠고, **다양한 디바이스와 테마 환경에서 가독성을 일정하게 유지**하기 힘든 문제가 있었습니다.`,
    troubleshooting: `직무별로 필수적인 구조(요약, 기여도, 문제 해결, 엔지니어링 노트)를 강제하는 모듈형 데이터 스키마를 설계하고, **CSS 변수 기반 디자인 토큰 시스템과 반응형 레이아웃**을 적용해 어떤 테마에서도 일관되고 깔끔한 뷰를 제공하도록 구현했습니다.`,
    result: `포트폴리오 생성부터 테마 변경, 프로젝트 상세 케이스 스터디 발행까지 지원하는 MVP를 완성하고 실서버에 배포하여, **현재 실제 포트폴리오 라이브 서비스로 활용**하고 있습니다.`,
    target_audience: `자신의 프로젝트 경험과 엔지니어링 의사결정을 구조화하여 설득력 있게 보여주고 싶은 소프트웨어 엔지니어`,
    goal: `단순한 스택 나열이 아닌, 문제 해결 과정과 기여도가 직관적으로 전달되는 표준화된 포트폴리오 플랫폼 제공`,
    constraints: `1인 개발 환경에서 빠른 프로덕션 배포와 안정적인 데이터 무결성 및 고품질 반응형 UI 구현`,
    key_decision: `빠른 서버 사이드 렌더링과 SEO 최적화를 위해 Next.js App Router와 PostgreSQL, CSS Modules/변수 기반 테마 시스템 채택`,
    collaboration: `기획, 디자인, 프론트엔드, 백엔드, 배포까지 1인으로 전담하여 완수했습니다.`,
    architecture: `Next.js 15 (App Router, TypeScript) + PostgreSQL (Neon/pg) + Supabase Storage + Vercel Edge/Serverless`,
    quality_assurance: `슬러그 중복 검증, 실시간 미리보기 렌더링 검증, 다중 디바이스 뷰포트 반응형 UI 테스트`,
    deployment: `GitHub 연동 Vercel 자동 CI/CD 배포 파이프라인 구축 및 커스텀 도메인 연결`,
    evidence: `라이브 서비스(folioframe-lake.vercel.app), GitHub 소스코드 및 커밋 이력, 실제 사용자 발행 데이터`,
    learnings: `제품 기획부터 프로덕션 배포까지 풀 사이클을 경험하며, **사용자 경험을 고려한 데이터 모델링과 상태 관리의 중요성**을 배웠습니다.`,
    next_time: `방문자 분석 애널리틱스 대시보드 및 PDF 포트폴리오 원클릭 내보내기 기능 추가`
  },
  "Ticker — Human Stock Market": {
    summary: `개인의 가치, 성장 지표, 성과를 **주식 시장 메커니즘으로 시각화하고 상호 투자·응원하는 소셜 파이낸스 플랫폼**입니다. 실시간 호가 변동과 가상 주식 거래 시스템을 웹으로 구현했습니다.`,
    role: `팀원들과 함께 서비스 기획 및 프론트엔드 연동 회의를 주도하고, **백엔드 아키텍처 설계, 가상 주식 거래 체결 엔진 및 트랜잭션 무결성 보장** REST API 구현 전반을 담당했습니다.`,
    problem: `여러 사용자가 동시에 특정 인물의 가상 주식을 매수하거나 매도할 때 **동시성 이슈(Race Condition)로 인해 잔고 왜곡이나 체결가 불일치가 발생할 위험**이 있었습니다.`,
    troubleshooting: `데이터베이스 **비관적 락(Pessimistic Lock)과 트랜잭션 격리 수준을 강화**하고, 주문 체결 전 잔고 검증 및 원자적 갱신 로직을 설계하여 동시 주문 상황에서도 데이터 정합성을 100% 보장했습니다.`,
    result: `가상 주식 매수·매도 거래 체결, 포트폴리오 자산 평가액 산출, 실시간 호가 반영 API를 완성하여 **동시 다발적인 가상 거래 요청을 데이터 왜곡 없이 안정적으로 처리하는 시스템**을 완성했습니다.`,
    target_audience: `자신의 성장을 지표로 증명하고, 동료의 가치에 가상 투자하며 함께 동기부여를 얻고 싶은 팀원들`,
    goal: `실시간 가상 주식 거래 메커니즘을 통한 사용자 간 상호 응원 및 가치 평가 소셜 플랫폼 구축`,
    constraints: `동시 다발적 매수·매도 요청 환경에서 데이터베이스 정합성과 트랜잭션 안전성 확보`,
    key_decision: `정합성 보장을 위해 트랜잭션 내 비관적 락을 적용하고 원자적 잔고 갱신 파이프라인 구축`,
    collaboration: `팀원들과 기획 회의 및 프론트엔드-백엔드 API 명세 동기화를 주도하며 개발을 완수했습니다.`,
    architecture: `Node.js + Express + PostgreSQL + RESTful API`,
    quality_assurance: `동시 주문 시나리오 테스트, 트랜잭션 롤백 검증 및 잔고 정합성 테스트 수행`,
    deployment: `클라우드 서버 인스턴스 기반 배포 및 실시간 테스트 완료`,
    evidence: `GitHub 저장소의 백엔드 트랜잭션 처리 코드, ERD 설계 문서 및 API 엔드포인트 커밋 내역`,
    learnings: `금융 거래 메커니즘에서 **동시성 제어와 트랜잭션 격리 수준의 중요성**을 깊이 체득했습니다.`,
    next_time: `Redis 기반 분산 락(Redlock) 및 체결 큐(Message Queue) 도입으로 대규모 트래픽 처리 성능 고도화`
  },
  "Love Algorithm — 알고리즘보다 어려운 건 사랑이었다": {
    summary: `알고리즘 문제 해결 상황과 개발자 밈을 **인터랙티브 스토리텔링과 연애 시뮬레이션 게임**으로 유쾌하게 풀어낸 웹 콘텐츠입니다.`,
    role: `팀원들과 함께 스토리텔링과 복잡한 선택지 분기 구조를 설계하고, **12가지 분기별 멀티 엔딩 계산 엔진과 상태 관리 API**를 구현했습니다.`,
    problem: `선택지가 복잡하게 얽힌 다지선다 구조에서 사용자가 이전 단계로 되돌아가거나 네트워크 지연 시 **세션 상태 유실로 인한 엔딩 왜곡 문제**가 있었습니다.`,
    troubleshooting: `**상태 머신(State Machine) 패턴을 백엔드에 도입**하여 각 단계별 선택지와 상태 전이 규칙을 정형화하고, 세션 토큰 기반으로 진행 내역을 안전하게 캐싱·복구하도록 구현했습니다.`,
    result: `12가지 다채로운 멀티 엔딩 분기 계산 엔진과 **끊김 없는 인터랙티브 웹 스토리 엔진**을 완성하여 몰입도 높은 게임 경험을 제공했습니다.`,
    target_audience: `개발자 유머와 스토리텔링 기반 인터랙티브 웹 콘텐츠를 즐기고 싶은 사용자`,
    goal: `12가지 멀티 엔딩 분기 로직을 정확히 계산하고 매끄러운 웹 스토리 경험을 제공하는 시스템 구축`,
    constraints: `다양한 선택지 조합 속에서도 상태 유실 없이 일관된 엔딩 산출 보장`,
    key_decision: `복잡한 분기 로직을 하드코딩하지 않고 상태 전이 테이블 기반 엔진으로 추상화`,
    collaboration: `스토리 기획자, UI 디자이너와 협업하여 세션 API 및 엔딩 판정 로직을 개발했습니다.`,
    architecture: `JavaScript / Node.js + Express + Session Storage`,
    quality_assurance: `12가지 엔딩 루트에 대한 분기 경로 전수 테스트 및 상태 복구 검증`,
    deployment: `웹 호스팅 실서버 배포 및 사용자 시연 완료`,
    evidence: `GitHub 저장소의 분기 계산 알고리즘 코드 및 상태 관리 커밋 이력`,
    learnings: `복잡한 비즈니스 분기 로직을 **상태 머신 구조로 깔끔하게 모듈화하는 설계 기법**을 배웠습니다.`,
    next_time: `사용자 선택 통계 데이터 시각화 및 소셜 공유 오픈그래프(OG) 카드 자동 생성 기능 추가`
  },
  "EGGO — 농꾸하고 작심삼일 타파하자": {
    summary: `지속적인 목표 달성 습관 형성을 돕기 위해 귀여운 농장 꾸미기 게이미피케이션과 **온디바이스 AI 미션 인증**을 결합한 스마트 습관 관리 모바일 앱입니다.`,
    role: `팀원과 함께 기획 및 UI/UX를 정리하고, **Google ML Kit 온디바이스 비전 모델 연동 및 AI 인증 파이프라인**을 전담했습니다.`,
    problem: `사용자가 올린 습관 인증 사진이 실제 미션 조건에 부합하는지 실시간으로 검증해야 했으나, **모든 사진을 클라우드 LLM API로만 처리하면 비용과 응답 지연이 과도해지는 문제**가 있었습니다.`,
    troubleshooting: `Google ML Kit의 On-Device 이미지 라벨링 모델로 1차 객체 인식을 수행하고 모호한 경우에만 2차로 Gemini Vision API를 호출하는 **2단계 하이브리드 AI 검증 체계**를 구현했습니다.`,
    result: `Flutter 기반 모바일 UI 화면과 잔디 심기 일일 성장 시스템, **Google ML Kit 온디바이스 이미지 인증 및 일일 인증 제한 로직**을 구현하여 실제 동작하는 완성도 높은 앱을 완성했습니다.`,
    target_audience: `혼자서는 작심삼일로 끝나기 쉬운 일상 습관을 게임처럼 재미있게 유지하고 싶은 사용자`,
    goal: `비용 효율적이고 빠른 온디바이스 AI 비전 기반 실시간 습관 인증 시스템 개발`,
    constraints: `모바일 환경에서의 빠른 이미지 추론 속도 및 API 호출 비용 최소화`,
    key_decision: `클라우드 의존도를 낮추기 위해 Google ML Kit 온디바이스 1차 분류 + Gemini 2차 보정 하이브리드 구조 채택`,
    collaboration: `디자이너 및 Flutter 개발 팀원과 협업하여 AI 인증 모듈을 앱 화면에 완벽 연동했습니다.`,
    architecture: `Flutter (Dart) + Google ML Kit + Google Gemini Vision API`,
    quality_assurance: `다양한 일상 사물(텀블러, 책, 운동기구 등)에 대한 실시간 이미지 인식률 및 예외 케이스 테스트`,
    deployment: `Android APK 빌드 및 실기기 테스트 완료`,
    evidence: `GitHub README, 이미지 인식 파이프라인 코드 및 실제 모바일 시연 영상`,
    learnings: `모바일 환경에서 **온디바이스 AI와 클라우드 AI의 최적 조합을 설계하는 역량**을 길렀습니다.`,
    next_time: `사용자 맞춤형 커스텀 미션 등록 및 경량 로컬 비전 모델 파인튜닝`
  },
  "Localhost — 멀티플레이어 뮤직 퀴즈 게임": {
    summary: `여러 사용자가 웹 브라우저를 통해 실시간으로 방에 접속해 음악을 함께 듣고 퀴즈를 맞히는 **실시간 멀티플레이어 웹 게임**입니다.`,
    role: `팀원과 함께 기획 및 UI/UX를 정리하고, **웹소켓(Socket.io) 기반 실시간 동기화 UI 및 오디오 스트리밍**을 구현했습니다.`,
    problem: `실시간 멀티플레이어 환경에서 접속자 간 네트워크 지연(Latency)이 발생할 경우 **음악 재생 시점과 퀴즈 타이머가 어긋나 공정한 게임 진행이 어려운 문제**가 있었습니다.`,
    troubleshooting: `서버 타임스탬프를 기준으로 클라이언트의 재생 시점을 주기적으로 보정하는 **동기화 알고리즘과 Socket.io 룸 이벤트 핸들러**를 구현해 딜레이를 최소화했습니다.`,
    result: `**WebSocket 기반 실시간 동기화 게임 화면 및 오디오 재생 흐름**을 구현하여 여러 사용자가 동시 접속해 즐길 수 있는 음악 퀴즈 게임을 완성했습니다.`,
    target_audience: `웹 브라우저로 친구들과 실시간 음악 퀴즈 게임을 함께 즐기고 싶은 사용자`,
    goal: `동시 접속자 간 지연 없는 실시간 오디오 동기화와 즉각적인 퀴즈 인터랙션 제공`,
    constraints: `클라이언트 간 네트워크 핑 차이 극복 및 오디오 버퍼링 지연 동기화`,
    key_decision: `서버 마스터 타임스탬프 기반 재생 시점 보정 및 Socket.io 룸 격리 아키텍처 채택`,
    collaboration: `웹 프론트엔드 및 백엔드 팀원과 소켓 이벤트 프로토콜을 정의하고 협업했습니다.`,
    architecture: `Node.js + Express + Socket.io + HTML5 Web Audio API`,
    quality_assurance: `다중 브라우저 탭 및 다중 기기 동시 접속 환경에서 재생 동기화 및 퀴즈 점수 집계 테스트`,
    deployment: `클라우드 서버 배포 및 다자간 실시간 시연 완료`,
    evidence: `GitHub README의 기능·기술 스택·구조·실행 방법과 배서연 명의의 animation·socket·domain·game screen 관련 커밋에서 확인할 수 있습니다.`,
    learnings: `실시간 멀티플레이어 환경에서 **웹소켓 이벤트 라이프사이클 관리와 상태 동기화 기법**을 깊이 학습했습니다.`,
    next_time: `웹RTC(WebRTC) 기반 음성 채팅 기능 추가 및 3D 그래픽 최적화`
  },
  "도다(DODA) — 정보 장벽을 낮추는 콘텐츠 플랫폼": {
    summary: `복잡하고 방대한 공공 복지 정책 및 기술 정보를 **누구나 이해하기 쉬운 비주얼 카드와 요약 콘텐츠로 변환해주는 정보 접근성 향상 플랫폼**입니다.`,
    role: `3일 해커톤에서 기획자·디자이너·프론트엔드 팀원들과 협업하여 **Java 17·Spring Boot REST API 백엔드 설계 및 Docker/EC2 배포 파이프라인 구축**을 전담했습니다.`,
    problem: `72시간이라는 극도로 짧은 해커톤 시간 안에 **복잡한 복지 데이터 모델 설계부터 대량 엑셀 뉴스 파싱 백엔드 API와 클라우드 실서버 배포까지 완수**해야 했습니다.`,
    troubleshooting: `Spring Boot 도메인 기반 모듈화 설계와 Apache POI 엑셀 일괄 파싱을 구현하고, **Docker와 GitHub Actions를 결합한 CI/CD를 구성**해 프론트엔드 팀원이 즉시 연동 가능한 라이브 HTTPS API 환경을 제공했습니다.`,
    result: `72시간 해커톤 동안 **회원가입·JWT 토큰 인증, 맞춤형 복지 조건 필터링 검색, 북마크 관리, Excel 뉴스 등록 및 AI 요약 백엔드 API**를 완벽히 구현하여 실제 서비스 가능한 MVP를 성공적으로 완성했습니다.`,
    target_audience: `어렵고 복잡한 정부 복지 정책이나 전문 기술 정보를 쉽고 빠르게 찾아보고 요약 카드로 확인하고 싶은 일반 대중`,
    goal: `누구나 손쉽게 정보에 접근할 수 있는 직관적인 비주얼 카드 뷰어 및 API 플랫폼 제작`,
    constraints: `72시간 제한된 일정 속에서 백엔드 API와 프론트엔드 완벽 연동 및 라이브 배포 달성`,
    key_decision: `복잡한 로직 대신 Spring Boot 모듈화와 Docker/EC2 빠른 CI/CD 구조로 배포 성공률 극대화`,
    collaboration: `3일 해커톤에서 기획자·디자이너·프론트엔드·백엔드 팀원들과 협업했습니다.`,
    architecture: `Java 17·Spring Boot 3·Spring Security 기반 REST API + MySQL + Redis + Docker + AWS EC2/ECR 배포`,
    quality_assurance: `회원가입/로그인 Bearer 토큰 인증, 복지 조건 필터링, 북마크 CRUD, Excel 파싱 API 검증`,
    deployment: `GitHub Actions CI/CD → AWS ECR 이미지 빌드 및 EC2 컨테이너 자동 배포 (HTTPS 적용)`,
    evidence: `GitHub README의 기획 배경·기능·API·ERD·배포 문서와 백엔드 구현 커밋에서 확인할 수 있습니다.`,
    learnings: `단기 해커톤 환경에서 **명확한 API 계약과 빠른 CI/CD 자동화가 협업 효율에 미치는 결정적 영향**을 배웠습니다.`,
    next_time: `Elasticsearch 기반 전문 검색 엔진 연동 및 사용자 맞춤형 공공 정책 추천 알고리즘 구현`
  },
  "자율 추종 스마트 카트 — Aruco·LiDAR 센서 융합": {
    summary: `**Aruco 비전 마커와 2D LiDAR 센서를 결합해 사용자를 인식하고 스스로 따라가는 스마트 카트**를 ROS2와 Gazebo 가상 환경에서 구현한 1인 로보틱스 프로젝트입니다.`,
    role: `ROS2 가상 주행 환경 구축부터 센서 데이터 필터링, **OpenCV Aruco 마커 검출, P-control 로봇 제어 및 LiDAR 안전 알고리즘** 구현까지 전 과정을 1인으로 수행했습니다.`,
    problem: `카메라만 사용하면 대상을 놓치거나 조명 변화 시 돌발 장애물을 감지하기 어려웠고, 최신 Gazebo Sim 환경에서 **주행 명령(/cmd_vel)이 로봇까지 전달되지 않는 통신 문제**가 있었습니다.`,
    troubleshooting: `OpenCV Aruco 마커의 오차를 이용해 P-control로 속도를 제어하고, **LiDAR로 0.5m 이하 장애물 감지 시 강제 정지하는 2중 안전 로직**을 구현했습니다. Gazebo Sim 통신 문제는 ros_gz_bridge로 명시적 중계해 해결했습니다.`,
    result: `ROS2와 Gazebo Sim 환경에서 **Aruco 마커 인식 P-control 주행과 LiDAR 0.5m 이내 긴급 정지 2중 안전 제어**를 완벽히 검증하고 최종 시연 영상을 제작했습니다.`,
    target_audience: `마트나 물류 창고 등에서 무거운 짐을 들지 않고 사용자를 안전하게 따라오도록 돕는 자율 주행 카트 시스템`,
    goal: `비전과 LiDAR 센서 융합을 통한 장애물 회피 및 안정적인 자율 추종 주행 제어 구현`,
    constraints: `시뮬레이션 환경에서의 센서 노이즈 처리 및 통신 지연 속에서도 즉각적인 긴급 정지 반응성 확보`,
    key_decision: `단일 센서 한계 극복을 위해 비전(추종) + LiDAR(안전 정지) 이중화 제어 아키텍처 채택`,
    collaboration: `1인 프로젝트로 기획부터 알고리즘 구현, 시뮬레이션 검증까지 완수했습니다.`,
    architecture: `ROS2 Humble + Gazebo Sim + OpenCV + C++/Python + ros_gz_bridge`,
    quality_assurance: `마커 인식 거리(1~3m) 추종 정밀도 측정 및 0.5m 이내 장애물 돌발 출현 시 긴급 정지 반응 검증`,
    deployment: `Gazebo 시뮬레이터 가상 환경 빌드 및 주행 데모 영상 제작`,
    evidence: `GitHub 소스코드, ROS2 패키지 노드 구성도 및 Gazebo 시뮬레이션 주행 시연 비디오`,
    learnings: `센서 융합을 통한 **안전 제어 메커니즘과 ROS2 노드 간 토픽 통신 디버깅 역량**을 체득했습니다.`,
    next_time: `실제 물리 하드웨어(Turtlebot 또는 카트 모터 드라이버)에 임베디드 포팅 및 실내 자율 주행 확장`
  }
};

const projects = await client.query("SELECT id, title FROM projects WHERE portfolio_id = $1", [portfolioId]);
console.log(`Updating ${projects.rows.length} projects in DB with curated, selective highlights...`);

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
    console.log("Updated curated highlights for:", row.title);
  }
}

await client.end();
console.log("All projects updated with curated highlights!");
