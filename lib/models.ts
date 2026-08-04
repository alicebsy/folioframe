export type ProjectLink = {
  id?: string;
  label: string;
  url: string;
};

export type Project = {
  id: string;
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
  displayOrder: number;
  links: ProjectLink[];
};

export type ProjectQualityCheck = {
  label: string;
  complete: boolean;
};

export type Portfolio = {
  id: string;
  name: string;
  jobTitle: string;
  bio: string;
  contactEmail: string;
  slug: string;
  isPublished: boolean;
  publishedAt: string | null;
};

export type DashboardData = {
  user: { id: string; email: string };
  portfolio: Portfolio;
  projects: Project[];
};

export const projectIsComplete = (project: Omit<Project, "id" | "displayOrder">) =>
  Boolean(
    project.title.trim() &&
      project.summary.trim() &&
      project.role.trim() &&
      project.problem.trim() &&
      project.troubleshooting.trim() &&
      project.result.trim(),
  );

export const projectQualityChecks = (
  project: Omit<Project, "id" | "displayOrder">,
): ProjectQualityCheck[] => [
  { label: "목적과 배경", complete: Boolean(project.summary.trim()) },
  {
    label: "역할과 기여 범위",
    complete: Boolean(project.role.trim() && project.contribution.trim()),
  },
  {
    label: "문제와 선택 과정",
    complete: Boolean(project.problem.trim() && project.troubleshooting.trim()),
  },
  {
    label: "성과와 근거",
    complete: Boolean(
      project.result.trim() && (project.evidence.trim() || project.links.length),
    ),
  },
  {
    label: "기간·인원·기술",
    complete: Boolean(
      project.periodStart.trim() &&
        project.teamSize.trim() &&
        project.techStacks.some((tech) => tech.trim()),
    ),
  },
];
