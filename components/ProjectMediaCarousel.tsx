"use client";

import { useState } from "react";
import type { ProjectMedia } from "@/lib/models";

export default function ProjectMediaCarousel({ media, title }: { media: ProjectMedia[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];
  const move = (direction: -1 | 1) => setActiveIndex((current) => (current + direction + media.length) % media.length);

  return (
    <div className={`project-detail-media ${activeMedia ? "has-media" : "empty"}`}>
      {activeMedia?.type === "video" ? (
        <video key={activeMedia.id} src={activeMedia.url} poster={media.find((item) => item.type === "image")?.url || undefined} controls playsInline />
      ) : activeMedia?.type === "image" ? (
        <span role="img" aria-label={`${title} ${activeIndex + 1}번째 미디어`} style={{ backgroundImage: `url("${activeMedia.url.replaceAll('"', "%22")}")` }} />
      ) : (
        <strong>{title.slice(0, 1)}</strong>
      )}
      {media.length > 1 && <>
        <button className="project-media-nav prev" type="button" onClick={() => move(-1)} aria-label="이전 사진">‹</button>
        <button className="project-media-nav next" type="button" onClick={() => move(1)} aria-label="다음 사진">›</button>
        <span className="project-media-counter" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
      </>}
    </div>
  );
}
