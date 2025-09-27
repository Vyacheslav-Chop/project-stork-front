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

  const [activeTab, setActiveTab] = useState<"baby" | "mom">("mom");

  const {
    data: babyData,
    isLoading: isBabyLoading,
    isError: isBabyError,
    error: babyError
  } = useQuery<BabyState | null>({
    queryKey: ["journeyDetails", weekNum, "baby"],
    queryFn: async () => {
      try {
        const res = await getBabyState(weekNum);
        return res ?? null;
      } catch (e) {
        return null;
      }
    },
    enabled: activeTab === "baby" && Number.isFinite(weekNum),
    placeholderData: keepPreviousData,
  });

  const {
    data: momData,
    isLoading: isMomLoading,
    isError: isMomError,
    error: momError
  } = useQuery<MomState | null>({
    queryKey: ["journeyDetails", weekNum, "mom"],
    queryFn: async () => {
      try {
        const res = await getMomState(weekNum);
        return res ?? null;
      } catch (e) {
        return null;
      }
    },
    enabled: activeTab === "mom" && Number.isFinite(weekNum),
    placeholderData: keepPreviousData,
  });

  const isLoading = activeTab === "baby" ? isBabyLoading : isMomLoading;
  const isError = activeTab === "baby" ? isBabyError : isMomError;
  const error = activeTab === "baby" ? babyError : momError;


  return (
    <div className={css.container}>
      <div className={css["btn-group"]}>
        <button
          className={activeTab === "baby" ? css["btn-active"] : css["btn-inactive"]}
          onClick={() => setActiveTab("baby")}
        >
          Розвиток малюка
        </button>
        <button
          className={activeTab === "mom" ? css["btn-active"] : css["btn-inactive"]}
          onClick={() => setActiveTab("mom")}
        >
          Тіло мами
        </button>
      </div>

      <div className={css["card-container"]}>
        {isLoading && <Loader />}
        {isError && error && <Error error={error as Error} />}

        {activeTab === "baby" && babyData && (
          <BabyStates week={weekNum} data={babyData} />
        )}
        {activeTab === "mom" && momData && (
          <MomStates week={weekNum} data={momData} />
        )}
      </div>
    </div>
  );
}
