import styles from "./BabyTodayCard.module.css";
import { BabyWeekData } from "@/types/BabyWeekData";
import Image from "next/image";

interface Props {
  data: BabyWeekData;
}

const BabyTodayCard = ({ data }: Props) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Малюк сьогодні</h2>

        <div className={styles.content}>
          {/* Левая колонка */}
          <div className={styles.imageBlock}>
            <Image
              src={data.image}
              alt={`Тиждень ${data.weekNumber}`}
              width={287}
              height={216}
            />
          </div>

          {/* Правая колонка */}
          <div className={styles.infoBlock}>
            <p>
              <strong>Розмір:</strong> Приблизно {data.babySize} см.
            </p>
            <p>
              <strong>Вага:</strong> Близько {data.babyWeight} грамів.
            </p>
            <p>
              <strong>Активність:</strong> {data.babyActivity}
            </p>
          </div>
        </div>

        {/* Текст снизу */}
        <p className={styles.development}>{data.babyDevelopment}</p>
      </div>
    </section>
  );
};

export default BabyTodayCard;
