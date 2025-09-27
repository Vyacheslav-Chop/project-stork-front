export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import { error } from "console";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { data } = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data) return NextResponse.json(data);
  } catch (er) {
    return NextResponse.json({ error: er.message }, { status: er.status });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const body = await request.json();

    const { data } = await api.post("/tasks", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data) return NextResponse.json(data);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  } catch (er) {
    return NextResponse.json({ error: er.message }, { status: er.status });
  }
}
