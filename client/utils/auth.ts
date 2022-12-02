import { publicRequest } from "./requestMethod";
import { Dispatch } from "@reduxjs/toolkit";
import { ILoginUser } from "../types";
import { clearUser, loginSuccess } from "../redux/userRedux";
export const login = async (dispatch: Dispatch<any>, user: ILoginUser) => {
  try {
    const res = await publicRequest
      .post("/auth/login", user)
      .then((response) => {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        return response;
      });
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => dispatch(loginSuccess(res.data)));
    // await setTimeout(() => {
    //   dispatch(loginSuccess(res.data));
    // }, 2000);
    return "done";
  } catch (err) {
    return "fail";
  }
};

export const logout = (dispatch: Dispatch<any>) => {
  dispatch(clearUser());
  sessionStorage.removeItem("user");
};
