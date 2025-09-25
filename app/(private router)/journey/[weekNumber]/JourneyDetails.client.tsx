'use client'

import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Loader from "../../../../components/Loader/Loader"
import css from './JourneyDetails.module.css'
import { getBabyState, getMomState } from "../../../../lib/api/apiClient"
import BabyStates from "../../../../components/BabyStates/BabyStates"
import MomStates from "../../../../components/MomStates/MomStates"
import { BabyState } from "../../../../types/babyState"
import { MomState } from "../../../../types/momState"
import { useParams } from "next/navigation"

export default function JourneyDetails() {
    const { weekNumber } = useParams<{weekNumber: string}>()
    const weekNum = Number(weekNumber)

    const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby')

    const {
        data: babyData,
        isLoading: isBabyLoading,
    } = useQuery<BabyState>({
        queryKey: ['journeyDetails', weekNum, 'baby'],
        queryFn: () => getBabyState(weekNum),
        enabled: activeTab === 'baby',
        placeholderData: keepPreviousData,
    });

    const {
        data: momData,
        isLoading: isMomLoading,
    } = useQuery<MomState>({
        queryKey: ['journeyDetails', weekNum, 'mom'],
        queryFn: () => getMomState(weekNum),
        enabled: activeTab === 'mom',
        placeholderData: keepPreviousData,
    });

    const isLoading = activeTab === 'baby' ? isBabyLoading : isMomLoading;

    return (
        <>
        <div className={css.container}>
        <div className={css['btn-group']}>
            <button className={activeTab === 'baby' ? css['btn-active'] : css['btn-inactive']} onClick={() => setActiveTab('baby')}>Розвиток малюка</button>
            <button className={activeTab === 'mom' ? css['btn-active'] : css['btn-inactive']} onClick={() => setActiveTab('mom')}>Тіло мами</button>
        </div>

        <div className={css['card-container']}>
        {isLoading && <Loader />}
        {activeTab === 'baby' ? (
            babyData && <BabyStates week={weekNum} data={babyData}/>
        ) : (
            momData && <MomStates week={weekNum} data={momData}/>
        )}
        </div>
        </div>
        </>
    )
}