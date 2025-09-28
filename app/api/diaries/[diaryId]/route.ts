import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ diaryId: string }> }
) {
  const { diaryId } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await api.get(`/diaries/${diaryId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(data.data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.response?.status || 500 }
    );
  }
}
