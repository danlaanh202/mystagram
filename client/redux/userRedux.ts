import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";
export interface UserState {
  user: IUser;
  accessToken?: string;
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    accessToken: "",
  },
  reducers: {
    loginStart: (state) => {},
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    editUser: (state, action: PayloadAction<UserState>) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearUser: (state) => {
      state.user = {};
    },
  },
});
export const { loginStart, loginSuccess, editUser, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
