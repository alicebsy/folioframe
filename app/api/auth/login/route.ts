import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { query } from "@/lib/db";
import { badRequest, serverError } from "@/lib/http";

type UserRow = { id: string; password_hash: string };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    const result = await query<UserRow>(
      "SELECT id, password_hash FROM users WHERE email = $1 LIMIT 1",
      [email],
    );
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return badRequest("이메일 또는 비밀번호를 확인해 주세요.");
    }

    await createSession(user.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}
