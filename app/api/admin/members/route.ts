import { NextResponse } from "next/server";
import { getAdminMembers } from "@/lib/admin";
import { getCurrentUser } from "@/lib/auth";
import { serverError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.isAdmin) {
      return NextResponse.json({ ok: false, message: "관리자 권한이 필요합니다." }, { status: 403 });
    }
    return NextResponse.json({ ok: true, members: await getAdminMembers() });
  } catch (error) {
    return serverError(error);
  }
}
