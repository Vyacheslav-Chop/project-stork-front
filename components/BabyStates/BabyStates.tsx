'use client'

import { BabyState } from "../../types/babyState"
import css from './BabyStates.module.css'
import Image from "next/image"

type BabyStateProps = {
  data: BabyState,
  week: number
}

export default function BabyStates({ data, week }: BabyStateProps) {
  const imgSrc = data.image?.trim() || null

  return (
    <div className={css["baby-state-container"]}>
      <div className={css["img-container"]}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={`Week ${week} baby illustration`}
            width={656}             
            height={379}
            className={css.img}
          />
        )}
        <p className={css.analogy}>{`Ваш малюк зараз розміром з ${data.analogy}`}</p>
      </div>

      <div className={css["info-container"]}>
        <div className={css["development-card"]}>
          <p className={css.development}>{data.babyDevelopment}</p>
        </div>
        <div className={css["fact-card"]}>
          <div className={css["fact-title-conainer"]}>
            <Image src="/icons/star.svg" alt="" width={24} height={24} aria-hidden />
            <h4 className={css["fact-title"]}>Цікавий факт тижня</h4>
          </div>
          <p className={css["fact-text"]}>{data.interestingFact}</p>
        </div>
      </div>
    </div>
  )
}
