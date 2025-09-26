import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { api } from '../../api';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const next = request.nextUrl.searchParams.get('next') || '/';

  if (refreshToken) {
    const apiRes = await api.post('auth/refresh', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      let refreshToken = '';

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        if (parsed.refreshToken) refreshToken = parsed.refreshToken;
      }

      if (refreshToken) cookieStore.set('refreshToken', refreshToken);

      return NextResponse.redirect(new URL(next, request.url), {
        headers: {
          'set-cookie': cookieStore.toString(),
        },
      });
    }
  }
  return NextResponse.redirect(new URL('/auth/login', request.url));
}
