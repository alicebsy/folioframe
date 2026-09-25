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
    const body = await request.json();
    const { isPublic } = body;
    const portfolioId = String(body.portfolioId ?? "");
    if (!portfolioId) return badRequest("포트폴리오 버전을 확인해 주세요.");

    const result = await query<ProjectRow>(
      `SELECT p.title, p.summary, p.role, p.problem, p.troubleshooting, p.result
         FROM projects p
         JOIN portfolios f ON f.id = p.portfolio_id
        WHERE p.id = $1 AND f.owner_id = $2 AND f.id = $3`,
      [id, user.id, portfolioId],
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
       WHERE p.id = $2 AND p.portfolio_id = f.id AND f.owner_id = $3 AND f.id = $4`,
      [Boolean(isPublic), id, user.id, portfolioId],
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
