import axios from "axios";

export const publicRequest = axios.create({
  baseURL: process.env.API_URL,
});

export const pushNotification = async (data: any) =>
  await publicRequest.post("/noti/push_notification", data);
