"use client";


import { WeekRes } from "@/types/babyState";
import css from "./MomTipCard.module.css";

type Props = {
  data: WeekRes;
}

const MomTipCard = () => {
  

  return (
    <div className={css.card}>
      <h2 className={css.title}>Порада для мами</h2>
      {/* {!isLoading && !isError && <p className={css.text}>{tip}</p>} */}
    </div>
  );
};

export default MomTipCard;
