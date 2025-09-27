import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST() {
  const cookieStore = await cookies();

  try {
    const accessToken = cookieStore.get('accessToken')?.value;

    await api.post("auth/logout", null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
