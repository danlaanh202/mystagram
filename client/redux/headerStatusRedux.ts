import { INotification } from "./../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUnseenMessages {
  room: string;
  _id: string;
}
const headerSlice = createSlice({
  name: "header",
  initialState: {
    isUnseenNotification: false,
    unseenMessages: [] as IUnseenMessages[],
    unseenNotifications: [] as INotification[],
    title: "",
  },
  reducers: {
    setUnseenMessages: (state, action: PayloadAction<IUnseenMessages[]>) => {
      state.unseenMessages = action.payload;
    },
    uploadUnseenMessages: (state, action: PayloadAction<IUnseenMessages>) => {
      let pos = state.unseenMessages
        .map((item) => item.room)
        .indexOf(action.payload.room);
      if (pos >= 0) {
        state.unseenMessages.splice(pos, 1);
      }
      state.unseenMessages = [...state.unseenMessages, action.payload];
    },
    handleSeenMessages: (state, action: PayloadAction<{ room: string }>) => {
      let pos = state.unseenMessages
        .map((item) => item.room)
        .indexOf(action.payload.room);
      if (pos >= 0) {
        state.unseenMessages.splice(pos, 1);
      }
    },
    setUnseenNotifications: (
      state,
      action: PayloadAction<INotification[]>
    ) => {},
    setIsUnseenNotification: (state, action: PayloadAction<boolean>) => {
      state.isUnseenNotification = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    clearTitle: (state) => {
      state.title = "";
    },
  },
});
export const {
  setUnseenMessages,
  handleSeenMessages,
  uploadUnseenMessages,
  setIsUnseenNotification,
  setTitle,
  clearTitle,
} = headerSlice.actions;
export default headerSlice.reducer;
