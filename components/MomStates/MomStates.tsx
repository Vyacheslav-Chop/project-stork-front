'use client'

import { MomState } from "../../types/momState"
import css from './MomStates.module.css'
import TasksReminderCard from "../TasksReminderCard/TasksReminderCard"

type MomStateProps = {
    data: MomState,
    week: number
}

const CAT_KEY: Record<string, string> = {
  "Харчування": "nutrition",
  "Активність": "activity",
  "Відпочинок": "rest"
};

export default function MomStates({data, week}: MomStateProps) {
    const feelingsStates = data?.feelings?.states ?? [];
    const sensationDescr = data?.feelings?.sensationDescr ?? "";
    const comfortTips = data?.comfortTips ?? [];

    return (
        <div className={css["mom-state-container"]}>
            <div className={css["left-column"]}>
                {(feelingsStates.length > 0 || !!sensationDescr) && (
                    <div className={css["feelings-card"]}>
                        <h3 className={css["title"]}>Як ви можете почуватись</h3>
                        {feelingsStates.length > 0 && (
                            <ul className={css["feelings-list"]}>
                                {feelingsStates.map((state, index) => (
                                    <div className={css["item-conatiner"]} key={index}>
                                      <li className={css["feelings-item"]}>
                                        {state}
                                      </li>
                                    </div>
                                ))}
                            </ul>
                        )}
                        {sensationDescr && <p className={css["sensations"]}>{sensationDescr}</p>}
                    </div>
                )}
                {comfortTips.length > 0 && (
                    <div className={css["tips-card"]}>
                        <h3 className={css["title"]}>Поради для вашого комфорту</h3>
                        <dl className={css["tips-list"]}>
                            {comfortTips.map((tip, index) => {
                                const key = CAT_KEY[tip.category] ?? "";
                                return (
                                    <div key={index} className={css["tip-row"]}>
                                        <dt className={css["category"]} data-cat={key}>
                                            <span className={css["icon"]}/>
                                            {tip.category}
                                        </dt>
                                        <dd className={css["tip"]}>{tip.tip}</dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </div>
                )}
            </div>
            <div className={css["right-column"]}>
              <TasksReminderCard />
            </div>
        </div>
    );
}
