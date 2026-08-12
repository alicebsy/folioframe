import { NextResponse } from "next/server";
import { transaction } from "@/lib/db";
import { ensureFeaturedColumns, ensureProjectMediaColumn } from "@/lib/data";
import { apiUser, serverError } from "@/lib/http";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await apiUser();
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const isFeatured = Boolean(body.isFeatured);
    await ensureProjectMediaColumn();
    await ensureFeaturedColumns();

    const updated = await transaction(async (client) => {
      const result = await client.query(
        `UPDATE projects p
            SET is_featured = $1, updated_at = NOW()
           FROM portfolios f
          WHERE p.id = $2 AND p.portfolio_id = f.id AND f.owner_id = $3
          RETURNING p.portfolio_id`,
        [isFeatured, id, user.id],
      );
      if (!result.rowCount) return false;
      await client.query(
        `UPDATE portfolios SET featured_configured = TRUE, updated_at = NOW()
          WHERE id = $1`,
        [result.rows[0].portfolio_id],
      );
      return true;
    });

    if (!updated) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
