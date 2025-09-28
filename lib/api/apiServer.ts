import { cookies } from "next/headers";
import { nextServer } from "./api";
import { WeekData } from "@/types/week";
import { ApiResponse } from "@/types/user";
import { AxiosRes, MomState } from "@/types/momState";
// export async function fetchPrivateWeekDataServer(): Promise<WeekData> {
//   const cookieStore = cookies();
//   const res = await nextServer.get<WeekData>("/weeks/private", {
//     headers: { Cookie: cookieStore.toString() },
//   });
//   return res.data;
// }

export async function fetchPrivateWeekDataServer(): Promise<MomState> {
  const cookieStore = cookies();
  const res = await nextServer.get<AxiosRes<MomState>>("/weeks/mom-state/3", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data.data;
}


// export async function fetchMomStateServer(
//   weekNumber: number
// ): Promise<MomState> {
//   const cookieStore = cookies();
//   const res = await nextServer.get<MomState>(`/weeks/mom-state/${weekNumber}`, {
//     headers: { Cookie: cookieStore.toString() },
//   });
//   return res.data;
// }

export const getUserServer = async (): Promise<ApiResponse | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await nextServer.get<ApiResponse>("/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

