export type ProjectLink = {
  id?: string;
  label: string;
  url: string;
};

export type CareerEntry = {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
};

export type EducationEntry = {
  id: string;
  school: string;
  major: string;
  period: string;
  description: string;
};

export type PortfolioTheme = "editorial" | "minimal" | "bold" | "noir";

export type Project = {
  id: string;
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
  targetAudience: string;
  goal: string;
  constraints: string;
  keyDecision: string;
  collaboration: string;
  learnings: string;
  nextTime: string;
  evidence: string;
  periodStart: string;
  periodEnd: string;
  teamSize: string;
  contribution: string;
  techStacks: string[];
  architecture: string;
  qualityAssurance: string;
  deployment: string;
  coverImageUrl: string;
  videoUrl: string;
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
  theme: PortfolioTheme;
  experienceLevel: string;
  interests: string;
  strengths: string[];
  coreSkills: string[];
  aboutMe: string;
  workStyle: string;
  values: string;
  lookingFor: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  blogUrl: string;
  careers: CareerEntry[];
  educations: EducationEntry[];
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
  {
    label: "개발 과정",
    complete: Boolean(
      project.architecture.trim() ||
        project.qualityAssurance.trim() ||
        project.deployment.trim(),
    ),
  },
];
