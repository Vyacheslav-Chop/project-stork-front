"use client";

import { WeekRes } from "@/types/babyState";
import css from "./MomTipCard.module.css";

type Props = {
  data: WeekRes;
};

const MomTipCard = ({ data }: Props) => {
  const getDayIndex = (day: Date = new Date()) => (day.getDay() + 6) % 7;

  const dayIndex = getDayIndex();
  const tip = data.weekData.momDailyTips?.[dayIndex];

  return (
    <div className={css.card}>
      <h2 className={css.title}>Порада для мами</h2>
      {tip ? (
        <p className={css.text}>{tip}</p>
      ) : (
        <p className={css.text}>Немає поради на сьогодні</p>
      )}{" "}
    </div>
  );
};

export default MomTipCard;
