import { NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { data } = await api.get("/emotions", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(data);
  } catch (er) {
    return NextResponse.json(
      { error: er.message },
      { status: er.response?.status || 500 }
    );
  }
}
