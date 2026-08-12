import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, serverError } from "@/lib/http";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const { id } = await params;
    const result = await query(
      `DELETE FROM projects p
        USING portfolios f
       WHERE p.id = $1 AND p.portfolio_id = f.id AND f.owner_id = $2`,
      [id, user.id],
    );

    if (!result.rowCount) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
