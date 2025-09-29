'use client'

import { BabyState } from "../../types/babyState"
import css from './BabyStates.module.css'
import Image from "next/image"

type BabyStateProps = {
  data: BabyState
}

export default function BabyStates({ data }: BabyStateProps) {
  const imgSrc = data.image?.trim() || null

  return (
    <div className={css.babyStateContainer}>
      <div className={css.imgContainer}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={`Baby illustration`}
            width={287}             
            height={379}
            className={css.img}
          />
        )}
        <p className={css.analogy}>{`Ваш малюк зараз розміром з ${data.analogy}`}</p>
      </div>

      <div className={css.infoContainer}>
        <div className={css.developmentCard}>
          <p className={css.development}>{data.babyDevelopment}</p>
        </div>
        <div className={css.factCard}>
          <div className={css.factTitleContainer}>
            <Image src="/icons/star.svg" alt="" width={24} height={24} aria-hidden />
            <h4 className={css.factTitle}>Цікавий факт тижня</h4>
          </div>
          <p className={css.factText}>{data.interestingFact}</p>
        </div>
      </div>
    </div>
  )
}