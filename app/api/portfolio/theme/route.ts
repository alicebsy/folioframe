import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";
import type { PortfolioTheme } from "@/lib/models";

const themes = new Set<PortfolioTheme>(["editorial", "minimal", "bold", "noir"]);

export async function POST(request: Request) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const body = await request.json();
    const theme = String(body.theme ?? "") as PortfolioTheme;
    if (!themes.has(theme)) return badRequest("지원하지 않는 포트폴리오 테마입니다.");

    await query(
      `UPDATE portfolios SET theme = $1, updated_at = NOW() WHERE owner_id = $2`,
      [theme, user.id],
    );
    return NextResponse.json({ ok: true, theme });
  } catch (error) {
    return serverError(error);
  }
}
