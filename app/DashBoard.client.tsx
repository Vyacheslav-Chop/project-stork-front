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
  const setInfo = useInfo((st) => st.setInfo);
  const { isAuthenticated } = useAuth();
  const setCurrentWeek = useAuth((st) => st.setCurrentWeek);

  useEffect(() => {
    const publicInfo = async () => {
      const res = await getWeekStatic();
      setInfo(res);
    };

    publicInfo();
  }, [setInfo]);

  const dayKey = new Date().toISOString().slice(0, 10);

  const { data: privateInfo } = useQuery({
    queryKey: ["privateInfo", dayKey],
    queryFn: () => getWeekDynamic(),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (privateInfo?.currentWeek) {
      setCurrentWeek(privateInfo.currentWeek);
    }
  }, [privateInfo, setCurrentWeek]);

  const { publicInfo } = useInfo();

  const userInfo = isAuthenticated ? privateInfo : publicInfo;

  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div className={css.innerWrapper}>
        <div className={css.firstWrapper}>
          {userInfo && <StatusBlock data={userInfo} />}
          {userInfo && <BabyTodayCard baby={userInfo} />}
          {userInfo && <MomTipCard data={userInfo} />}
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
