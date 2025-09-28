"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./GreetingBlock.module.css";
import Loader from "../Loader/Loader";
import type { UserResponse } from "@/types/user";
import { getUser } from "@/lib/api/apiClient";

const getGreetingByTime = (): string => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Доброго дня";
  if (hour >= 18 && hour < 24) return "Доброго вечора";
  return "Доброї ночі";
};

const GreetingBlock: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("");

  const { data: user, isLoading } = useQuery<UserResponse | null>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    setGreeting(getGreetingByTime());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
