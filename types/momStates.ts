export interface ComfortTip {
  category: string;
  tip: string;
}

export interface MomFeelings {
  states: string[];
  sensationDescr: string;
}

export interface MomState {
  _id: string;
  weekNumber: number;
  feelings: MomFeelings;
  comfortTips: ComfortTip[];
  createdAt?: string; 
  updatedAt?: string;
}
