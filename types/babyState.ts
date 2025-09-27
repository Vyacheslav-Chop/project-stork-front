export interface BabyState {
  _id: string;
  analogy: string;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}

export interface WeekRes {
  weekData: BabyState;
  currentWeek: number;
  daysToBirth: number;
  isPersonalized: boolean;
}
