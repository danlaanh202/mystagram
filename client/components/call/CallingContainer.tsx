import Avatar from "@mui/material/Avatar";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { socket } from "../../pages/_app";
import { IRootState } from "../../redux/store";
import { IUser } from "../../types";
import { useRouter } from "next/router";

declare global {
  interface Document {
    cancelFullscreen: any;
    mozCancelFullScreen: any;
    webkitExitFullscreen: any;
    fullscreenElement: any;
    mozFullScreenElement: any;
    webkitFullscreenElement: any;
    webkitCancelFullscreen: any;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
  // interface Element {
  //   ALLOW_KEYBOARD_INPUT: any;
  // }
}
const StyledCallingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .calling-child {
    display: none;
  }
  :hover {
    .calling-child {
      display: block;
    }
  }
`;
const StyledRemoteVideoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .remote-video {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg); /* Safari and Chrome */
    -moz-transform: rotateY(180deg); /* Firefox */
    object-fit: cover;
  }
`;
const StyledLocalVideoContainer = styled.div`
  position: absolute;
  width: 356px;
  height: 200px;
  right: 8px;
  bottom: 20px;
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  .local-video {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg); /* Safari and Chrome */
    -moz-transform: rotateY(180deg); /* Firefox */
    object-fit: cover;
  }
`;
const StyledLayerContainer = styled.div`
  position: absolute;
  inset: 0;
  color: #e4e6eb;
  .layer-top-container {
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px 16px;
    align-items: center;
    justify-content: space-between;
    .layer-left-container {
      display: flex;
      .layer-avatar-container {
        margin-right: 12px;
      }
      .call-info {
        &-container {
          font-size: 17px;
          line-height: 20px;
          font-weight: 600;
        }
      }
    }
    .layer-top-icon-container {
      display: flex;
      align-items: center;
      gap: 8px;
      .top-icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        :hover {
          background: #4d4d4d;
        }
      }
    }
  }
  .layer-control-container {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 16px;
    .control-btn {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      :hover {
        background: #4d4d4d;
      }
    }
  }
`;
const StyledCallEnded = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .ended-name {
    color: white;
    font-size: 20px;
    line-height: 1.16;
    font-weight: 700;
  }
  .ended-call {
    color: white;
    margin-top: 12px;
  }
`;
const EndedAvatar = styled(Avatar)`
  width: 100px !important;
  height: 100px !important;
  margin-bottom: 12px;
`;
export default function CallingContainer({
  myPeer,
  notMeUser,
}: {
  myPeer: any;
  notMeUser?: IUser;
}) {
  const { localStream, remoteStream } = useSelector(
    (state: IRootState) => state.rtc
  );
  const router = useRouter();
  const [isCalling, setIsCalling] = useState<boolean>(true);

  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);

  useEffect(() => {
    if (isCalling) {
      if (localStream && localStream.id && localVideoRef) {
        localVideoRef.current.srcObject = localStream;
        localVideoRef.current.onloadmetadata = () => {
          localVideoRef.current.play();
        };
      }
    }
  }, [localStream]);
  useEffect(() => {
    // console.log(remoteStream);
    if (isCalling) {
      if (remoteStream && remoteStream.id && remoteVideoRef) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.onloadmetadata = () => {
          remoteVideoRef.current.play();
        };
      }
    }
  }, [remoteStream]);
  const hangUpCall = () => {
    socket.emit("call_end", {
      userId: router.query?.caller,
      recipientId: router.query?.recipient_id,
    });
  };
  useEffect(() => {
    socket.on("call_ended", (data) => {
      setIsCalling(false);
    });
  }, [socket]);

  function toggleFullScreen() {
    if (
      !document.fullscreenElement && // alternative standard method
      !document["mozFullScreenElement"] &&
      !document["webkitFullscreenElement"]
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement["mozRequestFullscreen"]) {
        document.documentElement["mozRequestFullscreen"]();
      } else if (document.documentElement["webkitRequestFullscreen"]) {
        document.documentElement["webkitRequestFullscreen"]();
        // Element["ALLOW_KEYBOARD_INPUT"]();
      }
    } else {
      if (document["cancelFullscreen"]) {
        document["cancelFullscreen"]();
      } else if (document["mozCancelFullScreen"]) {
        document["mozCancelFullScreen"]();
      } else if (document["webkitCancelFullscreen"]) {
        document["webkitCancelFullscreen"]();
      }
    }
  }

  return (
    <StyledCallingContainer>
      {isCalling ? (
        <>
          <StyledRemoteVideoContainer className="">
            <video
              className="remote-video"
              autoPlay
              muted
              height="100%"
              ref={remoteVideoRef as LegacyRef<HTMLVideoElement>}
            ></video>
          </StyledRemoteVideoContainer>
          <StyledLocalVideoContainer className="">
            <video
              className="local-video"
              autoPlay
              muted
              width="355px"
              height="200px"
              ref={localVideoRef as LegacyRef<HTMLVideoElement>}
            ></video>
          </StyledLocalVideoContainer>
          <StyledLayerContainer className="calling-child">
            <div className="layer-top-container">
              <div className="layer-left-container">
                <div className="layer-avatar-container">
                  <Avatar />
                </div>
                <div className="call-info">
                  <div className="call-info-container">
                    Trần Thái Đan, Nguyễn Hoàng Bách
                  </div>
                  <div className="call-info-amount">2 people</div>
                </div>
              </div>
              <div className="layer-top-icon-container">
                <div className="top-icon-btn">
                  <SettingIcon />
                </div>
                <div className="top-icon-btn" onClick={toggleFullScreen}>
                  <FullScreenIcon />
                </div>
              </div>
            </div>
            <div className="layer-control-container">
              <div
                className="control-btn"
                onClick={() => {
                  const videoTrack = (
                    localStream as MediaStream
                  ).getVideoTracks();

                  if (videoTrack) {
                    if (videoTrack[0].enabled) {
                      videoTrack[0].enabled = false;
                    } else {
                      videoTrack[0].enabled = true;
                    }
                  }
                }}
              >
                <ToggleVideoIcon />
              </div>
              <div
                className="control-btn"
                onClick={() => {
                  const audioTrack = (
                    localStream as MediaStream
                  ).getAudioTracks();

                  if (audioTrack) {
                    if (audioTrack[0].enabled) {
                      audioTrack[0].enabled = false;
                    } else {
                      audioTrack[0].enabled = true;
                    }
                  }
                }}
              >
                <ToggleVoiceIcon />
              </div>
              <div className="control-btn" onClick={hangUpCall}>
                <CallOffIcon />
              </div>
            </div>
          </StyledLayerContainer>
        </>
      ) : (
        <StyledCallEnded>
          <EndedAvatar />
          <div className="ended-name">{notMeUser?.name}</div>
          <div className="ended-call">Call ended</div>
        </StyledCallEnded>
      )}
    </StyledCallingContainer>
  );
}

const SettingIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 36 36" width="36px" height="36px">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.842 7.526A1.5 1.5 0 0 0 18.419 6.5h-.838a1.5 1.5 0 0 0-1.423 1.026l-.352 1.056c-.157.472-.541.827-1.006 1.003a8.93 8.93 0 0 0-.487.202c-.453.204-.976.225-1.42.002l-.997-.498a1.5 1.5 0 0 0-1.732.281l-.592.592a1.5 1.5 0 0 0-.28 1.732l.497.996c.223.445.202.968-.002 1.421-.072.16-.139.323-.202.487-.176.465-.531.849-1.003 1.006l-1.056.352A1.5 1.5 0 0 0 6.5 17.581v.838a1.5 1.5 0 0 0 1.026 1.423l1.056.352c.472.157.827.541 1.003 1.006.063.164.13.327.202.487.204.453.225.976.002 1.42l-.498.997a1.5 1.5 0 0 0 .281 1.732l.593.592a1.5 1.5 0 0 0 1.73.28l.998-.497c.444-.223.967-.202 1.42.002.16.072.323.139.487.202.465.176.849.531 1.006 1.003l.352 1.056a1.5 1.5 0 0 0 1.423 1.026h.838a1.5 1.5 0 0 0 1.423-1.026l.352-1.056c.157-.472.541-.827 1.006-1.003.164-.063.327-.13.486-.202.454-.204.977-.225 1.421-.002l.997.498a1.5 1.5 0 0 0 1.732-.281l.592-.592a1.5 1.5 0 0 0 .28-1.732l-.497-.996c-.223-.445-.202-.968.002-1.421.072-.16.139-.323.202-.487.176-.465.531-.849 1.003-1.006l1.056-.352a1.5 1.5 0 0 0 1.026-1.423v-.838a1.5 1.5 0 0 0-1.026-1.423l-1.056-.352c-.472-.157-.827-.541-1.003-1.006a8.991 8.991 0 0 0-.202-.487c-.204-.453-.225-.976-.002-1.42l.498-.997a1.5 1.5 0 0 0-.281-1.732l-.593-.592a1.5 1.5 0 0 0-1.73-.28l-.998.497c-.444.223-.967.202-1.42-.002a8.938 8.938 0 0 0-.487-.202c-.465-.176-.849-.531-1.006-1.003l-.352-1.056zM18 23.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
      ></path>
    </svg>
  );
};
const FullScreenIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 36 36" width="36px" height="36px">
      <path d="M20.928 10.121a1 1 0 0 1 .49-1.683l6.361-1.413a1 1 0 0 1 1.194 1.193l-1.414 6.36a1 1 0 0 1-1.683.49l-1.414-1.413a.25.25 0 0 0-.353 0l-3.048 3.048a1 1 0 0 1-1.415 0l-.353-.353a1 1 0 0 1 0-1.415l3.048-3.048a.25.25 0 0 0 0-.353l-1.413-1.413zM15.069 25.875a1 1 0 0 1-.49 1.683l-6.361 1.414a1 1 0 0 1-1.193-1.194l1.413-6.36a1 1 0 0 1 1.683-.49l1.414 1.413a.25.25 0 0 0 .353 0l3.048-3.048a1 1 0 0 1 1.415 0l.353.353a1 1 0 0 1 0 1.415l-3.048 3.048a.25.25 0 0 0 0 .353l1.413 1.413z"></path>
    </svg>
  );
};
const ToggleVideoIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 36 36" width="36px" height="36px">
      <path d="M9 9.5a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4H9zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"></path>
    </svg>
  );
};
const ToggleVoiceIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 36 36" width="36px" height="36px">
      <path d="M14 11a4 4 0 0 1 8 0v5.5a4 4 0 0 1-8 0V11z"></path>
      <path d="M12.5 27.5a1 1 0 0 1 1-1h2.75a.5.5 0 0 0 .5-.5v-.66a.522.522 0 0 0-.425-.505A8.503 8.503 0 0 1 9.5 16.5V16a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v.5a6 6 0 0 0 12 0V16a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v.5a8.503 8.503 0 0 1-6.825 8.335.522.522 0 0 0-.425.505V26a.5.5 0 0 0 .5.5h2.75a1 1 0 0 1 1 1v.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-.5z"></path>
    </svg>
  );
};

const CallOffIcon = () => {
  return (
    <svg fill="currentColor" viewBox="0 0 36 36" width="36px" height="36px">
      <path d="M4.865 18.073c-.522 1.043-.396 2.26-.146 3.4a2.12 2.12 0 0 0 1.547 1.602c.403.099.812.175 1.234.175 1.276 0 2.505-.2 3.659-.568.642-.205 1.085-.775 1.206-1.438l.472-2.599a.488.488 0 0 1 .28-.36A11.959 11.959 0 0 1 18 17.25c1.739 0 3.392.37 4.883 1.035.148.066.251.202.28.36l.472 2.599c.12.663.564 1.233 1.206 1.438 1.154.369 2.383.568 3.66.568.421 0 .83-.077 1.233-.175a2.12 2.12 0 0 0 1.547-1.601c.25-1.14.377-2.358-.146-3.401-1.722-3.44-7.06-5.323-13.135-5.323S6.587 14.633 4.865 18.073z"></path>
    </svg>
  );
};
