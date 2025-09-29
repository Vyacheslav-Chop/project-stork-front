"use client";

import { useEffect, useState } from "react";
import styles from "./GreetingBlock.module.css";
import { useAuth } from "@/lib/store/authStore";

const getGreetingByTime = (): string => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Доброго дня";
  if (hour >= 18 && hour < 24) return "Доброго вечора";
  return "Доброї ночі";
};

const GreetingBlock = () => {
  const [greeting, setGreeting] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    setGreeting(getGreetingByTime());
  }, []);


  return (
    <div className={styles.greetingBlock}>
      <h2 className={styles.greeting}>
        {greeting}
        {user ? `, ${user.name}!` : ""}
      </h2>
    </div>
  );
};

export default GreetingBlock;
