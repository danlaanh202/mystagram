import { Avatar } from "@mui/material";
import axios from "axios";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IRoom, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import Spinner from "../Spinner";
import ModalProto from "./ModalProto";
const StyledSendNewMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .top {
    background: white;
    width: 400px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #262626;
    border-radius: 16px 16px 0 0;
    &-icon-container {
      padding: 0 16px;
    }
    &-title {
      color: #262626;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }
    &-next {
      padding: 0 16px;
      color: rgb(0, 149, 246);
      cursor: pointer;
    }
  }
  .center {
    padding: 8px 0;
    background: white;
    border-top: 1px solid #dbdbdb;
    display: flex;
    width: 400px;
    &-to {
      font-weight: 600;
      color: #262626;
      font-size: 16px;
      line-height: 24px;
      padding: 0 12px;
    }
    &-right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .center-input-container {
        .center-input {
          border: none;
          outline: none;
          font-size: 14px;
          line-height: 30px;
          padding: 0 12px;
        }
      }
      .member {
        display: flex;
        align-items: center;
        margin: 4px;
        color: #0095f6;
        background: #e0f1ff;
        padding: 4px 12px;
        border-radius: 8px;
        span {
          margin-right: 8px;
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: white;
    border-top: 1px solid #dbdbdb;
    padding-top: 16px;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
    .suggested {
      padding-left: 16px;
      margin-bottom: 16px;
    }
    .user-items {
      height: 300px;
      overflow-y: scroll;
    }
  }
`;

const SendNewMessageModal = ({
  type = 1,
  setInboxList,
}: {
  type: number;
  setInboxList: Dispatch<SetStateAction<IRoom[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [recipients, setRecipients] = useState<IUser[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [checkedUser, setCheckedUser] = useState<IUser[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const handleCheck = (selectedUser: IUser) => {
    if (checkedIds.includes(selectedUser?._id as string)) {
      handleRemoveChecked(selectedUser);
    } else {
      setCheckedIds((prev) => [...prev, selectedUser?._id as string]);
      setCheckedUser((prev) => [...prev, selectedUser]);
    }
  };
  const handleRemoveChecked = (selectedUser: IUser) => {
    let newCheckedUser = [...checkedUser];
    let newCheckedIds = [...checkedIds];
    let indexOfUser = checkedIds.findIndex((e) => e === selectedUser._id);
    newCheckedIds.splice(indexOfUser, 1);
    setCheckedIds(newCheckedIds);
    newCheckedUser.splice(indexOfUser, 1);
    setCheckedUser(newCheckedUser);
  };
  const handleCreateNewRoom = async () => {
    setIsCreating(true);
    try {
      if (checkedIds.length === 0) {
        setIsCreating(false);
        return;
      } else if (checkedIds.length === 1) {
        await publicRequest
          .post("/room/create_room", {
            my_user: user._id,
            recipient: checkedIds[0],
          })
          .then((response) => {
            setIsCreating(false);
            setOpen(false);
            setInboxList((prev: IRoom[]) => {
              const prevList = [...prev];
              if (!prevList || prevList.length === 0) {
                return [response.data];
              }
              const position = prev
                .map((e) => e._id)
                .indexOf(response.data._id);
              if (position > -1) {
                prevList.splice(position, 1);
              }
              return [response.data, ...prevList];
            });
          });
      } else if (checkedIds.length > 1) {
        setIsCreating(false);
        //this feature is for future
        // await publicRequest
        //   .post("/room/create_group", {
        //     recipients: [user._id, ...checkedIds],
        //   })
        //   .then((response) => console.log(response.data));
      }
    } catch (error) {
      setIsCreating(false);
    }
  };
  useEffect(() => {
    const getUserWithoutMe = async () => {
      try {
        await publicRequest
          .get("/user/get_users_without_me", {
            params: {
              userId: user._id,
            },
          })
          .then((response) => setRecipients(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getUserWithoutMe();
  }, []);
  return (
    <ModalProto
      open={open}
      setOpen={setOpen}
      openBtn={
        type === 1 ? (
          <NewMessageIcon />
        ) : (
          <div className="send-msg-btn">Send Message</div>
        )
      }
    >
      <StyledSendNewMessage>
        <div className="top">
          <div className="top-icon-container">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(false);
                setCheckedIds([]);
                setCheckedUser([]);
              }}
            >
              <XIcon />
            </div>
          </div>
          <div className="top-title">New message</div>
          <button onClick={handleCreateNewRoom} className="top-next">
            {isCreating ? (
              <Spinner width={20} height={20} color="black" borderSize={2} />
            ) : (
              "Next"
            )}
          </button>
        </div>
        <div className="center">
          <div className="center-to">To:</div>
          <div className="center-right">
            {checkedIds?.length > 0 &&
              checkedUser.map((item: IUser, index) => (
                <div key={item._id} className="member">
                  <span>{item?.username}</span>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveChecked(item)}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              ))}

            <div className="center-input-container">
              <input
                type="text"
                placeholder="Search..."
                className="center-input"
              />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="suggested">Suggested</div>
          <div className="user-items">
            {recipients?.length > 0 &&
              recipients?.map((item: IUser) => (
                <UserItem
                  key={item._id}
                  handleCheck={handleCheck}
                  isActive={!checkedIds.includes(item._id as string)}
                  user={item}
                />
              ))}
          </div>
        </div>
      </StyledSendNewMessage>
    </ModalProto>
  );
};
const StyledUserItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  cursor: pointer;
  :hover {
    background: #fafafa;
  }
  .user-avt {
    width: 44px !important;
    height: 44px !important;
  }
  .user-item-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    .user-container {
      .username {
        color: #262626;
        display: inline;
        font-weight: 600;

        .name {
          color: #8e8e8e;
        }
      }
    }
  }
`;

const UserItem = ({
  isActive,
  user,
  handleCheck,
}: {
  isActive?: Boolean;
  user: IUser;
  handleCheck: (selectedUser: IUser) => void;
}) => {
  const handleSelectedRecipients = () => {
    handleCheck(user);
  };
  return (
    <StyledUserItem onClick={handleSelectedRecipients}>
      <Avatar
        className="user-avt"
        src={(user.avatar as IMedia)?.media_url as string}
      />
      <div className="user-item-right">
        <div className="user-container">
          <div className="username">{user.username}</div>
          <div className="name">{user.name}</div>
        </div>
        <div>
          <CircleIcon isActive={isActive} />
        </div>
      </div>
    </StyledUserItem>
  );
};
const NewMessageIcon = () => {
  return (
    <svg
      aria-label="New message"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <path
        d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.848"
        x2="20.076"
        y1="3.924"
        y2="7.153"
      ></line>
    </svg>
  );
};
const XIcon = () => {
  return (
    <svg
      aria-label="Close"
      color="#262626"
      fill="#262626"
      height="18"
      role="img"
      viewBox="0 0 24 24"
      width="18"
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
const DeleteIcon = ({}: {}) => {
  return (
    <svg
      aria-label="Delete Item"
      color="#0095f6"
      fill="#0095f6"
      height="12"
      role="img"
      viewBox="0 0 24 24"
      width="12"
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
const CircleIcon = ({ isActive = false }: { isActive?: Boolean }) => {
  return (
    <svg
      aria-label="Toggle selection"
      color={isActive ? "#262626" : "#0095f6"}
      fill={isActive ? "#262626" : "#0095f6"}
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      {isActive ? (
        <circle
          cx="12.008"
          cy="12"
          fill="none"
          r="11.25"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        ></circle>
      ) : (
        <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"></path>
      )}
    </svg>
  );
};
export default SendNewMessageModal;
