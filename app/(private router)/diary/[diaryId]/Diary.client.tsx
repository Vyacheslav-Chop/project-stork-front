"use client";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import Loader from "@/components/Loader/Loader";
import { getDiaryById } from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DiaryData } from "@/types/diaries";

const Diary = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const router = useRouter();

  const {
    data: diary,
    isLoading,
    isError,
  } = useQuery<DiaryData>({
    queryKey: ["diary", diaryId],
    queryFn: () => getDiaryById(diaryId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !diary) {
    toast.error("Не вдалось завантажити запис!");
    return null;
  }

  return (
    <>
      <Breadcrumbs lastLabel={diary.title} />
      <DiaryEntryDetails
        diary={diary}
        onSelect={(updated) => {
          if (updated) {
            toast.success("Запис оновлено");
            router.refresh();
          }
        }}
      />
    </>
  );
};

export default Diary;
