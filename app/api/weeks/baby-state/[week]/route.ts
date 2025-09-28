import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const weekNumber = await params.week;

  try {
    const { data } = await api.get(`/weeks/baby-state/${weekNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data) return NextResponse.json(data);
  } catch (err) {

    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
