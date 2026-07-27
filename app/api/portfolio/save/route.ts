import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { apiUser, badRequest, serverError } from "@/lib/http";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
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

    if (!name || !jobTitle || !bio) {
      return badRequest("이름, 희망 직무, 한 줄 소개를 입력해 주세요.");
    }
    if (slug.length < 3) {
      return badRequest("공개 주소는 영문·숫자로 3자 이상 입력해 주세요.");
    }

    await query(
      `UPDATE portfolios
          SET name = $1, job_title = $2, bio = $3, contact_email = $4,
              slug = $5, updated_at = NOW()
        WHERE owner_id = $6`,
      [name, jobTitle, bio, contactEmail || null, slug, user.id],
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
