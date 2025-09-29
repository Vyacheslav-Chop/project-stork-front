import { BabyState } from "./babyState";

export interface WeekData {
  currentWeek: number;
  daysToBirth: number;
  isPersonalized: boolean;
  weekData: BabyState;   
}


type Week = {
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
};

type WeekResponseData = {
  weekData: Week;
  currentWeek: number;
  daysToBirth: number;
  isPersonalized: boolean;
};

type WeekResponse = {
  status: number;
  message: string;
  data: WeekResponseData;
};
