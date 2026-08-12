"use client";

import { useState, type MouseEvent } from "react";
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
  const safeInitialIndex = media.length ? Math.min(Math.max(activeIndex, 0), media.length - 1) : 0;
  const [selectedIndex, setSelectedIndex] = useState(safeInitialIndex);
  const safeIndex = media.length ? Math.min(Math.max(selectedIndex, 0), media.length - 1) : 0;
  const activeMedia = media[safeIndex];
  const mediaHref = (index: number) => `${mediaBaseHref}${mediaBaseHref.includes("?") ? "&" : "?"}media=${index}`;
  const changeMedia = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    setSelectedIndex((index + media.length) % media.length);
    window.history.replaceState(null, "", mediaHref((index + media.length) % media.length));
  };

  return (
    <div className={`project-detail-media ${activeMedia ? "has-media" : "empty"}`}>
      {activeMedia?.type === "video" ? (
        <video key={activeMedia.id} src={activeMedia.url} poster={media.find((item) => item.type === "image")?.url || undefined} controls playsInline />
      ) : activeMedia?.type === "image" ? (
        <span role="img" aria-label={`${title} ${safeIndex + 1}번째 미디어`} style={{ backgroundImage: `url("${activeMedia.url.replaceAll('"', "%22")}")` }} />
      ) : (
        <strong>{title.slice(0, 1)}</strong>
      )}
      {media.length > 1 && <>
        <a className="project-media-nav prev" href={mediaHref((safeIndex - 1 + media.length) % media.length)} onClick={(event) => changeMedia(event, safeIndex - 1)} aria-label="이전 사진">‹</a>
        <a className="project-media-nav next" href={mediaHref((safeIndex + 1) % media.length)} onClick={(event) => changeMedia(event, safeIndex + 1)} aria-label="다음 사진">›</a>
        <span className="project-media-counter" aria-live="polite">{String(safeIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
      </>}
    </div>
  );
}
