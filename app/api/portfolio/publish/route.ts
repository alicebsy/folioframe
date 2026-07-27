import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";

type PublishRow = {
  name: string;
  job_title: string;
  bio: string;
  slug: string;
  public_count: number;
  incomplete_titles: string[] | null;
};

export async function POST() {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const result = await query<PublishRow>(
      `SELECT f.name, f.job_title, f.bio, f.slug,
              COUNT(p.id) FILTER (WHERE p.is_public)::int AS public_count,
              ARRAY_AGG(p.title) FILTER (
                WHERE p.is_public AND (
                  p.title='' OR p.summary='' OR p.role='' OR p.problem='' OR
                  p.troubleshooting='' OR p.result=''
                )
              ) AS incomplete_titles
         FROM portfolios f
         LEFT JOIN projects p ON p.portfolio_id = f.id
        WHERE f.owner_id = $1
        GROUP BY f.id`,
      [user.id],
    );
    const portfolio = result.rows[0];
    if (!portfolio) return badRequest("포트폴리오를 찾을 수 없습니다.");

    const details: string[] = [];
    if (!portfolio.name || !portfolio.job_title || !portfolio.bio) {
      details.push("프로필의 이름, 희망 직무, 한 줄 소개를 완성해 주세요.");
    }
    if (!portfolio.public_count) {
      details.push("공개 프로젝트를 1개 이상 선택해 주세요.");
    }
    for (const title of portfolio.incomplete_titles ?? []) {
      details.push(`“${title}”의 필수 내용을 완성해 주세요.`);
    }
    if (details.length) {
      return badRequest("포트폴리오를 발행할 수 없습니다.", details);
    }

    await query(
      `UPDATE portfolios
          SET is_published = TRUE, published_at = NOW(), updated_at = NOW()
        WHERE owner_id = $1`,
      [user.id],
    );

    return NextResponse.json({
      ok: true,
      url: `/p/${portfolio.slug}`,
    });
  } catch (error) {
    return serverError(error);
  }
}
