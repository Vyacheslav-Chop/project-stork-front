import css from "./page.module.css";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
// import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
// import { getWeekStatic } from "@/lib/api/apiClient";
// import { BabyWeekData } from "@/types/babyWeekData";

export default async function Dashboard() {
  // const babyData: BabyWeekData = await getWeekStatic();
  return (
    <div className={css.mainWrapper}>
      <GreetingBlock />
      <div className={css.innerWrapper}>
        <div className={css.firstWrapper}>
          <StatusBlock />
          {/* <BabyTodayCard data={babyData} /> */}
          <MomTipCard />
        </div>
        <div className={css.lastWrapper}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  );
}
