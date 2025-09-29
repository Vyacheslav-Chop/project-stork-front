"use client";

import { WeekRes } from "@/types/babyState";
import styles from "./StatusBlock.module.css";

type Props = { 
  data: WeekRes;
}

const StatusBlock = ({data}: Props) => {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{data?.currentWeek}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>~{data?.daysToBirth}</p>
      </div>
    </div>
  );
};

export default StatusBlock;
