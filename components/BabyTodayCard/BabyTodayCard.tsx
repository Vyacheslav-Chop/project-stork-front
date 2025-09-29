"use client";

import styles from "./BabyTodayCard.module.css";
import Image from "next/image";

type BabyData = {
  image: string;
  weekNumber: number;
  babySize: number | string;
  babyWeight: number | string;
  babyActivity: string;
  babyDevelopment: string;
};

type Props = {
  baby: BabyData;
};

const BabyTodayCard = ({ baby }: Props) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Малюк сьогодні</h2>

        <div className={styles.content}>
          <div className={styles.imageBlock}>
            <Image
              src={baby.image}
              alt={`Тиждень ${baby.weekNumber}`}
              width={287}
              height={216}
            />
          </div>

          <div className={styles.infoBlock}>
            <p>
              <strong>Розмір:</strong> Приблизно {baby.babySize} см.
            </p>
            <p>
              <strong>Вага:</strong> Близько {baby.babyWeight} грамів.
            </p>
            <p>
              <strong>Активність:</strong> {baby.babyActivity}
            </p>
          </div>
        </div>

        <p className={styles.development}>{baby.babyDevelopment}</p>
      </div>
    </section>
  );
};

export default BabyTodayCard;
