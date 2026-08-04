import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";
import type { CareerEntry } from "@/lib/models";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

function normalizeUrl(value: unknown) {
  const url = String(value ?? "").trim().slice(0, 500);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function normalizeCareers(value: unknown): CareerEntry[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).map((entry, index) => ({
    id: String(entry?.id ?? `career-${index}`).slice(0, 80),
    organization: String(entry?.organization ?? "").trim().slice(0, 80),
    role: String(entry?.role ?? "").trim().slice(0, 80),
    period: String(entry?.period ?? "").trim().slice(0, 50),
    description: String(entry?.description ?? "").trim().slice(0, 500),
  })).filter((entry) => entry.organization || entry.role);
}

export async function POST(request: Request) {
  try {
    const user = await apiUser();
    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const body = await request.json();
    const name = String(body.name ?? "").trim().slice(0, 30);
    const jobTitle = String(body.jobTitle ?? "").trim().slice(0, 50);
    const bio = String(body.bio ?? "").trim().slice(0, 160);
    const contactEmail = String(body.contactEmail ?? "").trim().slice(0, 120);
    const slug = slugify(String(body.slug ?? ""));
    const experienceLevel = String(body.experienceLevel ?? "").trim().slice(0, 50);
    const interests = String(body.interests ?? "").trim().slice(0, 160);
    const strengths = (Array.isArray(body.strengths) ? body.strengths : String(body.strengths ?? "").split(","))
      .map((item: unknown) => String(item).trim().slice(0, 40))
      .filter(Boolean)
      .slice(0, 3);
    const resumeUrl = normalizeUrl(body.resumeUrl);
    const githubUrl = normalizeUrl(body.githubUrl);
    const linkedinUrl = normalizeUrl(body.linkedinUrl);
    const blogUrl = normalizeUrl(body.blogUrl);
    const careers = normalizeCareers(body.careers);

    if (!name || !jobTitle || !bio) {
      return badRequest("이름, 희망 직무, 한 줄 소개를 입력해 주세요.");
    }
    if (slug.length < 3) {
      return badRequest("공개 주소는 영문·숫자로 3자 이상 입력해 주세요.");
    }

    await query(
      `UPDATE portfolios
          SET name = $1, job_title = $2, bio = $3, contact_email = $4,
              slug = $5, experience_level = $6, interests = $7, strengths = $8,
              resume_url = $9, github_url = $10, linkedin_url = $11,
              blog_url = $12, careers = $13::jsonb, updated_at = NOW()
        WHERE owner_id = $14`,
      [name, jobTitle, bio, contactEmail || null, slug, experienceLevel,
        interests, strengths, resumeUrl, githubUrl, linkedinUrl, blogUrl,
        JSON.stringify(careers), user.id],
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "23505"
    ) {
      return badRequest("이미 사용 중인 공개 주소입니다.");
    }
    return serverError(error);
  }
}
