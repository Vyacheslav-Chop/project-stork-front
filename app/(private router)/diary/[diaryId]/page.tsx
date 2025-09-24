import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

interface PageProps { params: { entryId: string } }

type DiaryEntry = { id: string; title: string; content?: string; createdAt?: string };

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export default async function Page({ params }: PageProps) {
  if (!API) throw new Error('NEXT_PUBLIC_API_URL is not set');
  const res = await fetch(`${API}/api/diaries/${encodeURIComponent(params.entryId)}`, {
    cache: 'no-store',
    headers: { cookie: cookies().toString() },
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error('Failed to load diary entry');

  const entry = (await res.json()) as DiaryEntry;

  return (
    <div>
      <Breadcrumbs lastLabel={entry.title} />
      <h1>{entry.title}</h1>
    </div>
  );
}
