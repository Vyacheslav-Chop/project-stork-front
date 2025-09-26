// import { ApiResponse } from "@/types/user";
import { nextServer } from "./api";
import { Task } from "@/types/tasks";
import { ApiResponse, UserResponse, NewUser } from "../../types/user";
import { BabyWeekData } from "@/types/babyWeekData";
import { Emotion } from "@/types/emotions";

export async function register(newUser: NewUser): Promise<UserResponse> {
  const res = await nextServer.post<ApiResponse>("/auth/register", newUser);
  return res.data.data;
}

export const login = async (payload) => {
  const res = await nextServer.post("/auth/login", payload);

  return res.data;
};

export const refresh = async () => {
  const res = await nextServer.post("/auth/refresh");

  return res.data;
};

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export const getDiaries = async () => {
  const res = await nextServer.get("/diaries");

  return res.data.data;
};

export const createDiary = async (payload) => {
  const res = await nextServer.post("/diaries", payload);

  return res.data.data;
};

export const updateDiary = async (diaryId, payload) => {
  const res = await nextServer.patch(`/diaries/${diaryId}`, payload);

  return res.data.data;
};

export const deleteDiary = async (diaryId) => {
  await nextServer.delete(`/diaries/${diaryId}`);
};

export const getDiaryById = async (diaryId) => {
  const res = await nextServer.get(`/diaries/${diaryId}`);

  return res.data.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await nextServer.get<Task[]>("/tasks");

  return res.data;
};

export const createTask = async (payload) => {
  const res = await nextServer.post("/tasks", payload);

  return res.data.data;
};

export const updateTaskStatusById = async (taskId) => {
  const res = await nextServer.patch(`/tasks/${taskId}/status`);

  return res.data.data;
};

export const getUser = async (): Promise<ApiResponse> => {
  const res = await nextServer.get<ApiResponse>("/users");

  return res.data;
};

export const updateUser = async (payload) => {
  const res = await nextServer.patch("/users", payload);

  return res.data.data;
};

export const updateUserAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await nextServer.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const getWeekStatic = async (week: number): Promise<BabyWeekData> => {
  const res = await nextServer.get("/weeks/public", {
    params: { week },
  });

  return res.data.data.weekData;
};

export const getWeekDynamic = async () => {
  const res = await nextServer.get("/weeks/private");

  return res.data.data;
};

export const getMomState = async (week) => {
  const res = await nextServer.get(`/weeks/mom-state/${week}`);

  return res.data.data;
};

export const getBabyState = async (week: number): Promise<BabyWeekData> => {
  const res = await nextServer.get(`/weeks/baby-state/${week}`);

  return res.data;
};

export const getEmotions = async (): Promise<Emotion[]> => {
  const res = await nextServer.get("/emotions");

  return res.data.data;
};
