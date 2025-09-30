import { cookies } from "next/headers";
import DashBoardClient from "./DashBoard.client";
import { getWeekStatic } from "@/lib/api/apiClient";
import { getWeekDynamicServer } from "@/lib/api/apiServer";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;
  const isAuthenticated = Boolean(token);

  const weekInfo = isAuthenticated
    ? await getWeekDynamicServer()
    : await getWeekStatic();

  return <>{weekInfo && <DashBoardClient weekInfo={weekInfo} />}</>;
}
