export interface BabyWeekData {
  _id: string;
  analogy: string | null;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}

export type WeekTip = string[];

export interface ApiWeekResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface WeekTipResponse {
  weekData: {
    momDailyTips: string[];
    weekNumber: number
  }
};
