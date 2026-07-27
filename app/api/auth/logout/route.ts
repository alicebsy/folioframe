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
