import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";
import type { CareerEntry, CertificateEntry, EducationEntry } from "@/lib/models";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

function normalizeUrl(value: unknown) {
  const url = String(value ?? "").trim().slice(0, 2500);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function normalizeProfileImage(value: unknown) {
  const image = String(value ?? "").trim();
  if (!image) return "";
  if (image.startsWith("/")) return image;
  if (image.length > 2_000_000) return "";
  if (/^data:image\/(?:png|jpeg|jpg|webp|gif);base64,[a-z0-9+/=\s]+$/i.test(image)) return image;
  return normalizeUrl(image);
}

function normalizeCareers(value: unknown): CareerEntry[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).map((entry, index) => ({
    id: String(entry?.id ?? `career-${index}`).slice(0, 80),
    organization: String(entry?.organization ?? "").trim().slice(0, 80),
    role: String(entry?.role ?? "").trim().slice(0, 80),
    period: String(entry?.period ?? "").trim().slice(0, 50),
    description: String(entry?.description ?? "").trim().slice(0, 2500),
  })).filter((entry) => entry.organization || entry.role);
}

function normalizeEducations(value: unknown): EducationEntry[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 5).map((entry, index) => ({
    id: String(entry?.id ?? `education-${index}`).slice(0, 80),
    school: String(entry?.school ?? "").trim().slice(0, 100),
    major: String(entry?.major ?? "").trim().slice(0, 100),
    period: String(entry?.period ?? "").trim().slice(0, 50),
    description: String(entry?.description ?? "").trim().slice(0, 2500),
  })).filter((entry) => entry.school || entry.major);
}

function normalizeCertificates(value: unknown): CertificateEntry[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 10).map((entry, index) => ({
    id: String(entry?.id ?? `certificate-${index}`).slice(0, 80),
    name: String(entry?.name ?? "").trim().slice(0, 120),
    issuer: String(entry?.issuer ?? "").trim().slice(0, 100),
    issuedAt: String(entry?.issuedAt ?? "").trim().slice(0, 30),
    credentialUrl: normalizeUrl(entry?.credentialUrl),
  })).filter((entry) => entry.name || entry.issuer);
}

export async function POST(request: Request) {
  try {
    const user = await apiUser();
    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const body = await request.json();
    await query(
      `ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS profile_image_url TEXT NOT NULL DEFAULT ''`,
    );
    const name = String(body.name ?? "").trim().slice(0, 30);
    const profileImageUrl = normalizeProfileImage(body.profileImageUrl);
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
    const coreSkills = (Array.isArray(body.coreSkills) ? body.coreSkills : String(body.coreSkills ?? "").split(","))
      .map((item: unknown) => String(item).trim().slice(0, 40))
      .filter(Boolean)
      .slice(0, 12);
    const aboutMe = String(body.aboutMe ?? "").trim().slice(0, 4000);
    const workStyle = String(body.workStyle ?? "").trim().slice(0, 2500);
    const values = String(body.values ?? "").trim().slice(0, 2500);
    const lookingFor = String(body.lookingFor ?? "").trim().slice(0, 2500);
    const aspiration = String(body.aspiration ?? "").trim().slice(0, 2500);
    const aspirationTitle = String(body.aspirationTitle ?? "").trim().slice(0, 120);
    const resumeUrl = normalizeUrl(body.resumeUrl);
    const githubUrl = normalizeUrl(body.githubUrl);
    const linkedinUrl = normalizeUrl(body.linkedinUrl);
    const blogUrl = normalizeUrl(body.blogUrl);
    const careers = normalizeCareers(body.careers);
    const educations = normalizeEducations(body.educations);
    const certificates = normalizeCertificates(body.certificates);

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
              about_me = $9, work_style = $10, personal_values = $11, looking_for = $12,
              aspiration = $13, aspiration_title = $14, resume_url = $15, github_url = $16,
              linkedin_url = $17, blog_url = $18, careers = $19::jsonb, core_skills = $20,
              educations = $21::jsonb, certificates = $22::jsonb,
              profile_image_url = $23, updated_at = NOW()
        WHERE owner_id = $24`,
      [name, jobTitle, bio, contactEmail || null, slug, experienceLevel,
        interests, strengths, aboutMe, workStyle, values, lookingFor, aspiration, aspirationTitle,
        resumeUrl, githubUrl, linkedinUrl, blogUrl, JSON.stringify(careers), coreSkills,
        JSON.stringify(educations), JSON.stringify(certificates), profileImageUrl, user.id],
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
