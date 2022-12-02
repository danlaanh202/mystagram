import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Message from "../../../components/message/Message";
import MessageLayout from "../../../components/message/MessageLayout";
import { IRootState } from "../../../redux/store";
import { IMedia, IMessage, IRoom, IUser } from "../../../types";
import { v4 as uuidv4 } from "uuid";
import { publicRequest } from "../../../utils/requestMethod";
import { socket } from "../../_app";
import { useDispatch } from "react-redux";

const StyledMessageContainer = styled.div`
  flex-direction: column;
  background: #fafafa;
  height: 100vh;
  overflow: hidden;
`;
const StyledMessageBox = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const StyledTopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #dbdbdb;
  height: 60px;
  background: white;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 12px;
    .name {
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }
  }
  .right {
    button {
      padding: 8px;
      cursor: pointer;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 24px !important;
  height: 24px !important;
`;
const StyledMessages = styled.div`
  flex: 1;
  display: flex;
  background: white;
  overflow-y: scroll;
  .messages-container {
    flex: 1;
    padding: 20px 20px 0;
  }
`;
const StyledInputContainer = styled.div`
  padding: 12px 20px;
  background: white;
  .input-box {
    border: 1px solid #dbdbdb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 24px;
    padding: 0 12px;
    .input-container {
      flex: 1;
      input {
        width: 100%;
        border: none;
        outline: none;
        overflow: auto;
        height: 18px;
      }
    }
    .right-container {
      display: flex;
      gap: 12px;
    }
  }
`;
const DivA = styled.div`
  padding: 8px;
`;
const StyledMessagesChild = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
`;
const BottomDiv = styled.div`
  height: 1px;
  width: 100%;
`;
export interface ITempLastMsg {
  _id: string;
  message: string;
}
const MessagePage = ({ initialMessages }: { initialMessages: IMessage[] }) => {
  const router = useRouter();
  const roomId = router.query.roomId;
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [inboxList, setInboxList] = useState<IRoom[]>([]);
  const [recipient, setRecipient] = useState<IUser>();
  const [newMsg, setNewMsg] = useState<IMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<ITempLastMsg>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });
  const onSendMessageHandler = async (data: { message: string }) => {
    reset();
    setToBottom();
    setLastMessage({ _id: roomId as string, message: data.message });
    if (data.message) {
      const uuid = uuidv4();
      socket.emit("send_message", {
        user_id: user._id,
        message: data.message,
        room_id: roomId,
      });
      setNewMsg((prev: IMessage[]) => [
        { user: user, message: data.message, uuid: uuid } as IMessage,
        ...prev,
      ]);
    }
  };
  useEffect(() => {
    socket.emit("join_conversation", {
      room_id: roomId,
    });
    setToBottom();
    const getRoomById = async () => {
      await publicRequest(`/room/get_room_by_id`, {
        params: {
          roomId: roomId,
        },
      }).then((response) => {
        response.data?.users.map(
          (item: IUser) => item._id !== user._id && setRecipient(item)
        );
      });
    };
    setNewMsg([]);
    getRoomById();
  }, [roomId]);

  useEffect(() => {
    socket.on("receive_message", (msg: IMessage) => {
      setNewMsg((prev: IMessage[]) => [msg, ...prev]);
    });
  }, [socket]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const setToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <StyledMessageContainer>
      <Head>
        <title>Instagram • Chats</title>
      </Head>
      <MessageLayout
        inboxList={inboxList}
        setInboxList={setInboxList}
        lastMessage={lastMessage}
      >
        <StyledMessageBox>
          <StyledTopContainer>
            <div className="left">
              <StyledAvatar src={(recipient?.avatar as IMedia)?.media_url} />
              <div className="name">{recipient?.name}</div>
            </div>
            <div className="right">
              <button>
                <AudioIcon />
              </button>
              <button
                onClick={() =>
                  window.open(
                    `http://localhost:3000/call?caller=${
                      user._id as string
                    }&recipient_id=${recipient?._id}`
                  )
                }
              >
                <VideoCallIcon />
              </button>
              <button>
                <DetailsIcon />
              </button>
            </div>
          </StyledTopContainer>
          <StyledMessages>
            <div className="messages-container">
              <StyledMessagesChild>
                <BottomDiv ref={bottomRef}></BottomDiv>
                {newMsg?.length > 0 &&
                  newMsg?.map((item, index) => (
                    <Message
                      recipient={recipient}
                      key={item.uuid || item._id}
                      message={item}
                    />
                  ))}
                {initialMessages?.map((item) => (
                  <Message
                    recipient={recipient}
                    key={item._id}
                    message={item}
                  />
                ))}
              </StyledMessagesChild>
            </div>
          </StyledMessages>
          <StyledInputContainer>
            <div className="input-box">
              <DivA className="">
                <EmojiIcon />
              </DivA>
              <DivA className="input-container">
                <form
                  onSubmit={handleSubmit(
                    onSendMessageHandler as SubmitHandler<FieldValues>
                  )}
                >
                  <input
                    type="text"
                    placeholder="Message..."
                    {...register("message")}
                  />
                </form>
              </DivA>
              <DivA className="right-container">
                <button>
                  <AddPhotoIcon />
                </button>
                <button>
                  <LikeIcon />
                </button>
              </DivA>
            </div>
          </StyledInputContainer>
        </StyledMessageBox>
      </MessageLayout>
    </StyledMessageContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await axios
    .get(`${process.env.API_URL}/message/get`, {
      params: {
        room_id: context.query.roomId,
      },
    })
    .then((response) => response.data.docs);
  return {
    props: {
      initialMessages: messages,
    },
  };
};
const AudioIcon = () => {
  return (
    <svg
      aria-label="Audio call"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
    </svg>
  );
};
const VideoCallIcon = () => {
  return (
    <svg
      aria-label="Video call"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <rect
        fill="none"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="16.999"
        x="1"
        y="3"
      ></rect>
      <path
        d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};
const DetailsIcon = () => {
  return (
    <svg
      aria-label="View Thread Details"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle
        cx="12.001"
        cy="12.005"
        fill="none"
        r="10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
      <circle cx="11.819" cy="7.709" r="1.25"></circle>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="10.569"
        x2="13.432"
        y1="16.777"
        y2="16.777"
      ></line>
      <polyline
        fill="none"
        points="10.569 11.05 12 11.05 12 16.777"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  );
};
const EmojiIcon = () => {
  return (
    <svg
      aria-label="Emoji"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
    </svg>
  );
};
const AddPhotoIcon = () => {
  return (
    <svg
      aria-label="Add Photo or Video"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
        fillRule="evenodd"
      ></path>
      <path
        d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <path
        d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};
const LikeIcon = () => {
  return (
    <svg
      aria-label="Like"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
    </svg>
  );
};
export default MessagePage;
