import { publicRequest } from "./requestMethod";
import { Dispatch } from "@reduxjs/toolkit";
import { ILoginUser } from "../types";
import { clearUser, loginSuccess } from "../redux/userRedux";
export const login = async (dispatch: Dispatch<any>, user: ILoginUser) => {
  console.log(user);
  try {
    const res = await publicRequest.post("/auth/login", user);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }).then(() => dispatch(loginSuccess(res.data)));

    return "done";
  } catch (err) {
    console.log("fail");
    return "fail";
  }
};

export const logout = (dispatch: Dispatch<any>) => {
  dispatch(clearUser());
  // localStorage.removeItem("persist:root");
};
