import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { apiUser, badRequest, serverError } from "@/lib/http";

export const dynamic = "force-dynamic";

// 업로드 가능한 최대 파일 크기 (25MB)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const user = await apiUser();
    if (!user) {
      return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return badRequest("업로드할 파일이 없습니다.");
    }

    if (file.size > MAX_FILE_SIZE) {
      return badRequest("25MB 이하의 파일만 업로드할 수 있습니다.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 파일 이름 정리 및 중복 방지 타임스탬프 추가
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9._\-가-힣]/g, "_")
      .slice(0, 100);
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const filename = `${uniqueSuffix}-${sanitizedName}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    });
  } catch (error) {
    return serverError(error);
  }
}
