import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { api } from '../../api';
import type { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('auth/login', body);

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        };

        if (parsed.accessToken) {
          response.cookies.set('accessToken', parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          response.cookies.set('refreshToken', parsed.refreshToken, options);
        }
      }
    }

    return response;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Server error';

    return NextResponse.json({ message }, { status });
  }
}