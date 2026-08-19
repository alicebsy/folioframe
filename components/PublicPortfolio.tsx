import type { Portfolio, Project } from "@/lib/models";
import PdfExportButton from "./PdfExportButton";
import { orderedProjectMedia } from "@/lib/project-media";
import { projectPeriod } from "@/lib/project-period";
import { RichText } from "@/lib/rich-text";

function formatPeriod(start: string, end: string) {
  const format = (value: string) => value.replace("-", ".");
  if (!start && !end) return "";
  return `${start ? format(start) : "시작일 미입력"} – ${end ? format(end) : "진행 중"}`;
}

export default function PublicPortfolio({
  data,
  projectBasePath,
}: {
  data: { portfolio: Portfolio; projects: Project[] };
  projectBasePath: string;
}) {
  const { portfolio, projects } = data;
  const featuredProjects = projects.filter((project) => project.isFeatured);
  const featuredIds = new Set(featuredProjects.map((project) => project.id));
  const moreProjects = projects.filter((project) => !featuredIds.has(project.id));

  return (
    <main className={`public-shell theme-${portfolio.theme}`} data-portfolio-theme={portfolio.theme}>
      <nav className="public-nav">
        <span className="brand">
          <span className="brand-mark">✦</span>
          <span>Folioframe</span>
        </span>
        <div className="public-nav-right">
          <PdfExportButton />
          <span className="slug-badge">/p/{portfolio.slug}</span>
        </div>
      </nav>

      <header className="portfolio-hero">
        <span className="portfolio-kicker">PORTFOLIO · 2026</span>
        <div className="hero-grid">
          <div>
            <h1>안녕하세요,<br /><span>{portfolio.name}</span>입니다.</h1>
            <p><RichText value={portfolio.bio} /></p>
            <div className="candidate-summary">
              {portfolio.experienceLevel && <span>{portfolio.experienceLevel}</span>}
              {portfolio.strengths.map((strength) => <b key={strength}>{strength}</b>)}
            </div>
            {portfolio.interests && <p className="candidate-interests"><strong>관심 분야</strong>{portfolio.interests}</p>}
            {!!portfolio.coreSkills.length && (
              <div className="developer-stack" aria-label="주력 기술 스택">
                <span>CORE STACK</span>
                <div>{portfolio.coreSkills.map((skill) => <b key={skill}>{skill}</b>)}</div>
              </div>
            )}
          </div>
          <div className="hero-side">
            <div
              className={`large-avatar ${portfolio.profileImageUrl ? "has-image" : ""}`}
            >
              {portfolio.profileImageUrl ? (
                <img className="large-avatar-image" src={portfolio.profileImageUrl} alt={`${portfolio.name} 프로필 사진`} />
              ) : portfolio.name.slice(0, 1)}
            </div>
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

      <div className="portfolio-motion-band" aria-hidden="true">
        <div>
          <span>BUILD WITH INTENT</span><i>✦</i><span>SHIP WITH CONFIDENCE</span><i>✦</i><span>LEARN IN PUBLIC</span><i>✦</i>
          <span>BUILD WITH INTENT</span><i>✦</i><span>SHIP WITH CONFIDENCE</span><i>✦</i><span>LEARN IN PUBLIC</span><i>✦</i>
        </div>
      </div>

      {(portfolio.aboutMe || portfolio.workStyle || portfolio.values || portfolio.lookingFor) && (
        <section className="identity-section">
          <div className="identity-heading">
            <span>ABOUT ME</span>
            <h2>프로젝트 너머의<br className="identity-title-break" />{" "}저를 소개합니다.</h2>
          </div>
          <div className="identity-content">
            {portfolio.aboutMe && <div className="identity-lead"><RichText value={portfolio.aboutMe} /></div>}
            <div className="identity-grid">
              {portfolio.workStyle && <article><span>01</span><h3>일하는 방식</h3><p><RichText value={portfolio.workStyle} /></p></article>}
              {portfolio.values && <article><span>02</span><h3>중요하게 생각하는 가치</h3><p><RichText value={portfolio.values} /></p></article>}
              {portfolio.lookingFor && <article><span>03</span><h3>앞으로의 방향</h3><p><RichText value={portfolio.lookingFor} /></p></article>}
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
                <div>
                  <div className="career-entry-heading">
                    <h3>{entry.organization}</h3>
                    {entry.role && <strong>{entry.role}</strong>}
                  </div>
                  <p><RichText value={entry.description} /></p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!!portfolio.educations.length && (
        <section className="education-section">
          <div className="career-section-title"><span>EDUCATION</span><h2>학력과 배움</h2></div>
          <div className="career-timeline">
            {portfolio.educations.map((entry) => (
              <article key={entry.id}>
                <span>{entry.period || "기간 미입력"}</span>
                <div>
                  <div className="career-entry-heading">
                    <h3>{entry.school}</h3>
                    {entry.major && <strong>{entry.major}</strong>}
                  </div>
                  <p><RichText value={entry.description} /></p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!!portfolio.certificates.length && (
        <section className="certificate-section">
          <div className="career-section-title"><span>CERTIFICATIONS</span><h2>자격과 인증</h2></div>
          <div className="certificate-grid">
            {portfolio.certificates.map((entry, index) => {
              const content = (
                <>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{entry.name}</h3><p>{entry.issuer}</p></div>
                  <time>{entry.issuedAt || "취득일 미입력"}</time>
                  {entry.credentialUrl && <b>검증 ↗</b>}
                </>
              );
              return entry.credentialUrl ? (
                <a key={entry.id} href={entry.credentialUrl} target="_blank" rel="noreferrer">{content}</a>
              ) : <article key={entry.id}>{content}</article>;
            })}
          </div>
        </section>
      )}

      <section className="portfolio-projects project-showcase-section">
        {!!featuredProjects.length && <div className="portfolio-section-title">
          <span>SELECTED WORK</span>
          <h2>대표 프로젝트</h2>
          <p>{String(featuredProjects.length).padStart(2, "0")} FEATURED</p>
        </div>}

        {!!featuredProjects.length && <div className="project-showcase-grid featured-project-grid">
          {featuredProjects.map((project, index) => {
            const href = `${projectBasePath}/${project.id}${projectBasePath.startsWith("/portfolio-preview") ? `?theme=${portfolio.theme}` : ""}`;
            const media = orderedProjectMedia(project);
            const heroMedia = media[0];
            return (
              <article className="project-showcase-card" key={project.id}>
                <a className="project-showcase-media" href={href} aria-label={`${project.title} 상세 보기`}>
                  {heroMedia?.type === "video" ? (
                    <video src={heroMedia.url} poster={media.find((item) => item.type === "image")?.url || undefined} autoPlay muted loop playsInline />
                  ) : heroMedia?.type === "image" ? (
                    <span className="project-showcase-image" style={{ backgroundImage: `url("${heroMedia.url.replaceAll('"', "%22")}")` }} />
                  ) : (
                    <span className="project-showcase-placeholder">{project.title.slice(0, 1)}</span>
                  )}
                  <span className="project-showcase-action">PROJECT DETAIL <b>↗</b></span>
                </a>
                <div className="project-showcase-copy">
                  <div className="project-showcase-meta">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {(() => { const period = projectPeriod(project); return formatPeriod(period.start, period.end) && <span>{formatPeriod(period.start, period.end)}</span>; })()}
                    {project.contribution && <span>{project.contribution}</span>}
                  </div>
                  <h3><a href={href}>{project.title}</a></h3>
                  <p><RichText value={project.summary} /></p>
                  {!!project.techStacks.length && <div className="project-showcase-tags">{project.techStacks.map((tech) => <span key={tech}>{tech}</span>)}</div>}
                  <a className="project-detail-link" href={href}>프로젝트 자세히 보기 <span>→</span></a>
                </div>
              </article>
            );
          })}
        </div>}
        {!!moreProjects.length && <>
          <div className="portfolio-section-title more-projects-title">
            <span>MORE WORK</span>
            <h2>그 외 프로젝트</h2>
            <p>{String(moreProjects.length).padStart(2, "0")} PROJECTS</p>
          </div>
          <div className="project-showcase-grid more-project-grid">
            {moreProjects.map((project, index) => {
              const href = `${projectBasePath}/${project.id}${projectBasePath.startsWith("/portfolio-preview") ? `?theme=${portfolio.theme}` : ""}`;
              const media = orderedProjectMedia(project);
              const heroMedia = media[0];
              return (
                <article className="project-showcase-card" key={project.id}>
                  <a className="project-showcase-media" href={href} aria-label={`${project.title} 상세 보기`}>
                    {heroMedia?.type === "video" ? (
                      <video src={heroMedia.url} poster={media.find((item) => item.type === "image")?.url || undefined} autoPlay muted loop playsInline />
                    ) : heroMedia?.type === "image" ? (
                      <span className="project-showcase-image" style={{ backgroundImage: `url("${heroMedia.url.replaceAll('"', "%22")}")` }} />
                    ) : (
                      <span className="project-showcase-placeholder">{project.title.slice(0, 1)}</span>
                    )}
                    <span className="project-showcase-action">PROJECT DETAIL <b>↗</b></span>
                  </a>
                  <div className="project-showcase-copy">
                    <div className="project-showcase-meta">
                      <span>{String(featuredProjects.length + index + 1).padStart(2, "0")}</span>
                      {(() => { const period = projectPeriod(project); return formatPeriod(period.start, period.end) && <span>{formatPeriod(period.start, period.end)}</span>; })()}
                      {project.contribution && <span>{project.contribution}</span>}
                    </div>
                    <h3><a href={href}>{project.title}</a></h3>
                  <p><RichText value={project.summary} /></p>
                    {!!project.techStacks.length && <div className="project-showcase-tags">{project.techStacks.map((tech) => <span key={tech}>{tech}</span>)}</div>}
                    <a className="project-detail-link" href={href}>프로젝트 자세히 보기 <span>→</span></a>
                  </div>
                </article>
              );
            })}
          </div>
        </>}
      </section>

      {(portfolio.aspirationTitle || portfolio.aspiration) && (
        <section className="aspiration-section">
          <div className="aspiration-inner">
            <span>CLOSING NOTE</span>
            <h2>{portfolio.aspirationTitle || "함께 더 나은 제품을 만들고 싶습니다."}</h2>
            {portfolio.aspiration && <p><RichText value={portfolio.aspiration} /></p>}
          </div>
        </section>
      )}

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
