import { NextResponse } from "next/server";
import { getPublicPortfolio } from "@/lib/data";
import { serverError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const data = await getPublicPortfolio(slug);
    if (!data) return NextResponse.json({ ok: false }, { status: 404 });
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return serverError(error);
  }
}
