"use client";

import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import css from "./page.module.css";
import { useEffect } from "react";
import { getWeekStatic } from "@/lib/api/apiClient";

const DashBoardClient = () => {
  useEffect(() => {
    const publicInfo = async () => {
      const res = await getWeekStatic();
    };

    publicInfo();
  }, []);

  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div className={css.innerWrapper}>
        <div className={css.firstWrapper}>
          <StatusBlock />
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
