export interface Category {
  _id: string;
  title: string;
}

export interface DiaryData {
  _id: string;
  title: string;
  category: Category[];
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDiary {
  title?: string;
  category?: string[];
  description?: string;
}
