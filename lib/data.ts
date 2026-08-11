import "server-only";
import { query } from "./db";
import type { CareerEntry, CertificateEntry, DashboardData, EducationEntry, Portfolio, PortfolioTheme, Project, ProjectLink, ProjectMedia } from "./models";

type PortfolioRow = {
  id: string;
  name: string;
  profile_image_url: string;
  job_title: string;
  bio: string;
  contact_email: string | null;
  slug: string;
  is_published: boolean;
  published_at: Date | null;
  theme: PortfolioTheme;
  experience_level: string;
  interests: string;
  strengths: string[] | null;
  core_skills: string[] | null;
  about_me: string;
  work_style: string;
  personal_values: string;
  looking_for: string;
  aspiration: string;
  aspiration_title: string;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  blog_url: string;
  careers: CareerEntry[] | null;
  educations: EducationEntry[] | null;
  certificates: CertificateEntry[] | null;
};

type ProjectRow = {
  id: string;
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
  target_audience: string;
  goal: string;
  constraints: string;
  key_decision: string;
  collaboration: string;
  learnings: string;
  next_time: string;
  evidence: string;
  period_start: string;
  period_end: string;
  team_size: string;
  contribution: string;
  tech_stacks: string[] | null;
  architecture: string;
  quality_assurance: string;
  deployment: string;
  cover_image_url: string;
  video_url: string;
  media: ProjectMedia[] | null;
  is_public: boolean;
  display_order: number;
  links: ProjectLink[] | null;
};

let profileImageColumnReady: Promise<void> | null = null;
let projectMediaColumnReady: Promise<void> | null = null;

async function ensureProfileImageColumn() {
  if (!profileImageColumnReady) {
    profileImageColumnReady = query(
      `ALTER TABLE portfolios
         ADD COLUMN IF NOT EXISTS profile_image_url TEXT NOT NULL DEFAULT '',
         ADD COLUMN IF NOT EXISTS aspiration TEXT NOT NULL DEFAULT '',
         ADD COLUMN IF NOT EXISTS aspiration_title TEXT NOT NULL DEFAULT ''`,
    ).then(() => undefined);
  }
  await profileImageColumnReady;
}

