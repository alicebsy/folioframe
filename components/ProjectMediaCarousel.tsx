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
  const safeIndex = media.length ? Math.min(Math.max(activeIndex, 0), media.length - 1) : 0;
  const mediaId = (index: number) => `project-media-${index}`;

  return (
    <div className={`project-detail-media ${media.length ? "has-media" : "empty"}`}>
      {media.length ? media.map((item, index) => {
        const previousIndex = (index - 1 + media.length) % media.length;
        const nextIndex = (index + 1) % media.length;
        return (
          <div className="project-media-slide" key={item.id}>
            <input className="project-media-radio" id={mediaId(index)} type="radio" name="project-media" defaultChecked={index === safeIndex} />
            {item.type === "video" ? (
              <video src={item.url} poster={media.find((candidate) => candidate.type === "image")?.url || undefined} controls playsInline />
            ) : (
              <span role="img" aria-label={`${title} ${index + 1}번째 미디어`} style={{ backgroundImage: `url("${item.url.replaceAll('"', "%22")}")` }} />
            )}
            {media.length > 1 && <>
              <label className="project-media-nav prev" htmlFor={mediaId(previousIndex)} aria-label="이전 사진">‹</label>
              <label className="project-media-nav next" htmlFor={mediaId(nextIndex)} aria-label="다음 사진">›</label>
              <span className="project-media-counter">{String(index + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
            </>}
          </div>
        );
      }) : <strong>{title.slice(0, 1)}</strong>}
    </div>
  );
}
