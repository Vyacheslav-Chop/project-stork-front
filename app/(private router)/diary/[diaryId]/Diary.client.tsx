"use client";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import DiaryEntryDetails from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import Loader from "@/components/Loader/Loader";
import { getDiaryById } from "@/lib/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const Diary = () => {
  const { diaryId } = useParams<{ diaryId: string }>();

  const {
    data: diary,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["diary", diaryId],
    queryFn: () => getDiaryById(diaryId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
      <DiaryEntryDetails diary={diary} />
    </>
  );
};

export default Diary;
