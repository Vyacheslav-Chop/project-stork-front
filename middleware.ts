import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/diary', '/profile', '/journey'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPrivateRoute) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    try {
      const refreshUrl = new URL('/api/refresh', request.url);

      const apiRes = await fetch(refreshUrl.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (apiRes.ok) {
        const res = NextResponse.next();
        const setCookie = apiRes.headers.get('set-cookie');
        if (setCookie) {
          res.headers.set('set-cookie', setCookie);
        }
        return res;
      }

      return NextResponse.redirect(new URL('/sign-in', request.url));
    } catch {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/diary/:path*', '/profile/:path*', '/journey/:path*', '/sign-in', '/sign-up'],
};
