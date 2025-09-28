// import { ApiResponse } from "@/types/user";
import { nextClient, nextServer } from "./api";
import { CreateTaskProps, Task, UpdateTaskProps } from "@/types/tasks";
import { UserResponse, NewUser, UserPayload } from "../../types/user";
import {
  ApiWeekResponse,
  BabyWeekData,
  WeekTip,
  WeekTipResponse,
} from "@/types/babyWeekData";
import { Emotion } from "@/types/emotions";
import { BabyState, WeekRes } from "@/types/babyState";
import { MomState } from "@/types/momState";
import { AxiosRes } from "@/types/generic";

export async function register(newUser: NewUser): Promise<UserResponse> {
  const res = await nextServer.post<AxiosRes<UserResponse>>("/auth/register", newUser);
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
  const res = await nextServer.get<AxiosRes<Task[]>>("/tasks");

  return res.data.data;
};

export const createTask = async (payload: CreateTaskProps): Promise<Task> => {
  const res = await nextServer.post<AxiosRes<Task>>("/tasks", payload);

  return res.data.data;
};

export const updateTaskStatusById = async (
  taskId: string,
  payload: UpdateTaskProps
): Promise<Task> => {
  const res = await nextServer.patch<AxiosRes<Task>>(
    `/tasks/${taskId}/status`,
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
  const res = await nextServer.patch<AxiosRes<UserResponse>>(
    "/users",
    payload
  );

  return res.data.data;
};

export const updateUserAvatar = async (file: File): Promise<UserResponse> => {
  const formData = new FormData();

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

export const getWeekDynamic = async () => {
  const res = await nextServer.get("/weeks/private");

  return res.data.data;
};

export const getMomState = async (week: number): Promise<MomState> => {
  const res = await nextServer.get<MomState>(
    `/weeks/mom-state/${week}`
  );

  return res.data;
};

export const getBabyState = async (week: number): Promise<BabyState> => {
  const res = await nextServer.get<BabyState>(`/weeks/baby-state/${week}`);

  return res.data;
};

export const getEmotions = async (): Promise<Emotion[]> => {
  const res = await nextServer.get("/emotions");

  return res.data.data;
};

export const getPublicMomTips = async (): Promise<WeekTip> => {
  const res = await nextClient.get<ApiWeekResponse<WeekTipResponse>>(
    "/weeks/public"
  );

  return res.data.data.weekData.momDailyTips;
};

export const getPrivateMomTips = async (): Promise<WeekTip> => {
  const res = await nextClient.get<ApiWeekResponse<WeekTipResponse>>(
    "/weeks/private"
  );

  return res.data.data.weekData.momDailyTips;
};
