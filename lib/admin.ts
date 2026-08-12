import "server-only";
import { query } from "./db";

export type AdminMember = {
  id: string;
  email: string;
  createdAt: string;
  portfolioName: string;
  slug: string;
  isPublished: boolean;
  projectCount: number;
  updatedAt: string | null;
};

export async function getAdminMembers(): Promise<AdminMember[]> {
  const result = await query<{
    id: string;
    email: string;
    created_at: Date;
    portfolio_name: string | null;
    slug: string | null;
    is_published: boolean | null;
    project_count: string;
    updated_at: Date | null;
  }>(
    `SELECT u.id, u.email, u.created_at,
            p.name AS portfolio_name, p.slug, p.is_published, p.updated_at,
            COUNT(pr.id)::text AS project_count
       FROM users u
       LEFT JOIN portfolios p ON p.owner_id = u.id
       LEFT JOIN projects pr ON pr.portfolio_id = p.id
      GROUP BY u.id, p.id
      ORDER BY u.created_at DESC`,
  );

  return result.rows.map((row) => ({
    id: row.id,
    email: row.email,
    createdAt: row.created_at.toISOString(),
    portfolioName: row.portfolio_name ?? "아직 프로필을 작성하지 않았어요",
    slug: row.slug ?? "",
    isPublished: Boolean(row.is_published),
    projectCount: Number(row.project_count),
    updatedAt: row.updated_at?.toISOString() ?? null,
  }));
}
