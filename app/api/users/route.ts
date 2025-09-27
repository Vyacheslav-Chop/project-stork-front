export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { data } = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data) return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const body = await request.json();

    const { data } = await api.patch("/users", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data) return NextResponse.json(data);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
