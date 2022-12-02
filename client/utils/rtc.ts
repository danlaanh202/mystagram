import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { setLocalStream } from "../redux/rtcRedux";

export const constraints = { audio: true, video: { width: 1280, height: 720 } };
export const getLocalStream = (dispatch: Dispatch<AnyAction>) => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      dispatch(setLocalStream(stream));
    })
    .catch((err) => {
      console.log("err", err);
    });
};
