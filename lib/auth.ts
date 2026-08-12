import "server-only";
import { createHmac, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "./db";

const COOKIE_NAME = "folioframe_session";
const SESSION_DAYS = 30;

export type AuthUser = {
  id: string;
  email: string;
  isAdmin: boolean;
};

let adminColumnReady: Promise<void> | null = null;

async function ensureAdminColumn() {
  if (!adminColumnReady) {
    adminColumnReady = query(
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE",
    ).then(() => undefined);
  }
  await adminColumnReady;
}

function isConfiguredAdmin(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(adminEmail && email.toLowerCase() === adminEmail);
}

function hashToken(token: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET은 32자 이상이어야 합니다.");
  }
  return createHmac("sha256", secret).update(token).digest("hex");
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  );

  await query(
    `INSERT INTO sessions (token_hash, user_id, expires_at)
     VALUES ($1, $2, $3)`,
    [tokenHash, userId, expiresAt],
  );

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  await ensureAdminColumn();
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const result = await query<{ id: string; email: string; is_admin: boolean }>(
    `SELECT u.id, u.email, u.is_admin
       FROM sessions s
       JOIN users u ON u.id = s.user_id
      WHERE s.token_hash = $1
        AND s.expires_at > NOW()
      LIMIT 1`,
    [hashToken(token)],
  );

  const user = result.rows[0];
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    isAdmin: Boolean(user.is_admin) || isConfiguredAdmin(user.email),
  };
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!user.isAdmin) redirect("/dashboard");
  return user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
  }
  cookieStore.delete(COOKIE_NAME);
}
