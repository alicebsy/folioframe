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
    const portfolioId = String(body.portfolioId ?? "");
    const theme = String(body.theme ?? "") as PortfolioTheme;
    if (!themes.has(theme)) return badRequest("지원하지 않는 포트폴리오 테마입니다.");
    if (!portfolioId) return badRequest("포트폴리오 버전을 확인해 주세요.");

    const updated = await query(
      `UPDATE portfolios SET theme = $1, updated_at = NOW() WHERE id = $2 AND owner_id = $3`,
      [theme, portfolioId, user.id],
    );
    if (!updated.rowCount) return NextResponse.json({ ok: false, message: "포트폴리오를 찾을 수 없습니다." }, { status: 404 });
    return NextResponse.json({ ok: true, theme });
  } catch (error) {
    return serverError(error);
  }
}
