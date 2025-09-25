import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { notFound } from 'next/navigation';
import { getDiaryByIdServer } from '@/lib/api/apiServer';
import { isAxiosError } from 'axios';

interface PageProps { params: { entryId: string } }

type DiaryEntry = { id: string; title: string; content?: string; createdAt?: string };

export default async function Page({ params }: PageProps) {
  let entry: DiaryEntry | null = null;
  try {
    entry = await getDiaryByIdServer(params.entryId);
  } catch (err: unknown) {

    if (isAxiosError(err) && err.response?.status === 404) {
      notFound();
    }
    throw err;
  }
  if (!entry) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs lastLabel={entry.title} />
      <h1>{entry.title}</h1>
    </div>
  );
}
