import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { api } from "../../api";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken) return NextResponse.json({ success: true });

  if (refreshToken) {

    const apiRes = await api.post(
      "auth/refresh",
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };
        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }
      return NextResponse.json({ success: true });
    }
  }

  return NextResponse.json({ success: false });
}
