import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getDashboardData } from "@/lib/data";
import { apiUser, serverError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await apiUser();
    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const portfolioId = new URL(request.url).searchParams.get("portfolioId");
    if (portfolioId) {
      const ownedPortfolio = await query(
        "SELECT id FROM portfolios WHERE id = $1 AND owner_id = $2 LIMIT 1",
        [portfolioId, user.id],
      );
      if (!ownedPortfolio.rowCount) {
        return NextResponse.json({ ok: false, message: "포트폴리오를 찾을 수 없습니다." }, { status: 404 });
      }
    }
    return NextResponse.json({ ok: true, data: await getDashboardData(user, portfolioId) });
  } catch (error) {
    return serverError(error);
  }
}
