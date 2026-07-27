import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";

type ProjectRow = {
  title: string;
  summary: string;
  role: string;
  problem: string;
  troubleshooting: string;
  result: string;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });
    const { id } = await params;
    const { isPublic } = await request.json();

    const result = await query<ProjectRow>(
      `SELECT p.title, p.summary, p.role, p.problem, p.troubleshooting, p.result
         FROM projects p
         JOIN portfolios f ON f.id = p.portfolio_id
        WHERE p.id = $1 AND f.owner_id = $2`,
      [id, user.id],
    );
    const project = result.rows[0];
    if (!project) return NextResponse.json({ ok: false }, { status: 404 });
    if (
      isPublic &&
      Object.values(project).some((value) => !String(value).trim())
    ) {
      return badRequest("미완성 프로젝트는 공개할 수 없습니다.");
    }

    await query(
      `UPDATE projects p SET is_public = $1, updated_at = NOW()
        FROM portfolios f
       WHERE p.id = $2 AND p.portfolio_id = f.id AND f.owner_id = $3`,
      [Boolean(isPublic), id, user.id],
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
