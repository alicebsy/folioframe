import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await query("SELECT 1");
    return NextResponse.json({
      ok: true,
      service: "folioframe",
      database: "connected",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        service: "folioframe",
        database: "unavailable",
      },
      { status: 503 },
    );
  }
}
