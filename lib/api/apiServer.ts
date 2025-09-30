import { cookies } from "next/headers";
import { nextServer } from "./api";
import { DiaryData } from "@/types/diaries";
import { AxiosRes } from "@/types/generic";
import { WeekRes } from "@/types/babyState";
import { UserResponse } from "@/types/user";

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

  if (!accessToken) return null;

  const res = await nextServer.get<AxiosRes<DiaryData>>(`/diaries/${diaryId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const fetchPrivateWeekDataServer = async (
  weekNumber: string
): Promise<WeekRes | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await nextServer.get<AxiosRes<WeekRes>>(
    `/journey/${weekNumber}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: cookieStore.toString(),
      },
    }
  );
  return res.data.data;
};
