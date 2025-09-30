import { cookies } from "next/headers";
import { nextServer } from "./api";
import { DiaryData } from "@/types/diaries";
import { AxiosRes } from "@/types/generic";
import { BabyState, WeekRes } from "@/types/babyState";
import { UserResponse } from "@/types/user";
import { MomState } from "@/types/momState";

export const getWeekDynamicServer = async (): Promise<WeekRes | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await nextServer.get<AxiosRes<WeekRes>>("/weeks/private", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getUserServer = async (): Promise<UserResponse | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await nextServer.get<AxiosRes<UserResponse>>("/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getDiaryByIdServer = async (
  diaryId: string
): Promise<DiaryData | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error('No accessToken');

  const res = await nextServer.get<AxiosRes<DiaryData>>(`/diaries/${diaryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.data?.data) throw new Error("Diary not found");
  
  return res.data?.data;
};

export const getMomStateServer = async (week: number): Promise<MomState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error("Unauthorized");
  const res = await nextServer.get<AxiosRes<MomState>>(
    `/weeks/mom-state/${week}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookieStore.toString(),
      },
    }
  );

  return res.data.data;
};

export const getBabyStateServer = async (week: number): Promise<BabyState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error("Unauthorized");
  const res = await nextServer.get<AxiosRes<BabyState>>(
    `/weeks/baby-state/${week}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookieStore.toString(),
      },
    }
  );

  return res.data.data;
};
