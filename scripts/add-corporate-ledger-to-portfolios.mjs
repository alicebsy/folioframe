import pg from "pg";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL이 필요합니다.");

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
await client.connect();

const referencePortfolioId = "50cdc307-197d-4e60-8f15-739c53f738c6";
const title = "우리 법인 장부 — AI 협업으로 만든 다법인 회계관리";
const fields = {
  summary: "여러 법인의 거래·증빙·월별 손익을 한곳에서 관리하기 위해 만든 실사용 웹 장부입니다. 주변인이 반복해서 겪던 회계관리 불편을 발견하고, AI와 협업하는 바이브 코딩 방식으로 요구사항 정의부터 구현·검증까지 진행했습니다.",
  role: "1인 프로젝트로 사용자 인터뷰, 문제 정의, 기능 우선순위, 화면·데이터 구조 설계, AI 협업 개발, 실제 장부 사례 검증과 배포를 담당했습니다.",
  problem: "법인별 매출·매입·경비와 통장·현금 내역이 여러 엑셀에 흩어져 월별 손익과 잔액을 반복 계산해야 했습니다. 증빙 누락과 미입금·미지급 거래도 한눈에 확인하기 어려웠습니다.",
  troubleshooting: "실제 사용자의 장부 작성 순서를 관찰해 법인 선택, 거래 입력, 자동 집계, 증빙 확인의 핵심 흐름으로 단순화했습니다. AI로 구현 대안과 예외 상황을 빠르게 탐색하되, 계산 결과와 엑셀 가져오기는 실제 사례로 직접 대조했습니다. 중복 거래, 잘못된 날짜·금액, 분석 실패 같은 예외를 반복 검증해 수정했습니다.",
  result: "다법인 월별 현황, 예상 손익, 거래·증빙, 반복 지출, 엑셀 가져오기·내보내기와 수정 이력을 하나의 반응형 웹앱으로 완성했습니다. 실제 법인 업무에서 사용할 수 있는 흐름으로 구현했습니다.",
  targetAudience: "여러 법인을 운영하거나 엑셀로 거래와 증빙을 관리하는 소규모 법인 실무자",
  goal: "회계 지식이 많지 않아도 거래를 빠르게 기록하고 월별 현황과 확인할 항목을 놓치지 않게 합니다.",
  constraints: "실제 재무 데이터의 정확성과 개인정보를 보호하면서 PC와 모바일에서 쉽게 사용할 수 있어야 했습니다. 집계는 세무 신고가 아닌 업무 보조 범위로 명확히 구분했습니다.",
  keyDecision: "AI가 제안한 결과를 그대로 채택하지 않고, 사용자의 실제 업무 흐름과 장부 계산 결과를 기준으로 기능을 선택하고 검증했습니다.",
  collaboration: "사용자가 불편을 설명하면 요구사항과 완료 조건으로 정리하고, AI와 설계·구현 대안을 탐색한 뒤 직접 실행·검증하는 방식으로 반복했습니다.",
  learnings: "AI 활용 능력은 프롬프트 작성 자체보다 문제를 정확히 정의하고, 생성된 결과를 검증하며, 실제 사용 가능한 수준까지 반복 개선하는 역량에 가깝다는 것을 배웠습니다.",
  nextTime: "자동 분류의 신뢰도 표시, 월별 비교 리포트와 더 세분화된 권한 관리를 추가할 계획입니다.",
  evidence: "다법인 현황·거래 관리·증빙·반복 지출·엑셀 입출력·수정 이력이 연결된 동작 가능한 웹앱과 공개 GitHub 저장소",
  architecture: "Next.js 16·React 19·TypeScript UI와 API, Cloudflare D1·Drizzle ORM 데이터 계층으로 구성했습니다. ExcelJS로 기존 장부 가져오기와 월별 보고서 생성을 처리합니다.",
  qualityAssurance: "실제 장부 사례와 자동 집계값을 대조하고, 잘못된 날짜·금액·중복 거래·증빙 누락·모바일 화면을 확인했습니다. 프로덕션 빌드도 검증했습니다.",
  deployment: "Cloudflare 기반 실행 환경과 D1 데이터베이스를 사용하며 실제 데이터와 환경 변수는 GitHub 저장소에서 제외했습니다.",
};

await client.query("BEGIN");
try {
  const portfolios = await client.query(
    `SELECT id FROM portfolios WHERE owner_id = (SELECT owner_id FROM portfolios WHERE id = $1)`,
    [referencePortfolioId],
  );
  for (const { id: portfolioId } of portfolios.rows) {
    const existing = await client.query("SELECT id FROM projects WHERE portfolio_id=$1 AND title=$2", [portfolioId, title]);
    const values = [fields.summary, fields.role, fields.problem, fields.troubleshooting, fields.result, fields.targetAudience, fields.goal, fields.constraints, fields.keyDecision, fields.collaboration, fields.learnings, fields.nextTime, fields.evidence, fields.architecture, fields.qualityAssurance, fields.deployment];
    let projectId = existing.rows[0]?.id;
    if (projectId) {
      await client.query(`UPDATE projects SET summary=$1,role=$2,problem=$3,troubleshooting=$4,result=$5,target_audience=$6,goal=$7,constraints=$8,key_decision=$9,collaboration=$10,learnings=$11,next_time=$12,evidence=$13,architecture=$14,quality_assurance=$15,deployment=$16,team_size='1인',contribution='기획·개발·검증 100%',tech_stacks=ARRAY['AI 협업 개발','바이브 코딩','Next.js','React','TypeScript','Cloudflare D1','Drizzle ORM','ExcelJS'],is_public=true,updated_at=NOW() WHERE id=$17`, [...values, projectId]);
    } else {
      const inserted = await client.query(`INSERT INTO projects (portfolio_id,title,summary,role,problem,troubleshooting,result,target_audience,goal,constraints,key_decision,collaboration,learnings,next_time,evidence,architecture,quality_assurance,deployment,team_size,contribution,tech_stacks,is_public,is_featured,display_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,'1인','기획·개발·검증 100%',ARRAY['AI 협업 개발','바이브 코딩','Next.js','React','TypeScript','Cloudflare D1','Drizzle ORM','ExcelJS'],true,false,(SELECT COALESCE(MAX(display_order),-1)+1 FROM projects WHERE portfolio_id=$1)) RETURNING id`, [portfolioId, title, ...values]);
      projectId = inserted.rows[0].id;
    }
    await client.query("DELETE FROM project_links WHERE project_id=$1 AND url=$2", [projectId, "https://github.com/alicebsy/corporate-ledger"]);
    await client.query("INSERT INTO project_links(project_id,label,url,display_order) VALUES($1,'GitHub 저장소',$2,0)", [projectId, "https://github.com/alicebsy/corporate-ledger"]);
  }
  await client.query("COMMIT");
  console.log(`우리 법인 장부를 ${portfolios.rowCount}개 포트폴리오에 반영했습니다.`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
