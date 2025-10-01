import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { weekNumber: string } }
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const { weekNumber } = params;

  try {
    const { data } = await api.get(`/weeks/baby-state/${weekNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data) return NextResponse.json(data);
  } catch (err) {
    console.log("Error", err);
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
