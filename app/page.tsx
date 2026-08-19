import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  const isLoggedIn = Boolean(user);

  return (
    <main className="landing-shell">
      <nav className="landing-nav" aria-label="주요 메뉴">
        <a className="brand" href="#top"><span className="brand-mark">✦</span><span>Folioframe</span></a>
        <div className="landing-nav-actions">
          <a className="landing-text-link" href="#templates">테마 예시</a>
          <a className="landing-login" href={isLoggedIn ? "/api/auth/logout" : "/login"}>{isLoggedIn ? "로그아웃" : "로그인"}</a>
          <a className="landing-nav-cta" href={isLoggedIn ? "/dashboard" : "/login?mode=register"}>{isLoggedIn ? "마이페이지로 이동" : "포트폴리오 만들기"}</a>
        </div>
      </nav>

      <section className="landing-hero" id="top">
        <div className="landing-hero-copy">
          <span className="landing-kicker"><i /> PORTFOLIO FOR DEVELOPERS</span>
          <h1>코드만큼 중요한<br /><em>개발의 맥락</em>을<br />보여주세요.</h1>
          <p>기술 선택부터 구현, 검증, 배포까지. 개발자가 만든 결과와 판단을 면접관이 한눈에 이해할 수 있는 포트폴리오로 정리합니다.</p>
          <div className="landing-hero-actions">
            <a className="landing-primary-cta" href={isLoggedIn ? "/dashboard" : "/login?mode=register"}>{isLoggedIn ? "마이페이지로 이동" : "무료로 시작하기"} <span>→</span></a>
            <a className="landing-secondary-cta" href="#templates">예시 포트폴리오 보기</a>
          </div>
          <div className="landing-trust"><span>프로젝트</span><i /><span>기술 스택</span><i /><span>경험과 자격</span><i /><span>배포 링크</span></div>
        </div>

        <div className="landing-hero-preview" aria-label="개발자 포트폴리오 미리보기">
          <div className="landing-preview-top"><span className="brand-mark">✦</span><b>hong.gildong</b><small>AVAILABLE FOR WORK</small></div>
          <div className="landing-preview-intro"><span>FRONTEND DEVELOPER · 2026</span><h2>문제를 끝까지<br />구현하는 개발자</h2><p>사용자의 흐름을 관찰하고, 작고 선명한 인터페이스로 답을 만듭니다.</p></div>
          <div className="landing-preview-project"><div className="landing-code-lines"><i /><i /><i /><i /></div><div><span>FEATURED PROJECT</span><strong>Checkout<br />rebuild</strong><small>React · TypeScript · Test</small></div></div>
          <div className="landing-preview-note"><span>01</span><p>문제 정의부터<br />배포 이후까지</p><b>↗</b></div>
        </div>
      </section>

      <section className="landing-proof" aria-label="포트폴리오 구성 안내">
        <p>면접관이 알고 싶은 것은 단순한 기술 목록이 아닙니다.</p>
        <div><strong>무엇을</strong><span>만들었는지</span><i>·</i><strong>어떻게</strong><span>해결했는지</span><i>·</i><strong>왜</strong><span>그렇게 판단했는지</span></div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading"><span>WHAT TO SHOW</span><h2>개발 경험을<br />읽기 쉽게 구조화합니다.</h2><p>한 프로젝트 안에서도 역할, 기술, 의사결정과 결과가 자연스럽게 이어지도록 구성합니다.</p></div>
        <div className="landing-feature-grid">
          <article><span>01</span><h3>프로젝트의<br />핵심을 먼저</h3><p>대표 이미지·영상, 한 줄 요약과 기술 키워드로 첫 화면에서 시선을 잡습니다.</p><div className="landing-card-project"><b>PRODUCT</b><i /><i /><i /></div></article>
          <article><span>02</span><h3>내 기여와<br />판단을 명확히</h3><p>문제, 맡은 역할, 선택한 이유와 검증 결과를 프로젝트 상세에서 차분히 설명합니다.</p><div className="landing-card-flow"><b>문제 정의</b><i /><b>구현</b><i /><b>검증 · 배포</b></div></article>
          <article><span>03</span><h3>프로젝트 밖의<br />나도 함께</h3><p>기술 스택, 경력, 학력, 자격증과 외부 링크까지 한 사람의 이력을 완성합니다.</p><div className="landing-card-profile"><em>김</em><div><b>Frontend<br />Developer</b><small>React · Next.js · TypeScript</small></div></div></article>
        </div>
      </section>

      <section className="landing-templates" id="templates">
        <div className="landing-template-heading"><div><span>4 PORTFOLIO THEMES</span><h2>내용은 같아도,<br />인상은 다르게.</h2></div><p>카드형, 미니멀, 대담한 타이포그래피, 어두운 몰입형까지. 작성한 내용을 각 테마에서 확인할 수 있습니다.</p></div>
        <div className="landing-theme-grid">
          <a className="landing-theme-card editorial" href="/portfolio-preview?theme=editorial"><div><span>01</span><b>Editorial</b><small>차분하고 선명한 흐름</small></div><i>안녕하세요,<br />홍길동입니다.</i><em>예시 보기 ↗</em></a>
          <a className="landing-theme-card minimal" href="/portfolio-preview?theme=minimal"><div><span>02</span><b>Minimal</b><small>간결한 정보 중심</small></div><i>build<br />with care.</i><em>예시 보기 ↗</em></a>
          <a className="landing-theme-card bold" href="/portfolio-preview?theme=bold"><div><span>03</span><b>Bold</b><small>강한 타이포그래피</small></div><i>MAKE IT<br />WORK.</i><em>예시 보기 ↗</em></a>
          <a className="landing-theme-card noir" href="/portfolio-preview?theme=noir"><div><span>04</span><b>Noir</b><small>몰입감 있는 다크 테마</small></div><i>ship<br />the work.</i><em>예시 보기 ↗</em></a>
        </div>
      </section>

      <section className="landing-final">
        <span>YOUR NEXT PORTFOLIO</span><h2>이제, 만든 것을<br /><em>제대로 보여줄 차례.</em></h2><p>프로젝트 하나부터 시작해도 충분합니다.</p><a href={isLoggedIn ? "/dashboard" : "/login?mode=register"}>{isLoggedIn ? "마이페이지로 이동" : "포트폴리오 만들기"} <b>→</b></a>
      </section>

      <footer className="landing-footer"><a className="brand" href="#top"><span className="brand-mark">✦</span><span>Folioframe</span></a><span>DEVELOPER PORTFOLIO, MADE CLEAR.</span><a href={isLoggedIn ? "/dashboard" : "/login"}>{isLoggedIn ? "마이페이지" : "로그인"}</a></footer>
    </main>
  );
}
