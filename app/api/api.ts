import axios from "axios";

export const api = axios.create({
  baseURL: "https://beckend-project-stork.onrender.com/api",
  // baseURL: "http://localhost:3001/api",

  withCredentials: true,
});
