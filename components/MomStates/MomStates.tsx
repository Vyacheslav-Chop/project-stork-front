'use client'

import { MomState } from "../../types/momState"
import css from './MomStates.module.css'
import TasksReminderCard from "../TasksReminderCard/TasksReminderCard"
import Image from "next/image"

type MomStateProps = {
    data: MomState,
}

const icons = [
    "/icons/food.svg",
    "/icons/activity.svg",
    "/icons/rest.svg"
]

export default function MomStates({data }: MomStateProps) {
    const feelingsStates = data?.feelings?.states ?? [];
    const sensationDescr = data?.feelings?.sensationDescr ?? "";
    const comfortTips = data?.comfortTips ?? [];

    return (
        <div className={css.momStateContainer}>
            <div className={css.leftColumn}>
                {(feelingsStates.length > 0 || !!sensationDescr) && (
                    <div className={css.feelingsCard}>
                        <h3 className={css.title}>Як ви можете почуватись</h3>
                        {feelingsStates.length > 0 && (
                            <ul className={css.feelingsList}>
                                {feelingsStates.map((state, index) => (
                                    <div className={css.itemContainer} key={index}>
                                      <li className={css.feelingsItem}>
                                        {state}
                                      </li>
                                    </div>
                                ))}
                            </ul>
                        )}
                        {sensationDescr && <p className={css.sensations}>{sensationDescr}</p>}
                    </div>
                )}
                {comfortTips.length > 0 && (
                    <div className={css.tipsCard}>
                        <h3 className={css.title}>Поради для вашого комфорту</h3>
                        <dl className={css.tipsList}>
                            {comfortTips.map((tip, index) => {
                                return (
                                    <div key={index} className={css.tipRow}>
                                        <dt className={css.category}>
                                            <Image 
                                                src={icons[index]} 
                                                alt={tip.category} 
                                                width={24} 
                                                height={24}
                                                className={css.icon}
                                            />
                                            {tip.category}
                                        </dt>
                                        <dd className={css.tip}>{tip.tip}</dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </div>
                )}
            </div>
            <div className={css.rightColumn}>
              <TasksReminderCard />
            </div>
        </div>
    );
}