import { NextResponse } from "next/server";
import { transaction } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";
import { missingProjectFields, parseProjectInput } from "@/lib/project-input";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const { id } = await params;
    const input = parseProjectInput(await request.json());
    if (!input.title) return badRequest("프로젝트명을 입력해 주세요.");
    if (input.isPublic && missingProjectFields(input).length) {
      return badRequest("미완성 프로젝트는 공개할 수 없습니다.");
    }

    const updated = await transaction(async (client) => {
      const result = await client.query(
        `UPDATE projects p
            SET title=$1, summary=$2, role=$3, problem=$4,
                troubleshooting=$5, result=$6, evidence=$7, period_start=$8,
                period_end=$9, team_size=$10, contribution=$11, tech_stacks=$12,
                cover_image_url=$13, is_public=$14, updated_at=NOW()
           FROM portfolios f
          WHERE p.id=$15 AND p.portfolio_id=f.id AND f.owner_id=$16
          RETURNING p.id`,
        [
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
          id,
          user.id,
        ],
      );
      if (!result.rowCount) return false;
      await client.query("DELETE FROM project_links WHERE project_id = $1", [id]);
      for (const [index, link] of input.links.entries()) {
        await client.query(
          `INSERT INTO project_links (project_id, label, url, display_order)
           VALUES ($1, $2, $3, $4)`,
          [id, link.label, link.url, index],
        );
      }
      return true;
    });

    if (!updated) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
