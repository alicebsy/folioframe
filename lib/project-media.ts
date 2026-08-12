import type { Project, ProjectMedia } from "./models";

export function orderedProjectMedia(project: Pick<Project, "media" | "coverImageUrl" | "videoUrl">): ProjectMedia[] {
  const legacy: ProjectMedia[] = [
    ...(project.coverImageUrl ? [{ id: "legacy-cover", type: "image" as const, url: project.coverImageUrl }] : []),
    ...(project.videoUrl ? [{ id: "legacy-video", type: "video" as const, url: project.videoUrl }] : []),
  ];
  const media = [...(project.media ?? []), ...legacy].filter(
    (item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index,
  );
  if (!project.coverImageUrl) return media;
  const coverIndex = media.findIndex((item) => item.url === project.coverImageUrl);
  if (coverIndex <= 0) return media;
  return [media[coverIndex], ...media.slice(0, coverIndex), ...media.slice(coverIndex + 1)];
}
