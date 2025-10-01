import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ diaryId: string }> }
) {

  console.log('START PROKSI>>>>>>>>>>>>>>>>>>');
  
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
    console.log('');
    
    return NextResponse.json(data.data);
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { diaryId: string } }
) {
  const { diaryId } = params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await api.delete(`/diaries/${diaryId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Error deleting diary:", err);
    return NextResponse.json({ error: "Failed to delete diary" }, { status: 500 });
  }
}


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ diaryId: string }> }
) {
  const { diaryId } = await params;
  const body = await req.json();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await api.patch(`/diaries/${diaryId}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(data.data);
  } catch (err) {
    console.log("Error", err);
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
