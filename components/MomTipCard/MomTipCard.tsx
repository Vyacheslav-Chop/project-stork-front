"use client";

import { useAuth } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getPrivateMomTips, getPublicMomTips } from "@/lib/api/apiClient";
import css from "./MomTipCard.module.css";
import Loader from "../Loader/Loader";
import ErrorText from "../ErrorText/ErrorText";
import { WeekTip } from "@/types/babyWeekData";

const MomTipCard = () => {
  const dayIndex = (day = new Date()) => (day.getDay() + 6) % 7;
  const getTip = (tips?: string[]) => tips?.[dayIndex()];

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const getMomTips = async (isAuthenticated: boolean): Promise<WeekTip> => {
    return isAuthenticated ? getPrivateMomTips() : getPublicMomTips();
  };

  const {
    data: tips,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mom-tip", isAuthenticated],
    queryFn: () => getMomTips(isAuthenticated),
  });

  const tip = getTip(tips);

  return (
    <div className={css.card}>
      <h2 className={css.title}>Порада для мами</h2>

      {isLoading && <Loader />}
      {isError && <ErrorText message={(error as Error)?.message} />}
      {!isLoading && !isError && <p className={css.text}>{tip}</p>}
    </div>
  );
};

export default MomTipCard;
