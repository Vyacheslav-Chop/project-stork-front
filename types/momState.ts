export interface MomState {
  _id: string;
  weekNumber: number;
  feelings: {
    states: string[];
    sensationDescr?: string;
  };
  comfortTips: Array<{
    _id: string;
    category: string;
    tip: string;
  }>;
};