import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const rtcSlice = createSlice({
  name: "rtc",
  initialState: {
    localStream: {},
    remoteStream: {},
    peerId: "",
    isCallerAnswer: false,
  },
  reducers: {
    setLocalStream: (state, action: PayloadAction<MediaStream>) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action: PayloadAction<MediaStream>) => {
      state.remoteStream = action.payload;
    },
    setPeerId: (state, action) => {
      state.peerId = action.payload;
    },
    setCallerAnswer: (state, action) => {
      state.isCallerAnswer = action.payload;
    },
  },
});
export const { setLocalStream, setRemoteStream, setPeerId, setCallerAnswer } =
  rtcSlice.actions;
export default rtcSlice.reducer;
