import { cookies } from "next/headers";
import { nextServer } from "./api";
import { WeekData } from "@/types/week";
import { MomState } from "@/types/momStates";

export async function fetchPrivateWeekDataServer(): Promise<WeekData> {
  const cookieStore = cookies();
  const res = await nextServer.get<WeekData>("/weeks/private", {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
}

export async function fetchMomStateServer(weekNumber: number): Promise<MomState> {
  const cookieStore = cookies();
  const res = await nextServer.get<MomState>(`/weeks/mom-state/${weekNumber}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
}
