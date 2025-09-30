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

  console.log("DIARY ID SERVER>>>>>>>", diaryId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["diary", diaryId],
    queryFn: () => getDiaryByIdServer(diaryId),
  });

  console.log("DIARY QUERY >>>>>>>>>>>>", queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Diary />
    </HydrationBoundary>
  );
}
