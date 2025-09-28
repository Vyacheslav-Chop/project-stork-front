import { NextResponse } from "next/server";
import { api } from "../../../api";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const { data } = await api.patch(`/tasks/${taskId}/status`, null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(data);
  } catch (er) {
    return NextResponse.json({ error: er.message }, { status: er.status });
  }
}
