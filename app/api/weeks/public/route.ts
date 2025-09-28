export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function GET() {
  try {
    const { data } = await api.get('/weeks/public', {
    });
    if (data) return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}