export async function ensureProjectMediaColumn() {
  if (!projectMediaColumnReady) {
    projectMediaColumnReady = query(
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS media JSONB NOT NULL DEFAULT '[]'::jsonb`,
    ).then(() => undefined);
  }
  await projectMediaColumnReady;
}

function mapPortfolio(row: PortfolioRow): Portfolio {
  return {
    id: row.id,
    name: row.name,
    profileImageUrl: row.profile_image_url ?? "",
    jobTitle: row.job_title,
    bio: row.bio,
    contactEmail: row.contact_email ?? "",
    slug: row.slug,
    isPublished: row.is_published,
    publishedAt: row.published_at?.toISOString() ?? null,
    theme: row.theme || "editorial",
    experienceLevel: row.experience_level,
    interests: row.interests,
    strengths: row.strengths ?? [],
    coreSkills: row.core_skills ?? [],
    aboutMe: row.about_me,
    workStyle: row.work_style,
    values: row.personal_values,
    lookingFor: row.looking_for,
    aspiration: row.aspiration ?? "",
    aspirationTitle: row.aspiration_title ?? "",
    resumeUrl: row.resume_url,
    githubUrl: row.github_url,
    linkedinUrl: row.linkedin_url,
    blogUrl: row.blog_url,
    careers: row.careers ?? [],
    educations: row.educations ?? [],
    certificates: row.certificates ?? [],
  };
}

function mapProject(row: ProjectRow): Project {
  const legacyMedia: ProjectMedia[] = [
    ...(row.cover_image_url ? [{ id: "legacy-cover", type: "image" as const, url: row.cover_image_url }] : []),
    ...(row.video_url ? [{ id: "legacy-video", type: "video" as const, url: row.video_url }] : []),
  ];
  const media = [...(row.media ?? []), ...legacyMedia].filter(
    (item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index,
  );
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    role: row.role,
    problem: row.problem,
    troubleshooting: row.troubleshooting,
    result: row.result,
    targetAudience: row.target_audience,
    goal: row.goal,
    constraints: row.constraints,
    keyDecision: row.key_decision,
    collaboration: row.collaboration,
    learnings: row.learnings,
    nextTime: row.next_time,
    evidence: row.evidence,
    periodStart: row.period_start,
    periodEnd: row.period_end,
    teamSize: row.team_size,
    contribution: row.contribution,
    techStacks: row.tech_stacks ?? [],
    architecture: row.architecture,
    qualityAssurance: row.quality_assurance,
    deployment: row.deployment,
    coverImageUrl: row.cover_image_url,
    videoUrl: row.video_url,
    media,
    isPublic: row.is_public,
    displayOrder: row.display_order,
    links: row.links ?? [],
  };
}

const projectSelect = `
  SELECT p.id, p.title, p.summary, p.role, p.problem,
         p.troubleshooting, p.result, p.target_audience, p.goal, p.constraints,
         p.key_decision, p.collaboration, p.learnings, p.next_time,
         p.evidence, p.period_start, p.period_end,
         p.team_size, p.contribution, p.tech_stacks, p.architecture,
         p.quality_assurance, p.deployment, p.cover_image_url, p.video_url, p.media,
         p.is_public, p.display_order,
         COALESCE(
           json_agg(
             json_build_object('id', l.id, 'label', l.label, 'url', l.url)
             ORDER BY l.display_order
           ) FILTER (WHERE l.id IS NOT NULL),
           '[]'
         ) AS links
    FROM projects p
    LEFT JOIN project_links l ON l.project_id = p.id
`;

export async function getDashboardData(
  user: DashboardData["user"],
): Promise<DashboardData> {
  await ensureProfileImageColumn();
  await ensureProjectMediaColumn();
  const portfolioResult = await query<PortfolioRow>(
    `SELECT id, name, profile_image_url, job_title, bio, contact_email, slug,
            is_published, published_at, theme, experience_level, interests, strengths, core_skills,
            about_me, work_style, personal_values, looking_for, aspiration, aspiration_title,
            resume_url, github_url, linkedin_url, blog_url, careers, educations, certificates
       FROM portfolios
      WHERE owner_id = $1
      LIMIT 1`,
    [user.id],
  );

  const portfolioRow = portfolioResult.rows[0];
  if (!portfolioRow) {
    throw new Error("포트폴리오를 찾을 수 없습니다.");
  }

  const projectResult = await query<ProjectRow>(
    `${projectSelect}
      WHERE p.portfolio_id = $1
      GROUP BY p.id
      ORDER BY p.display_order, p.created_at DESC`,
    [portfolioRow.id],
  );

  return {
    user,
    portfolio: mapPortfolio(portfolioRow),
    projects: projectResult.rows.map(mapProject),
  };
}

export async function getPublicPortfolio(slug: string) {
  await ensureProfileImageColumn();
  await ensureProjectMediaColumn();
  const portfolioResult = await query<PortfolioRow & { email: string }>(
    `SELECT p.id, p.name, p.profile_image_url, p.job_title, p.bio, p.contact_email, p.slug,
            p.is_published, p.published_at, p.theme, p.experience_level, p.interests,
            p.strengths, p.core_skills, p.about_me, p.work_style, p.personal_values, p.looking_for, p.aspiration, p.aspiration_title,
            p.resume_url, p.github_url, p.linkedin_url, p.blog_url,
            p.careers, p.educations, p.certificates, u.email
       FROM portfolios p
       JOIN users u ON u.id = p.owner_id
      WHERE p.slug = $1 AND p.is_published = TRUE
      LIMIT 1`,
    [slug],
  );

  const portfolioRow = portfolioResult.rows[0];
  if (!portfolioRow) return null;

  const projectResult = await query<ProjectRow>(
    `${projectSelect}
      WHERE p.portfolio_id = $1 AND p.is_public = TRUE
      GROUP BY p.id
      ORDER BY p.display_order, p.created_at DESC`,
    [portfolioRow.id],
  );

  return {
    portfolio: mapPortfolio(portfolioRow),
    projects: projectResult.rows.map(mapProject),
  };
}
