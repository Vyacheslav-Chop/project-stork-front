export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  dueDate: string | null;
  babyGender: "Дівчинка" | "Хлопчик" | "Ще не знаю" | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface UserPayload {
  name?: string;
  email?: string;
  babyGender?: "Дівчинка" | "Хлопчик" | "Ще не знаю";
  dueDate?: string;
}

export type Gender = "Дівчинка" | "Хлопчик" | "Ще не знаю";


export type LoginPayload = {
  email: string;
  password: string;
};