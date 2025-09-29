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
        <span className={styles.label}>Тиждень</span>
        <span className={styles.value}>{data?.currentWeek}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Днів до зустрічі</span>
        <span className={styles.value}>~{data?.daysToBirth}</span>
      </div>
    </div>
  );
};

export default StatusBlock;
