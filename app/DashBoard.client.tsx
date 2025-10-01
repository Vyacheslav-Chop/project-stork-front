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
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useEmotion } from "@/lib/store/emotionsStore";
import { getEmotions } from "@/lib/api/apiClient";
type Props = {
  weekInfo: WeekRes;
};
const l = "Мій день";
const DashBoardClient = ({ weekInfo }: Props) => {
  const setCurrentWeek = useAuth((st) => st.setCurrentWeek);
  const setEmotions = useEmotion((s) => s.setEmotions);
  
  useEffect(() => {
    const loadEmotions = async () => {
      const res = await getEmotions();
      if (res) setEmotions(res);
    };

    loadEmotions();
  }, [setEmotions]);

  useEffect(() => {
    if (weekInfo?.currentWeek) {
      setCurrentWeek(weekInfo.currentWeek);
    }
  }, [weekInfo, setCurrentWeek]);

  return (
    <div className={css.mainWrapper}>
      <Breadcrumbs lastLabel={l} />
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
