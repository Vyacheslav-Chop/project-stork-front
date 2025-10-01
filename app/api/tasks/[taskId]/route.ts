import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await context.params;
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const body = await request.json();
    const { data } = await api.patch(`/tasks/${taskId}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
