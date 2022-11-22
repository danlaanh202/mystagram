import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { ITempLastMsg } from "../../pages/direct/t/[roomId]";
import { socket } from "../../pages/_app";
import { IRootState } from "../../redux/store";
import { IRoom, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import SendNewMessageModal from "../modals/SendNewMessageModal";
import InboxItem from "./InboxItem";

const StyledInboxList = styled.div`
  width: 350px;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const StyledTopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  height: 60px;
  .change-account {
    display: flex;
    align-items: center;

    span {
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
      padding-right: 12px;
    }
  }
`;
const StyledInboxs = styled.div`
  width: 100%;
  padding: 8px 0;
  flex: 1;
  border-right: 1px solid #dbdbdb;
  overflow-y: scroll;
`;
const InboxList = ({
  lastMessage,
  inboxList,
  setInboxList,
}: {
  lastMessage?: ITempLastMsg;
  inboxList: IRoom[];
  setInboxList: Dispatch<SetStateAction<IRoom[]>>;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  // const [inboxList, setInboxList] = useState<IRoom[]>([]);
  useEffect(() => {
    socket.on("update_last_message_room", (updatedRoom) => {
      setInboxList((prev: IRoom[]) => {
        const prevList = [...prev];
        const position = prev.map((e) => e._id).indexOf(updatedRoom._id);
        if (position > -1) {
          prevList.splice(position, 1);
        }
        return [updatedRoom, ...prevList];
      });
    });
  }, [socket]);
  useEffect(() => {
    setInboxList((prev: IRoom[]) => {
      const prevList = [...prev];
      const pos = prev.map((e) => e._id).indexOf(lastMessage?._id);
      let temp: IRoom = {
        ...prevList[pos],
        _id: lastMessage?._id,
        last_message: {
          ...prevList[pos]?.last_message,
          message: lastMessage?.message as string,
        },
      };
      prevList.splice(pos, 1);
      return [temp, ...prevList];
    });
  }, [lastMessage]);
  useEffect(() => {
    const getInboxList = async () => {
      await publicRequest("/room/get_rooms", {
        params: {
          userId: user._id,
        },
      }).then((response) => setInboxList(response.data));
    };
    getInboxList();
  }, []);
  return (
    <StyledInboxList>
      <StyledTopContainer>
        <div></div>
        <div className="change-account">
          <span>{user?.username}</span>
          <DownIcon />
        </div>
        <div>
          <SendNewMessageModal setInboxList={setInboxList} type={1} />
        </div>
      </StyledTopContainer>
      <StyledInboxs>
        {inboxList?.length > 0 &&
          inboxList?.map((item, index) => (
            <InboxItem key={item._id} room={item} />
          ))}
      </StyledInboxs>
    </StyledInboxList>
  );
};
const DownIcon = () => {
  return (
    <svg
      aria-label="Down chevron icon"
      color="#262626"
      fill="#262626"
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
    </svg>
  );
};
export default InboxList;