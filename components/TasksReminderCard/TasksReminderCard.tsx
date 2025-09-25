import React from "react";
import Image from "next/image";
import styles from "./TasksReminderCard.module.css";
import addIcon from "../../public/icon_add_task.svg";

const TasksReminderCard = () => (
  <div className={styles.card}>
    <div className={styles.header}>
      <h2 className={styles.title}>Важливі завдання</h2>
      <button className={styles.addButton} aria-label="Додати завдання">
        <Image
          src={addIcon}
          width={22}
          height={22}
          alt=""
          priority
          className={styles.icon}
        />
      </button>
    </div>
    <div className={styles.content}>
      <h3 className={styles.subtitle}>Наразі немає жодних завдань</h3>
      <p className={styles.description}>Створіть перший нове завдання!</p>
      <button className={styles.createButton}>Створити завдання</button>
    </div>
  </div>
);

export default TasksReminderCard;
