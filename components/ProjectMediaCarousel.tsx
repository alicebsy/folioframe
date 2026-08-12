"use client";

import { useEffect, useState } from "react";
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
}) {
  const initialIndex = media.length ? Math.min(Math.max(activeIndex, 0), media.length - 1) : 0;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const safeIndex = media.length ? Math.min(Math.max(selectedIndex, 0), media.length - 1) : 0;
  const activeMedia = media[safeIndex];
  const selectMedia = (index: number) => {
    if (!media.length) return;
    setSelectedIndex((index + media.length) % media.length);
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
        <button type="button" className="project-media-nav prev" onClick={() => selectMedia(safeIndex - 1)} aria-label="이전 사진">‹</button>
        <button type="button" className="project-media-nav next" onClick={() => selectMedia(safeIndex + 1)} aria-label="다음 사진">›</button>
        <span className="project-media-counter" aria-live="polite">{String(safeIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
      </>}
      {media.length > 1 && (
        <div className="project-media-thumbnails" aria-label="프로젝트 미디어 목록">
          {media.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`project-media-thumbnail ${index === safeIndex ? "is-active" : ""}`}
              onClick={() => selectMedia(index)}
              aria-label={`${index + 1}번째 ${item.type === "video" ? "영상" : "사진"} 보기`}
              aria-pressed={index === safeIndex}
            >
              {item.type === "video" ? <video src={item.url} muted playsInline aria-hidden="true" /> : <span style={{ backgroundImage: `url("${item.url.replaceAll('"', "%22")}")` }} aria-hidden="true" />}
              <small>{String(index + 1).padStart(2, "0")}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
