import { getDiaryById } from "@/lib/api/apiClient";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";

interface Props {
  params: { diaryId: string };
}

export default async function DiaryDetailsPage({ params }: Props) {
  const diary = await getDiaryById(params.diaryId);

  return <DiaryEntryDetails diary={diary} />;
}
