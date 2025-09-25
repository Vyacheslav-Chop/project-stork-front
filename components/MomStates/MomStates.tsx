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
  "Aктивність": "activity",
  "Відпочинок": "rest"
};

export default function MomStates({data, week}: MomStateProps) {
    return (
        <div className={css["mom-state-container"]}>
            <div className={css["left-column"]}>
                {(data.feelings.states.length > 0 || data.feelings.sensationDescr) && (
                    <div className={css["feelings-card"]}>
                        <h3 className={css["title"]}>Як ви можете почуватись</h3>
                        {data.feelings.states.length > 0 && (
                            <ul className={css["feelings-list"]}>
                                {data.feelings.states.map((state, index) => (
                                    <li className={css["feelings-item"]} key={index}>
                                        <div className={css["item-conatiner"]}>{state}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {data.feelings.sensationDescr && <p className={css["sensations"]}>{data.feelings.sensationDescr}</p>}
                    </div>
                )}
                {data.comfortTips.length > 0 && (
                    <div className={css["tips-card"]}>
                        <h3 className={css["title"]}>Поради для вашого комфорту</h3>
                        <dl className={css["tips-list"]}>
                            {data.comfortTips.map((tip, index) => {
                                const key = CAT_KEY[tip.category];
                                return (
                                    <div key={index} className="">
                                        <dt className={css["category"]} data-cat={key}>
                                            <span className=""/>
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
                {/* {data.tasks.length > 0 && <TasksReminderCard tasks={data.tasks} week={week} />} */}
            </div>
        </div>
    );
}