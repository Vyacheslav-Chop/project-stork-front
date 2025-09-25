export interface MomState {
    weekNumber: number,
    feelings: {
      states: string[],
      sensationDescr: string
    },
    comfortTips: [
      {
        category: string,
        tip: string
      }
    ]
}