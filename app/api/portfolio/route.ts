import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/data";
import { apiUser, serverError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await apiUser();
    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    return NextResponse.json({ ok: true, data: await getDashboardData(user) });
  } catch (error) {
    return serverError(error);
  }
}
