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

export type AxiosRes <T> = {
  status: number;
  message: string;
  data: T;
};