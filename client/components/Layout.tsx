import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { socket } from "../pages/_app";
import { uploadUnseenMessages } from "../redux/headerStatusRedux";

import { IMedia, IMessage, IRoom, IUser } from "../types";
import { publicRequest } from "../utils/requestMethod";
import Header from "./Header";
const StyledContainer = styled.div`
  padding-top: 62px;
`;
const StyledCallModal = styled.div`
  width: 400px;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  .call-modal-name {
    color: #262626;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;
    margin-top: 18px;
    margin-bottom: 8px;
  }
  .incoming {
    color: #8e8e8e;
    margin-bottom: 32px;
  }
  .call-btn-container {
    display: flex;

    .call-btn {
      width: 52px;
      height: 52px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .decline {
      background: #ed4956;
      margin-right: 24px;
    }
    .join {
      background: #58c322;
    }
  }
`;
const StyledCallAvatar = styled(Avatar)`
  width: 92px !important;
  height: 92px !important;
`;
const Layout = ({ children }: { children: ReactNode }) => {
  const [openCallModal, setOpenCallModal] = useState(false);
  const [caller, setCaller] = useState<IUser>();
  const [peerId, setPeerId] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenCallModal(false);
  };
  useEffect(() => {
    socket.on(
      "receive_call",
      async ({
        peer_id,
        caller,
        recipient_id,
      }: {
        peer_id: string;
        caller: string;
        recipient_id: string;
      }) => {
        // console.log("receive", peer_id, caller, recipient_id);
        setPeerId(peer_id);
        setRecipientId(recipient_id);
        await publicRequest
          .get("/user/get_user", {
            params: {
              user_id: caller,
            },
          })
          .then((response) => setCaller(response.data));

        setOpenCallModal(true);
      }
    );
    socket.on("receive_message_notification", (data: IMessage) => {
      dispatch(
        uploadUnseenMessages({
          room: data.room as string,
          _id: data._id as string,
        })
      );
    });
  }, [socket]);

  return (
    <>
      <Header />
      {children}
      <>
        {openCallModal && (
          <Modal
            open={openCallModal}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <StyledCallModal>
              <StyledCallAvatar src={(caller?.avatar as IMedia)?.media_url} />
              <audio src="instagram.mp3" autoPlay loop></audio>
              <div className="call-modal-name">{caller?.name}</div>
              <div className="incoming">Incoming video call...</div>
              <div className="call-btn-container">
                <button onClick={handleClose} className="call-btn decline">
                  <DeclineIcon />
                </button>
                <button
                  className="call-btn join"
                  onClick={() => {
                    handleClose();
                    window.open(
                      `http://localhost:3000/call?peer_id=${peerId}&recipient_id=${recipientId}&caller=${caller?._id}`
                    );
                  }}
                >
                  <JoinCallIcon />
                </button>
              </div>
            </StyledCallModal>
          </Modal>
        )}
      </>
    </>
  );
};
const DeclineIcon = () => {
  return (
    <svg
      aria-label="Decline Call"
      color="#ffffff"
      fill="#ffffff"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <polyline
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></polyline>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      ></line>
    </svg>
  );
};
const JoinCallIcon = () => {
  return (
    <svg
      aria-label="Join Call"
      color="#ffffff"
      fill="#ffffff"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M21.259 5.935q-.401.404-.877.88a2.998 2.998 0 0 0-.88 2.121v6.18a3 3 0 0 0 .878 2.121l.879.881A1.653 1.653 0 0 0 24 16.953V7.101a1.653 1.653 0 0 0-2.742-1.166Zm-7.075-3.408H3.818A3.823 3.823 0 0 0-.001 6.345v11.364a3.823 3.823 0 0 0 3.819 3.818h10.366a3.823 3.823 0 0 0 3.818-3.818V6.345a3.823 3.823 0 0 0-3.818-3.818Z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};
export default Layout;
