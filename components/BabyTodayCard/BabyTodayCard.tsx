"use client";

import { WeekRes } from "@/types/babyState";
import styles from "./BabyTodayCard.module.css";
import Image from "next/image";

type Props = {
  baby: WeekRes;
};

const BabyTodayCard = ({ baby }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Малюк сьогодні</h2>

      <div className={styles.content}>
        <Image
          src={baby.weekData.image}
          alt={`Тиждень ${baby.weekData.weekNumber}`}
          width={287}
          height={216}
          className={styles.picture}
        />

        <div className={styles.infoBlock}>
          <p>
            <strong>Розмір:</strong> Приблизно {baby.weekData.babySize} см.
          </p>
          <p>
            <strong>Вага:</strong> Близько {baby.weekData.babyWeight} грамів.
          </p>
          <p>
            <strong>Активність:</strong> {baby.weekData.babyActivity}
          </p>
        </div>
      </div>

      <p className={styles.development}>{baby.weekData.babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;
