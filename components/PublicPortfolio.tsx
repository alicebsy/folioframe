import type { Portfolio, Project } from "@/lib/models";

export default function PublicPortfolio({
  data,
}: {
  data: { portfolio: Portfolio; projects: Project[] };
}) {
  const { portfolio, projects } = data;

  return (
    <main className="public-shell">
      <nav className="public-nav">
        <span className="brand">
          <span className="brand-mark">✦</span>
          <span>Folioframe</span>
        </span>
        <span className="slug-badge">/p/{portfolio.slug}</span>
      </nav>

      <header className="portfolio-hero">
        <span className="portfolio-kicker">PORTFOLIO · 2026</span>
        <div className="hero-grid">
          <div>
            <h1>안녕하세요,<br /><span>{portfolio.name}</span>입니다.</h1>
            <p>{portfolio.bio}</p>
          </div>
          <div className="hero-side">
            <div className="large-avatar">{portfolio.name.slice(0, 1)}</div>
            <strong>{portfolio.jobTitle}</strong>
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`}>{portfolio.contactEmail}</a>
            )}
          </div>
        </div>
      </header>

      <section className="portfolio-projects">
        <div className="portfolio-section-title">
          <span>SELECTED WORK</span>
          <h2>문제를 발견하고,<br />끝까지 해결한 경험</h2>
          <p>{String(projects.length).padStart(2, "0")} PROJECTS</p>
        </div>

        {projects.map((project, index) => (
          <article className="case-study" key={project.id}>
            <div className="case-index">
              <span>{String(index + 1).padStart(2, "0")}</span><i />
            </div>
            <div className="case-content">
              <div className="case-heading">
                <div>
                  <span className="case-source">CASE STUDY</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
              </div>
              <div className="case-story">
                <section><span>01 · ROLE</span><h4>담당 역할</h4><p>{project.role}</p></section>
                <section><span>02 · PROBLEM</span><h4>문제 상황</h4><p>{project.problem}</p></section>
                <section><span>03 · PROCESS</span><h4>해결 과정</h4><p>{project.troubleshooting}</p></section>
                <section className="result-block"><span>04 · RESULT</span><h4>구체적 성과</h4><p>{project.result}</p></section>
              </div>
              {!!project.links.length && (
                <div className="case-resources">
                  {project.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                      ↗ {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <footer className="public-footer">
        <div>
          <span>LET&apos;S WORK TOGETHER</span>
          <h2>좋은 문제를 함께<br />풀어가고 싶습니다.</h2>
        </div>
        {portfolio.contactEmail && (
          <a href={`mailto:${portfolio.contactEmail}`}>
            {portfolio.contactEmail} <b>↗</b>
          </a>
        )}
        <small>Made with Folioframe</small>
      </footer>
    </main>
  );
}
