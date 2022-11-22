import axios from "axios";

export const publicRequest = axios.create({
  baseURL: process.env.API_URL,
});
