import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";
import { serverError } from "@/lib/http";

export async function POST() {
  try {
    await deleteSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
}

export async function GET(request: Request) {
  try {
    await deleteSession();
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    return serverError(error);
  }
}
