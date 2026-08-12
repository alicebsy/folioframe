import type { ProjectMedia } from "@/lib/models";

export default function ProjectMediaCarousel({
  media,
  title,
  activeIndex = 0,
  mediaBaseHref,
}: {
  media: ProjectMedia[];
  title: string;
  activeIndex?: number;
  mediaBaseHref: string;
}) {
  void mediaBaseHref;
  const safeInitialIndex = media.length ? Math.min(Math.max(activeIndex, 0), media.length - 1) : 0;
  const radioName = `project-media-${title.replace(/[^a-zA-Z0-9가-힣]+/g, "-")}`;

  if (!media.length) {
    return (
      <div className="project-detail-media empty">
        <strong>{title.slice(0, 1)}</strong>
      </div>
    );
  }

  return (
    <div className="project-detail-media-carousel">
      {media.map((item, index) => {
        const previousIndex = (index - 1 + media.length) % media.length;
        const nextIndex = (index + 1) % media.length;
        const inputId = `${radioName}-${index}`;

        return (
          <div className="project-media-frame" key={item.id || `${item.url}-${index}`}>
            <input
              className="project-media-radio"
              type="radio"
              name={radioName}
              id={inputId}
              defaultChecked={index === safeInitialIndex}
            />
            <div className="project-detail-media">
              {item.type === "video" ? (
                <video src={item.url} poster={media.find((entry) => entry.type === "image")?.url || undefined} controls playsInline />
              ) : item.type === "image" ? (
                <img src={item.url} alt={`${title} ${index + 1}번째 미디어`} />
              ) : (
                <strong>{title.slice(0, 1)}</strong>
              )}
              <label className="project-media-nav prev" htmlFor={`${radioName}-${previousIndex}`} aria-label="이전 사진">‹</label>
              <label className="project-media-nav next" htmlFor={`${radioName}-${nextIndex}`} aria-label="다음 사진">›</label>
              <span className="project-media-counter" aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
