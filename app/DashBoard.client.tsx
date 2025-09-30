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
import { WeekRes } from "@/types/babyState";
type Props = {
  weekInfo: WeekRes;
};
const DashBoardClient = ({ weekInfo }: Props) => {
  const setCurrentWeek = useAuth((st) => st.setCurrentWeek);

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
