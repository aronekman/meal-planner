import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:8000/api" : "/api"
});
