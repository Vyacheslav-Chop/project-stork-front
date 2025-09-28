export interface DiaryData {
  _id: string;
  title: string;
  category: { _id: string; title: string }[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryCreateData {
  title: string;
  description: string;
  category: string[];
}
