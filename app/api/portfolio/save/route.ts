import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensurePortfolioVersions } from "@/lib/data";
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
    await ensurePortfolioVersions();
    const user = await apiUser();
    if (!user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const body = await request.json();
    const updated = await query(
      `ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS profile_image_url TEXT NOT NULL DEFAULT ''`,
    );
    const name = String(body.name ?? "").trim().slice(0, 30);
    const portfolioId = String(body.id ?? "");
    const versionName = String(body.versionName ?? "기본 포트폴리오").trim().slice(0, 80);
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

    if (!portfolioId) return badRequest("포트폴리오 버전을 확인해 주세요.");
    if (!name || !jobTitle || !bio) {
      return badRequest("이름, 희망 직무, 한 줄 소개를 입력해 주세요.");
    }
    if (slug.length < 3) {
      return badRequest("공개 주소는 영문·숫자로 3자 이상 입력해 주세요.");
    }

    await query(
      `UPDATE portfolios
          SET version_name = $1, name = $2, job_title = $3, bio = $4, contact_email = $5,
              slug = $6, experience_level = $7, interests = $8, strengths = $9,
              about_me = $10, work_style = $11, personal_values = $12, looking_for = $13,
              aspiration = $14, aspiration_title = $15, resume_url = $16, github_url = $17,
              linkedin_url = $18, blog_url = $19, careers = $20::jsonb, core_skills = $21,
              educations = $22::jsonb, certificates = $23::jsonb,
              profile_image_url = $24, updated_at = NOW()
        WHERE id = $25 AND owner_id = $26`,
      [versionName || "기본 포트폴리오", name, jobTitle, bio, contactEmail || null, slug, experienceLevel,
        interests, strengths, aboutMe, workStyle, values, lookingFor, aspiration, aspirationTitle,
        resumeUrl, githubUrl, linkedinUrl, blogUrl, JSON.stringify(careers), coreSkills,
        JSON.stringify(educations), JSON.stringify(certificates), profileImageUrl, portfolioId, user.id],
    );
    if (!updated.rowCount) return NextResponse.json({ ok: false, message: "포트폴리오를 찾을 수 없습니다." }, { status: 404 });

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
