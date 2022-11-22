import axios from "axios";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

export default function useRequestAxios() {
  const user = useSelector((state: IRootState) => state.user);
  const userRequest = axios.create({
    baseURL: process.env.API_URL,
    headers: { token: `Bearer ${user.accessToken}` },
  });
  return {
    userRequest,
  };
}
