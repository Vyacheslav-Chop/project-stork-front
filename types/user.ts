export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  dueDate: string | null;
  babyGender: 'Дівчинка' | 'Хлопчик' | 'Ще не знаю' | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  status: number;
  message: string;
  data: UserResponse;
}
export interface User {
  username: string;
  email: string;
}

export type NewUser = {
  name: string;
  email: string;
  password: string;
};