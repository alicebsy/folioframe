import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";
import { transaction } from "@/lib/db";
import { badRequest, serverError } from "@/lib/http";

function baseSlug(email: string) {
  return (
    email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "portfolio"
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return badRequest("올바른 이메일을 입력해 주세요.");
    }
    if (password.length < 8) {
      return badRequest("비밀번호는 8자 이상이어야 합니다.");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userId = await transaction(async (client) => {
      const userResult = await client.query<{ id: string }>(
        `INSERT INTO users (email, password_hash)
         VALUES ($1, $2)
         RETURNING id`,
        [email, passwordHash],
      );
      const id = userResult.rows[0].id;
      const suffix = crypto.randomUUID().slice(0, 6);
      await client.query(
        `INSERT INTO portfolios (owner_id, contact_email, slug)
         VALUES ($1, $2, $3)`,
        [id, email, `${baseSlug(email)}-${suffix}`],
      );
      return id;
    });

    await createSession(userId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "23505"
    ) {
      return badRequest("이미 가입된 이메일입니다.");
    }
    return serverError(error);
  }
}
