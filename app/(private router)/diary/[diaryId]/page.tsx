import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDiaryByIdServer } from "@/lib/api/apiServer";
import Diary from "./Diary.client";

interface Props {
  params: Promise<{ diaryId: string }>;
}

export default async function DiaryDetailsPage({ params }: Props) {
  const { diaryId } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["diary", diaryId],
    queryFn: () => getDiaryByIdServer(diaryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Diary />
    </HydrationBoundary>
  );
}
