export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { data } = await api.get('/weeks/public', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (data) return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
