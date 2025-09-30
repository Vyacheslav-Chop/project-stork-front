"use client";

import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import css from "./page.module.css";
import { useEffect } from "react";
import { useAuth } from "@/lib/store/authStore";
import { useWeekStore } from "@/lib/store/weekStore";

const DashBoardClient = () => {
  const setCurrentWeek = useAuth((st) => st.setCurrentWeek);
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const { weekInfo, fetchUserInfo } = useWeekStore();

  useEffect(() => {
    fetchUserInfo(isAuthenticated, isLoadingAuth);
  }, [isAuthenticated, isLoadingAuth, fetchUserInfo]);

  useEffect(() => {
    if (weekInfo?.currentWeek) {
      setCurrentWeek(weekInfo.currentWeek);
    }
  }, [weekInfo, setCurrentWeek]);

  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div className={css.innerWrapper}>
        <div className={css.firstWrapper}>
          {weekInfo && <StatusBlock data={weekInfo} />}
          {weekInfo && <BabyTodayCard baby={weekInfo} />}
          {weekInfo && <MomTipCard data={weekInfo} />}
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
