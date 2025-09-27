import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const formData = await request.formData();
    const file = formData.get("avatar");

    console.log(file instanceof File);
    // console.log(file.name, file.type, file.size);
    

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Файл аватара обов'язковий" },
        { status: 400 }
      );
    }

    console.log(file.name, file.type, file.size);

    const uploadData = new FormData();
    uploadData.append("avatar", file, file.name);

    const { data } = await api.patch("/users/avatar", uploadData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data?.data) {
      return NextResponse.json(data.data);
    }

    return NextResponse.json(
      { error: "Не вдалося оновити аватар користувача" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Не вдалося оновити аватар користувача" },
      { status: 500 }
    );
  }
}
