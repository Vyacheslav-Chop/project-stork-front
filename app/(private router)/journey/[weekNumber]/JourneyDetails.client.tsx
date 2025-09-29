"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import css from "./JourneyDetails.module.css";
import { getBabyState, getMomState } from "../../../../lib/api/apiClient";
import BabyStates from "../../../../components/BabyStates/BabyStates";
import MomStates from "../../../../components/MomStates/MomStates";
import { BabyState } from "../../../../types/babyState";
import { MomState } from "../../../../types/momState";
import { useParams } from "next/navigation";
import Error from "./error";

export default function JourneyDetails() {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const weekNum = Number(weekNumber);

  const [activeTab, setActiveTab] = useState<"baby" | "mom">("baby");

  const {
    data: babyData,
    isLoading: isBabyLoading,
    isError: isBabyError,
    error: babyError
  } = useQuery<BabyState>({
    queryKey: ["journeyDetails", weekNum, "baby"],
    queryFn: () => getBabyState(weekNum),
    enabled: activeTab === "baby",
    placeholderData: keepPreviousData,
  });

  const {
    data: momData,
    isLoading: isMomLoading,
    isError: isMomError,
    error: momError
  } = useQuery<MomState>({
    queryKey: ["journeyDetails", weekNum, "mom"],
    queryFn: () => getMomState(weekNum),
    enabled: activeTab === "mom",
    placeholderData: keepPreviousData,
  });

  const isLoading = activeTab === "baby" ? isBabyLoading : isMomLoading;
  const isError = activeTab === "baby" ? isBabyError : isMomError;
  const error = activeTab === "baby" ? babyError : momError;

  return (
    <div className={css.container}>
      <div className={css.btnGroup}>
        <button
          className={activeTab === "baby" ? css.btnActive : css.btnInactive}
          onClick={() => setActiveTab("baby")}
        >
          Розвиток малюка
        </button>
        <button
          className={activeTab === "mom" ? css.btnActive : css.btnInactive}
          onClick={() => setActiveTab("mom")}
        >
          Тіло мами
        </button>
      </div>

      <div className={css.cardContainer}>
        {isLoading && <Loader />}
        {isError && error && <Error error={error as Error} />}

        {activeTab === "baby" && babyData && (
          <BabyStates data={babyData} />
        )}
        {activeTab === "mom" && momData && (
          <MomStates data={momData} />
        )}
      </div>
    </div>
  );
}