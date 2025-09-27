export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  try {
    const { data } = await api.get('/weeks/public', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (data) return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}