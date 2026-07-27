import { NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

export function badRequest(message: string, details?: string[]) {
  return NextResponse.json({ ok: false, message, details }, { status: 400 });
}

export function serverError(error: unknown) {
  console.error(error);
  return NextResponse.json(
    {
      ok: false,
      message: "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    },
    { status: 500 },
  );
}

export async function apiUser() {
  return getCurrentUser();
}
