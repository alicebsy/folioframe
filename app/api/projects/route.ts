import { NextResponse } from "next/server";
import { query, transaction } from "@/lib/db";
import { getDashboardData } from "@/lib/data";
import { apiUser, badRequest, serverError } from "@/lib/http";
import { missingProjectFields, parseProjectInput } from "@/lib/project-input";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });
    const data = await getDashboardData(user);
    return NextResponse.json({ ok: true, projects: data.projects });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const input = parseProjectInput(await request.json());
    if (!input.title) return badRequest("프로젝트명을 입력해 주세요.");
    if (input.isPublic && missingProjectFields(input).length) {
      return badRequest("미완성 프로젝트는 공개할 수 없습니다.");
    }

    const portfolioResult = await query<{ id: string }>(
      "SELECT id FROM portfolios WHERE owner_id = $1 LIMIT 1",
      [user.id],
    );
    const portfolioId = portfolioResult.rows[0]?.id;
    if (!portfolioId) return badRequest("포트폴리오를 찾을 수 없습니다.");

    const projectId = await transaction(async (client) => {
      const orderResult = await client.query<{ next_order: number }>(
        `SELECT COALESCE(MAX(display_order), -1) + 1 AS next_order
           FROM projects WHERE portfolio_id = $1`,
        [portfolioId],
      );
      const result = await client.query<{ id: string }>(
        `INSERT INTO projects (
           portfolio_id, title, summary, role, problem, troubleshooting,
           result, evidence, period_start, period_end, team_size, contribution,
           tech_stacks, cover_image_url, is_public, display_order
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
         RETURNING id`,
        [
          portfolioId,
          input.title,
          input.summary,
          input.role,
          input.problem,
          input.troubleshooting,
          input.result,
          input.evidence,
          input.periodStart,
          input.periodEnd,
          input.teamSize,
          input.contribution,
          input.techStacks,
          input.coverImageUrl,
          input.isPublic,
          orderResult.rows[0].next_order,
        ],
      );
      const id = result.rows[0].id;
      for (const [index, link] of input.links.entries()) {
        await client.query(
          `INSERT INTO project_links (project_id, label, url, display_order)
           VALUES ($1, $2, $3, $4)`,
          [id, link.label, link.url, index],
        );
      }
      return id;
    });

    return NextResponse.json({ ok: true, id: projectId });
  } catch (error) {
    return serverError(error);
  }
}
