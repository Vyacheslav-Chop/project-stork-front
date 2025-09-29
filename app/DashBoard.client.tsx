"use client";

import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import css from "./page.module.css";
import { useEffect } from "react";
import { getWeekDynamic, getWeekStatic } from "@/lib/api/apiClient";
import { useInfo } from "@/lib/store/publicWeekStore";
import { useAuth } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";

const DashBoardClient = () => {
  const setInfo = useInfo((set) => set.setInfo);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const publicInfo = async () => {
      const res = await getWeekStatic();
      setInfo(res);
    };

    publicInfo();
  }, [setInfo]);

  const dayKey = new Date().toISOString().slice(0, 10);

  const {
    data: privateInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["privateInfo", dayKey],
    queryFn: () => getWeekDynamic(),
    enabled: isAuthenticated,
  });

  const { publicInfo } = useInfo();

  const userInfo = isAuthenticated ? privateInfo : publicInfo;

  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div className={css.innerWrapper}>
        <div className={css.firstWrapper}>
          {userInfo && <StatusBlock data={userInfo} />}
          <BabyTodayCard />
          <MomTipCard />
        </div>
        <div className={css.lastWrapper}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  );
};

export default DashBoardClient;
