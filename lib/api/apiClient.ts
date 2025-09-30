import { nextServer } from "./api";
import { CreateTaskProps, Task, UpdateTaskProps } from "@/types/tasks";
import { UserResponse, NewUser, UserPayload } from "../../types/user";
import {
  ApiWeekResponse,
  WeekTip,
  WeekTipResponse,
} from "@/types/babyWeekData";
import { Emotion } from "@/types/emotions";
import { BabyState, WeekRes } from "@/types/babyState";
import { MomState } from "@/types/momState";
import { AxiosRes } from "@/types/generic";
import type { LoginResponse, LoginPayload } from "@/types/auth";
import { CreateDiary, DiaryData } from "@/types/diaries";

export async function register(newUser: NewUser): Promise<UserResponse> {
  const res = await nextServer.post<AxiosRes<UserResponse>>(
    "/auth/register",
    newUser
  );
  return res.data.data;
}

export const login = async (payload: LoginPayload): Promise<void> => {
  const res = await nextServer.post("/auth/login", payload);
  return res.data;
};

export const refresh = async (): Promise<void> => {
  const res = await nextServer.post("/auth/refresh");

  return res.data;
};

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export const getDiaries = async (): Promise<DiaryData[]> => {
  const res = await nextServer.get<DiaryData[]>("/diaries");
  return res.data;
};

export const createDiary = async (payload: CreateDiary): Promise<DiaryData> => {
  const res = await nextServer.post<AxiosRes<DiaryData>>("/diaries", payload);
  return res.data.data;
};

export const updateDiary = async (
  diaryId: string,
  payload: CreateDiary
): Promise<DiaryData> => {
  const res = await nextServer.patch<AxiosRes<DiaryData>>(
    `/diaries/${diaryId}`,
    payload
  );

  return res.data.data;
};

export const deleteDiary = async (diaryId: string) => {
  await nextServer.delete(`/diaries/${diaryId}`);
};

export const getDiaryById = async (diaryId: string): Promise<DiaryData> => {
  const res = await nextServer.get<AxiosRes<DiaryData>>(`/diaries/${diaryId}`);
  return res.data.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await nextServer.get<AxiosRes<Task[]>>("/tasks");

  return res.data.data;
};

export const createTask = async (payload: CreateTaskProps): Promise<Task> => {
  const res = await nextServer.post<AxiosRes<Task>>("/tasks", payload);

  return res.data.data;
};

export const updateTaskStatusById = async (taskId: string): Promise<Task> => {
  const res = await nextServer.patch<AxiosRes<Task>>(
    `/tasks/${taskId}/status`,
    undefined
  );
  return res.data.data;
};

export const updateTaskById = async (
  taskId: string,
  payload: UpdateTaskProps
): Promise<Task> => {
  const res = await nextServer.patch<AxiosRes<Task>>(
    `/tasks/${taskId}`,
    payload
  );
  return res.data.data;
};

export const getUser = async (): Promise<UserResponse> => {
  const res = await nextServer.get<AxiosRes<UserResponse>>("/users");

  return res.data.data;
};

export const updateUser = async (
  payload: UserPayload
): Promise<UserResponse> => {
  const res = await nextServer.patch<AxiosRes<UserResponse>>("/users", payload);

  return res.data.data;
};

export const updateUserAvatar = async (file: File): Promise<UserResponse> => {
  const formData = new FormData();
  console.log(file instanceof File);

  formData.append("avatar", file, file.name);

  const res = await nextServer.patch<AxiosRes<UserResponse>>(
    "/users/avatar",
    formData
  );
  return res.data.data;
};

export const getWeekStatic = async (): Promise<WeekRes> => {
  const res = await nextServer.get<AxiosRes<WeekRes>>("/weeks/public");

  return res.data.data;
};

export const getWeekDynamic = async (): Promise<WeekRes> => {
  const res = await nextServer.get<AxiosRes<WeekRes>>("/weeks/private");

  return res.data.data;
};

export const getMomState = async (week: number): Promise<MomState> => {
  const res = await nextServer.get<AxiosRes<MomState>>(
    `/weeks/mom-state/${week}`
  );

  return res.data.data;
};

export const getBabyState = async (week: number): Promise<BabyState> => {
  const res = await nextServer.get<AxiosRes<BabyState>>(
    `/weeks/baby-state/${week}`
  );

  return res.data.data;
};

export const getEmotions = async (): Promise<Emotion[]> => {
  const res = await nextServer.get("/emotions");
  return res.data.data;
};
