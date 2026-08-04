import type { Portfolio, Project } from "@/lib/models";

function formatPeriod(start: string, end: string) {
  const format = (value: string) => value.replace("-", ".");
  if (!start && !end) return "";
  return `${start ? format(start) : "시작일 미입력"} – ${end ? format(end) : "진행 중"}`;
}

function linkHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function PublicPortfolio({
  data,
}: {
  data: { portfolio: Portfolio; projects: Project[] };
}) {
  const { portfolio, projects } = data;

  return (
    <main className={`public-shell theme-${portfolio.theme}`} data-portfolio-theme={portfolio.theme}>
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
            <div className="candidate-summary">
              {portfolio.experienceLevel && <span>{portfolio.experienceLevel}</span>}
              {portfolio.strengths.map((strength) => <b key={strength}>{strength}</b>)}
            </div>
            {portfolio.interests && <p className="candidate-interests"><strong>관심 분야</strong>{portfolio.interests}</p>}
          </div>
          <div className="hero-side">
            <div className="large-avatar">{portfolio.name.slice(0, 1)}</div>
            <strong>{portfolio.jobTitle}</strong>
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`}>{portfolio.contactEmail}</a>
            )}
            <div className="hero-links">
              {portfolio.resumeUrl && <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer">이력서 ↗</a>}
              {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
              {portfolio.blogUrl && <a href={portfolio.blogUrl} target="_blank" rel="noreferrer">Blog ↗</a>}
            </div>
          </div>
        </div>
      </header>

      {(portfolio.aboutMe || portfolio.workStyle || portfolio.values || portfolio.lookingFor) && (
        <section className="identity-section">
          <div className="identity-heading">
            <span>ABOUT ME</span>
            <h2>프로젝트 너머의<br />저를 소개합니다.</h2>
          </div>
          <div className="identity-content">
            {portfolio.aboutMe && <p className="identity-lead">{portfolio.aboutMe}</p>}
            <div className="identity-grid">
              {portfolio.workStyle && <article><span>01</span><h3>일하는 방식</h3><p>{portfolio.workStyle}</p></article>}
              {portfolio.values && <article><span>02</span><h3>중요하게 생각하는 가치</h3><p>{portfolio.values}</p></article>}
              {portfolio.lookingFor && <article><span>03</span><h3>앞으로의 방향</h3><p>{portfolio.lookingFor}</p></article>}
            </div>
          </div>
        </section>
      )}

      {!!portfolio.careers.length && (
        <section className="career-section">
          <div className="career-section-title"><span>EXPERIENCE</span><h2>경력과 활동</h2></div>
          <div className="career-timeline">
            {portfolio.careers.map((entry) => (
              <article key={entry.id}>
                <span>{entry.period || "기간 미입력"}</span>
                <div><h3>{entry.organization}</h3><strong>{entry.role}</strong><p>{entry.description}</p></div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="portfolio-projects">
        <div className="portfolio-section-title">
          <span>SELECTED WORK</span>
          <h2>문제를 발견하고,<br />끝까지 해결한 경험</h2>
          <p>{String(projects.length).padStart(2, "0")} PROJECTS</p>
        </div>

        <nav className="project-jump-list" aria-label="프로젝트 바로가기">
          {projects.map((project, index) => (
            <a href={`#project-${project.id}`} key={project.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{project.title}</strong>
              <b>↓</b>
            </a>
          ))}
        </nav>

        {projects.map((project, index) => (
          <article className="case-study" id={`project-${project.id}`} key={project.id}>
            <div className="case-index">
              <span>{String(index + 1).padStart(2, "0")}</span><i />
            </div>
            <div className="case-content">
              <div
                className={`case-cover ${project.coverImageUrl ? "has-image" : "empty"}`}
                role="img"
                aria-label={`${project.title} 대표 이미지${project.coverImageUrl ? "" : " 미등록"}`}
                style={project.coverImageUrl ? { backgroundImage: `url("${project.coverImageUrl.replaceAll('"', "%22")}")` } : undefined}
              >
                {!project.coverImageUrl && <><span>PROJECT VISUAL</span><strong>{project.title.slice(0, 1)}</strong></>}
              </div>
              <div className="case-heading">
                <div>
                  <span className="case-source">CASE STUDY</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="case-facts">
                    {formatPeriod(project.periodStart, project.periodEnd) && <span><b>기간</b>{formatPeriod(project.periodStart, project.periodEnd)}</span>}
                    {project.teamSize && <span><b>인원</b>{project.teamSize}</span>}
                    {project.contribution && <span><b>기여</b>{project.contribution}</span>}
                  </div>
                </div>
                {!!project.techStacks.length && (
                  <div className="case-tags">
                    {project.techStacks.filter(Boolean).map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                )}
              </div>
              <div className="case-scan-grid">
                <section>
                  <span>MY CONTRIBUTION</span>
                  <h4>내가 맡은 일</h4>
                  <strong>{project.contribution || project.role}</strong>
                  {project.contribution && <p>{project.role}</p>}
                </section>
                <section className="impact-card">
                  <span>KEY RESULT</span>
                  <h4>대표 성과</h4>
                  <strong>{project.result}</strong>
                </section>
              </div>
              <div className="case-detail-heading"><span>HOW I WORKED</span><h4>문제에서 해결까지</h4></div>
              <div className="case-story focused-case-story">
                <section><span>01 · CONTEXT</span><h4>대상과 목표</h4><p>{project.targetAudience || project.summary}</p>{project.goal && <small>{project.goal}</small>}</section>
                <section><span>02 · CHALLENGE</span><h4>문제와 제약</h4><p>{project.problem}</p>{project.constraints && <small>{project.constraints}</small>}</section>
                <section><span>03 · DECISION</span><h4>판단과 실행</h4><p>{project.keyDecision || project.troubleshooting}</p>{project.keyDecision && <small>{project.troubleshooting}</small>}</section>
                <section><span>04 · COLLABORATION</span><h4>협업 방식</h4><p>{project.collaboration || "개인 기여와 협업 방식을 확인할 수 있는 내용을 준비 중입니다."}</p></section>
              </div>
              {project.evidence && (
                <div className="case-evidence">
                  <span>03 · EVIDENCE</span>
                  <div><h4>성과 근거</h4><p>{project.evidence}</p></div>
                </div>
              )}
              {(project.learnings || project.nextTime) && (
                <div className="case-reflection">
                  <span>RETROSPECTIVE</span>
                  <div>{project.learnings && <section><h4>배운 점</h4><p>{project.learnings}</p></section>}{project.nextTime && <section><h4>다시 한다면</h4><p>{project.nextTime}</p></section>}</div>
                </div>
              )}
              {!!project.links.length && (
                <div className="case-resources-wrap">
                  <div><span>PROJECT RESOURCES</span><h4>직접 확인할 수 있는 자료</h4></div>
                  <div className="case-resources">
                    {project.links.map((link) => (
                      <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                        <span><strong>{link.label}</strong><small>{linkHost(link.url)}</small></span><b>↗</b>
                      </a>
                    ))}
                  </div>
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
