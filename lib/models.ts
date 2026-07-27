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
  isPublic: boolean;
  displayOrder: number;
  links: ProjectLink[];
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
