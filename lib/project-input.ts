import type { ProjectLink } from "./models";

export type ProjectInput = {
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
  evidence: string;
  periodStart: string;
  periodEnd: string;
  teamSize: string;
  contribution: string;
  techStacks: string[];
  coverImageUrl: string;
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
    evidence: String(body.evidence ?? "").trim().slice(0, 500),
    periodStart: normalizeMonth(body.periodStart),
    periodEnd: normalizeMonth(body.periodEnd),
    teamSize: String(body.teamSize ?? "").trim().slice(0, 40),
    contribution: String(body.contribution ?? "").trim().slice(0, 80),
    techStacks: normalizeTechStacks(body.techStacks),
    coverImageUrl: normalizeUrl(body.coverImageUrl),
    isPublic: Boolean(body.isPublic),
    links: normalizeLinks(body.links),
  };
}

function normalizeMonth(value: unknown) {
  const month = String(value ?? "").trim();
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(month) ? month : "";
}

function normalizeUrl(value: unknown) {
  const url = String(value ?? "").trim().slice(0, 500);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function normalizeTechStacks(value: unknown) {
  const items = Array.isArray(value) ? value : String(value ?? "").split(",");
  return Array.from(
    new Set(items.map((item) => String(item).trim().slice(0, 30)).filter(Boolean)),
  ).slice(0, 10);
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
