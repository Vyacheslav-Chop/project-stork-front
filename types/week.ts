import { BabyWeekData } from "./babyWeekData";

export interface WeekData {
  currentWeek: number;
  daysToBirth: number;
  isPersonalized: boolean;
  weekData: BabyWeekData;   
}

