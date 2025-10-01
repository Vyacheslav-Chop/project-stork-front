import { NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { data } = await api.get("/diaries", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(data.data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const body = await req.json();

    const { data } = await api.post("/diaries", body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
