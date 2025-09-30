"use client";
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
  if (isError) {
    return toast.error("Не вдалось завантажити запис!");
  }
  return <>{diary && <DiaryEntryDetails diary={diary} />}</>;
};

export default Diary;
