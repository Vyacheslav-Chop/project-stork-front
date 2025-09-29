import css from "./page.module.css";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";

export default async function Dashboard() {
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
}
