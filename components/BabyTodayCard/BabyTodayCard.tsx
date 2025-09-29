"use client";

import { useAuth } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getWeekStatic, getWeekDynamic } from "@/lib/api/apiClient";
import styles from "./BabyTodayCard.module.css";
import Image from "next/image";
import toast from "react-hot-toast";

const BabyTodayCard = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["babyWeekData", isAuthenticated],
    queryFn: () => (isAuthenticated ? getWeekDynamic() : getWeekStatic()),
  });

  if (isLoading) return <div className={styles.loader}>Завантаження…</div>;
  if (isError || !data) {
    toast.error("Не вдалося завантажити дані про малюка");
    return null;
  }

  const baby = data.weekData;

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
