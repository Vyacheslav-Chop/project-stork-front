export type AxiosRes<T> = {
  status: number;
  message: string;
  data: T;
};
