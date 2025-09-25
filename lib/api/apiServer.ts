import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Task } from "@/types/tasks";

export const refreshServer = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.post("/auth/refresh", null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const logOutServer = async () => {
  const cookieStore = await cookies();

  await nextServer.post("/auth/logout", null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getDiariesServer = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/diaries", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const createDiaryServer = async (payload) => {
  const cookieStore = await cookies();

  const res = await nextServer.post("/diaries", payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const updateDiaryServer = async (diaryId, payload) => {
  const cookieStore = await cookies();

  const res = await nextServer.patch(`/diaries/${diaryId}`, payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const deleteDiaryServer = async (diaryId) => {
  const cookieStore = await cookies();

  await nextServer.delete(`/diaries/${diaryId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getDiaryByIdServer = async (diaryId) => {
  const cookieStore = await cookies();

  const res = await nextServer.get(`/diaries/${diaryId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getTasksServer = async (): Promise<Task[]> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<Task[]>("/tasks", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const createTaskServer = async (payload) => {
  const cookieStore = await cookies();

  const res = await nextServer.post("/tasks", payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const updateTaskStatusByIdServer = async (taskId) => {
  const cookieStore = await cookies();

  const res = await nextServer.patch(`/tasks/${taskId}/status`, null, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getUserServer = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/users", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const updateUserServer = async (payload) => {
  const cookieStore = await cookies();

  const res = await nextServer.patch("/users", payload, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const updateUserAvatarServer = async (file: File) => {
  const cookieStore = await cookies();

  const formData = new FormData();
  formData.append("avatar", file);

  const res = await nextServer.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getWeekStaticServer = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/weeks/public", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getWeekDynamicServer = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/weeks/private", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getMomStateServer = async (week: number) => {
  const cookieStore = await cookies();

  const res = await nextServer.get(`/weeks/mom-state/${week}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};

export const getBabyStateServer = async (week: number) => {
  const cookieStore = await cookies();

  const res = await nextServer.get(`/weeks/baby-state/${week}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data.data;
};
