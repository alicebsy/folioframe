import type { ProjectLink } from "./models";

export type ProjectInput = {
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
  isPublic: boolean;
  links: ProjectLink[];
};

export function parseProjectInput(body: Record<string, unknown>): ProjectInput {
  return {
    title: String(body.title ?? "").trim().slice(0, 60),
    summary: String(body.summary ?? "").trim().slice(0, 500),
    role: String(body.role ?? "").trim().slice(0, 500),
    problem: String(body.problem ?? "").trim().slice(0, 500),
    troubleshooting: String(body.troubleshooting ?? "").trim().slice(0, 1000),
    result: String(body.result ?? "").trim().slice(0, 500),
    isPublic: Boolean(body.isPublic),
    links: normalizeLinks(body.links),
  };
}

function normalizeLinks(value: unknown): ProjectLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 5)
    .map((link) => ({
      label: String(link?.label ?? "").trim().slice(0, 40),
      url: String(link?.url ?? "").trim().slice(0, 500),
    }))
    .filter((link) => {
      if (!link.label || !link.url) return false;
      try {
        const parsed = new URL(link.url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    });
}

export function missingProjectFields(input: ProjectInput) {
  const labels: Array<[keyof ProjectInput, string]> = [
    ["title", "프로젝트명"],
    ["summary", "프로젝트 개요"],
    ["role", "담당 역할"],
    ["problem", "문제 상황"],
    ["troubleshooting", "해결 과정"],
    ["result", "구체적 성과"],
  ];
  return labels.filter(([key]) => !String(input[key]).trim()).map(([, label]) => label);
}
