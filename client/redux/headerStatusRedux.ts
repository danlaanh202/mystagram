import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUnseenMessages {
  room: string;
  _id: string;
}
const headerSlice = createSlice({
  name: "header",
  initialState: {
    unseenMessages: [] as IUnseenMessages[],
    unseenNotifications: [],
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
  },
});
export const { setUnseenMessages, handleSeenMessages, uploadUnseenMessages } =
  headerSlice.actions;
export default headerSlice.reducer;
