export interface DiaryData {
  _id: string;
  title: string;
  category: Category[];
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  title: string;
}
