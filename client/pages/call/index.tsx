import Avatar from "@mui/material/Avatar";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as rtc from "../../utils/rtc";

import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { IRootState } from "../../redux/store";

import { useSelector } from "react-redux";
import { socket } from "../_app";
import { useDispatch } from "react-redux";
import usePeer from "../../hooks/usePeer";
import { setLocalStream, setRemoteStream } from "../../redux/rtcRedux";
import { IMedia, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import CallLoadingBar from "../../components/loading/CallLoadingBar";
import CallingContainer from "../../components/call/CallingContainer";
import ToggleVoiceIcon from "../../components/call/ToggleVoiceIcon";

const StyledCallContainer = styled.div`
  background: black;
  width: 100vw;
  height: 100vh;
  /* max-height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledCenterContainer = styled.div`
  height: 424px;
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StyledLeftContainer = styled.div`
  height: 100%;
  background: #1f1f1f;
  width: 640px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  .content-container {
    flex: 1;
    background: #18191a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .video {
      transform: rotateY(180deg);
      -webkit-transform: rotateY(180deg); /* Safari and Chrome */
      -moz-transform: rotateY(180deg); /* Firefox */
      object-fit: cover;
      width: 100% !important;
    }
    .off-icon {
      width: 48px;
      height: 48px;
      svg {
        fill: #b0b3b8;
      }
    }
    .text-camera {
      color: #b0b3b8;
      font-weight: 600;
    }
  }
  .btn-container {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    .camera-btn {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background: #363636;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      :hover {
        background: rgba(255, 255, 255, 0.3);
      }
      svg {
        fill: white;
        width: 24px;
        height: 24px;
      }
      :disabled {
        background: #4c4c4c;
        cursor: not-allowed;
      }
    }
  }
`;
const StyledRightContainer = styled.div`
  height: 100%;
  background: #1f1f1f;
  width: 348px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  .name {
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
  }
  .des {
    margin: 8px 0;
  }
  .call-btn {
    min-width: 86px;
    color: white;
    margin-top: 20px;
    padding: 0 12px;
    background: #429aff;
    font-size: 16px;
    line-height: 26px;
    font-weight: 500;
    border-radius: 12px;
    cursor: pointer;
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 72px !important;
  height: 72px !important;
  margin-bottom: 16px;
`;
const Call = () => {
  const { localStream, isCallerAnswer } = useSelector(
    (state: IRootState) => state.rtc
  );

  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const [myPeer, myPeerId] = usePeer();
  const [isAnswered, setIsAnswered] = useState(false);
  const localVideoRef = useRef<any>(null);
  const [notMeUser, setNotMeUser] = useState<IUser>();
  const [loadingJoinCall, setLoadingJoinCall] = useState(false);
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  useEffect(() => {
    rtc.getLocalStream(dispatch);
    socket.emit("rtc_active", { user: user });
  }, []);
  useEffect(() => {
    if (myPeer) {
      if (router.query.peer_id) {
        navigator.mediaDevices
          .getUserMedia(rtc.constraints)
          .then((stream) => {
            dispatch(setLocalStream(stream));
            const call = myPeer.call(router.query.peer_id, stream);
            console.log(call);
            call.on("stream", (incomingStream: MediaStream) => {
              dispatch(setRemoteStream(incomingStream));
            });
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      if (router.query.caller === user._id) {
        myPeer.on("call", (call: any) => {
          navigator.mediaDevices
            .getUserMedia(rtc.constraints)
            .then((stream) => {
              dispatch(setLocalStream(stream));
              call.answer(stream);
              call.on("stream", (incomingStream: MediaStream) => {
                dispatch(setRemoteStream(incomingStream));
              });
            })
            .catch((err) => {
              console.log("err", err);
            });
        });
      }
    }
  }, [myPeer, router.query]);

  useEffect(() => {
    if (localStream && localStream.id) {
      const audioTrack = (localStream as MediaStream).getAudioTracks();
      setIsAudio(audioTrack[0].enabled);
      const videoTrack = (localStream as MediaStream).getVideoTracks();
      setIsVideo(videoTrack[0].enabled);

      if (localVideoRef && localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.onloadmetadata = () => {
          localVideoRef.current.play();
        };
      }
    }
  }, [localStream]);
  useEffect(() => {
    socket.on("call_answered", (data) => {
      console.log(data);
      setIsAnswered(true);
      setLoadingJoinCall(false);
    });
  }, [socket]);
  useEffect(() => {
    const getUser = async () => {
      let notSelfUser =
        user._id === router.query.caller
          ? router.query.recipient_id
          : router.query.caller;

      try {
        await publicRequest
          .get("/user/get_user", {
            params: {
              user_id: notSelfUser,
            },
          })
          .then((response) => setNotMeUser(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [router.query]);
  return (
    <StyledCallContainer>
      <Head>
        <title>Instagram Call</title>
      </Head>

      {isAnswered ? (
        <CallingContainer myPeer={myPeer} notMeUser={notMeUser} />
      ) : (
        <StyledCenterContainer>
          <StyledLeftContainer>
            <div className="content-container">
              {isVideo ? (
                <video
                  className="video"
                  autoPlay
                  muted
                  width="640px"
                  height="360px"
                  ref={localVideoRef}
                ></video>
              ) : (
                <>
                  <div className="off-icon">
                    <CameraOffIcon />
                  </div>
                  <div className="text-camera">Camera off</div>
                </>
              )}
            </div>
            <div className="btn-container">
              <button
                className="camera-btn"
                onClick={() => {
                  // const videoTrack = (localStream as MediaStream)
                  //   .getTracks()
                  //   .find((track) => track.kind === "video");
                  // if (videoTrack) {
                  //   if (videoTrack.enabled) {
                  //     videoTrack.enabled = false;
                  //     setIsVideo(false);
                  //   } else {
                  //     videoTrack.enabled = true;
                  //     setIsVideo(true);
                  //   }
                  // }
                }}
              >
                <TurnCameraIcon />
              </button>
              <button
                className="camera-btn"
                onClick={() => {
                  const audioTrack = (
                    localStream as MediaStream
                  ).getAudioTracks();

                  if (audioTrack) {
                    if (audioTrack[0].enabled) {
                      audioTrack[0].enabled = false;
                      setIsAudio(false);
                    } else {
                      audioTrack[0].enabled = true;
                      setIsAudio(true);
                    }
                  }
                }}
              >
                <ToggleVoiceIcon isOn={isAudio} />
              </button>
              <button className="camera-btn">
                <VolumeUpIcon />
              </button>
              <button className="camera-btn">
                <SettingsIcon />
              </button>
            </div>
          </StyledLeftContainer>
          <StyledRightContainer>
            <StyledAvatar src={(notMeUser?.avatar as IMedia)?.media_url} />
            <div className="name">{notMeUser?.name}</div>
            <div className="des">Ready to call?</div>
            {user._id === router.query.caller ? (
              <button
                disabled={loadingJoinCall}
                className="call-btn"
                onClick={() => {
                  socket.emit("call", {
                    userId: router.query.caller,
                    recipientId: router.query.recipient_id,
                    peerId: myPeerId,
                  });
                  setLoadingJoinCall(true);
                }}
              >
                {loadingJoinCall ? <CallLoadingBar /> : "Start call"}
              </button>
            ) : (
              <button
                className="call-btn"
                onClick={() => {
                  socket.emit("call_answer", {
                    userId: router.query.caller,
                    recipientId: router.query.recipient_id,
                    isAnswer: true,
                  });
                  setIsAnswered(true);
                }}
              >
                Join call
              </button>
            )}
          </StyledRightContainer>
        </StyledCenterContainer>
      )}
    </StyledCallContainer>
  );
};

export default Call;

const CameraOffIcon = () => {
  return (
    <svg viewBox="0 0 48 48">
      <path d="M13.022 29.736c-.514.514-1.514.266-1.514-.724V19.007a4 4 0 013.999-4.002h10.112c.787 0 1.182.953.625 1.51l-13.222 13.22zm20.675-15.029l-2.608 2.61a1.998 1.998 0 00-.585 1.412l-.002 10.283a3.992 3.992 0 01-3.996 3.995h-10.27c-.53 0-1.039.21-1.414.585l-3.116 3.117a.999.999 0 11-1.413-1.414l21.99-22.002a.999.999 0 111.414 1.414zm3.356 14.704l-3.722-1.864a1.503 1.503 0 01-.83-1.343v-4.388c0-.569.322-1.089.83-1.343l3.722-1.864a1 1 0 011.447.895v9.012a1 1 0 01-1.447.895z"></path>
    </svg>
  );
};
const TurnCameraIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 36 36" width="32px" height="32px">
      <path d="M9 9.5a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4H9zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"></path>
    </svg>
  );
};
