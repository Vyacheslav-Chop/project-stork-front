import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import FormData from "form-data";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const formData = await request.formData();
    const file = formData.get("avatar");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Фото повино бути у вигляді файлу!" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadData = new FormData();
    uploadData.append("avatar", buffer, { filename: file.name, contentType: file.type });

    const { data } = await api.patch("/users/avatar", uploadData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...uploadData.getHeaders(),
      },
    });

    if (data?.data) {
      return NextResponse.json(data.data);
    }

    return NextResponse.json(
      { error: "Не вдалося оновити аватар користувача" },
      { status: 500 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Не вдалося оновити аватар користувача" },
      { status: 500 }
    );
  }
}
