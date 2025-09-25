import { Emotion } from "./emotions";

export interface DiaryData {
  _id: string;
  title: string;
  category: string[];
  emotions: Emotion[];
  description: string;
  createdAt: string;
  updatedAt: string;
}
