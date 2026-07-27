import "server-only";
import { query } from "./db";
import type { DashboardData, Portfolio, Project, ProjectLink } from "./models";

type PortfolioRow = {
  id: string;
  name: string;
  job_title: string;
  bio: string;
  contact_email: string | null;
  slug: string;
  is_published: boolean;
  published_at: Date | null;
};

type ProjectRow = {
  id: string;
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
  is_public: boolean;
  display_order: number;
  links: ProjectLink[] | null;
};

function mapPortfolio(row: PortfolioRow): Portfolio {
  return {
    id: row.id,
    name: row.name,
    jobTitle: row.job_title,
    bio: row.bio,
    contactEmail: row.contact_email ?? "",
    slug: row.slug,
    isPublished: row.is_published,
    publishedAt: row.published_at?.toISOString() ?? null,
  };
}

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    role: row.role,
    problem: row.problem,
    troubleshooting: row.troubleshooting,
    result: row.result,
    isPublic: row.is_public,
    displayOrder: row.display_order,
    links: row.links ?? [],
  };
}

const projectSelect = `
  SELECT p.id, p.title, p.summary, p.role, p.problem,
         p.troubleshooting, p.result, p.is_public, p.display_order,
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
  const portfolioResult = await query<PortfolioRow>(
    `SELECT id, name, job_title, bio, contact_email, slug,
            is_published, published_at
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
  const portfolioResult = await query<PortfolioRow & { email: string }>(
    `SELECT p.id, p.name, p.job_title, p.bio, p.contact_email, p.slug,
            p.is_published, p.published_at, u.email
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
