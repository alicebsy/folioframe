import type { Portfolio, Project } from "@/lib/models";
import ProjectMediaCarousel from "./ProjectMediaCarousel";
import { orderedProjectMedia } from "@/lib/project-media";

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

export default function PublicProjectDetail({
  portfolio,
  project,
  backHref,
  mediaIndex,
}: {
  portfolio: Portfolio;
  project: Project;
  backHref: string;
  mediaIndex?: number;
}) {
  const media = orderedProjectMedia(project);

  return (
    <main className={`public-shell project-detail-shell theme-${portfolio.theme}`} data-portfolio-theme={portfolio.theme}>
      <nav className="public-nav">
        <a className="brand" href={backHref}><span className="brand-mark">✦</span><span>{portfolio.name}</span></a>
        <a className="project-back-link" href={backHref}>← 포트폴리오로 돌아가기</a>
      </nav>

      <section className="portfolio-projects project-detail-page">
        <div className="project-detail-intro">
          <span>PROJECT CASE STUDY</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-facts">
            {formatPeriod(project.periodStart, project.periodEnd) && <span><b>기간</b>{formatPeriod(project.periodStart, project.periodEnd)}</span>}
            {project.teamSize && <span><b>인원</b>{project.teamSize}</span>}
            {project.contribution && <span><b>기여</b>{project.contribution}</span>}
          </div>
          {!!project.techStacks.length && <div className="project-showcase-tags detail-tech-tags">{project.techStacks.map((tech) => <span key={tech}>{tech}</span>)}</div>}
        </div>

        <ProjectMediaCarousel media={media} title={project.title} activeIndex={mediaIndex} />

        <div className="project-detail-content">
          <div className="case-scan-grid">
            <section>
              <span>MY CONTRIBUTION</span><h4>내가 맡은 일</h4>
              <strong>{project.contribution || project.role}</strong>
              {project.contribution && <p>{project.role}</p>}
            </section>
            <section className="impact-card">
              <span>KEY RESULT</span><h4>대표 성과</h4><strong>{project.result}</strong>
            </section>
          </div>

          <div className="case-detail-heading"><span>HOW I WORKED</span><h4>문제에서 해결까지</h4></div>
          <div className="case-story focused-case-story">
            <section><span>01 · CONTEXT</span><h4>대상과 목표</h4><p>{project.targetAudience || project.summary}</p>{project.goal && <small>{project.goal}</small>}</section>
            <section><span>02 · CHALLENGE</span><h4>문제와 제약</h4><p>{project.problem}</p>{project.constraints && <small>{project.constraints}</small>}</section>
            <section><span>03 · DECISION</span><h4>판단과 실행</h4><p>{project.keyDecision || project.troubleshooting}</p>{project.keyDecision && <small>{project.troubleshooting}</small>}</section>
            <section><span>04 · COLLABORATION</span><h4>협업 방식</h4><p>{project.collaboration || "개인 프로젝트"}</p></section>
          </div>

          {(project.architecture || project.qualityAssurance || project.deployment) && (
            <section className="engineering-notes">
              <div className="engineering-notes-heading"><span>ENGINEERING NOTES</span><h4>구현부터 운영까지</h4></div>
              <div className="engineering-notes-grid">
                {project.architecture && <article><span>01</span><h5>아키텍처와 기술 선택</h5><p>{project.architecture}</p></article>}
                {project.qualityAssurance && <article><span>02</span><h5>테스트와 품질</h5><p>{project.qualityAssurance}</p></article>}
                {project.deployment && <article><span>03</span><h5>배포와 운영</h5><p>{project.deployment}</p></article>}
              </div>
            </section>
          )}

          {project.evidence && <div className="case-evidence"><span>EVIDENCE</span><div><h4>성과 근거</h4><p>{project.evidence}</p></div></div>}
          {(project.learnings || project.nextTime) && (
            <div className="case-reflection"><span>RETROSPECTIVE</span><div>{project.learnings && <section><h4>배운 점</h4><p>{project.learnings}</p></section>}{project.nextTime && <section><h4>다시 한다면</h4><p>{project.nextTime}</p></section>}</div></div>
          )}
          {!!project.links.length && (
            <div className="case-resources-wrap">
              <div><span>PROJECT RESOURCES</span><h4>직접 확인할 수 있는 자료</h4></div>
              <div className="case-resources">{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span><strong>{link.label}</strong><small>{linkHost(link.url)}</small></span><b>↗</b></a>)}</div>
            </div>
          )}
        </div>
      </section>

      <footer className="public-footer project-detail-footer"><a href={backHref}>← {portfolio.name}의 포트폴리오</a><small>Made with Folioframe</small></footer>
    </main>
  );
}
