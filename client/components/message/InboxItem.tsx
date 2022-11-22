import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IRoom, IUser } from "../../types";
import { useRouter } from "next/router";

const StyledInboxItem = styled.div`
  padding: 8px 20px;
  display: flex;

  align-items: center;
  gap: 12px;
  cursor: pointer;
  .avtt {
    width: 56px;
    height: 56px;
  }
  :hover {
    background: #fafafa;
  }
  .inbox-info {
    .name {
    }
    .last-message {
      display: flex;
      color: #8e8e8e;
      .msg {
        ::after {
          content: "\\00B7";
          margin: 0 4px;
        }
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 56px !important;
  height: 56px !important;
`;
const InboxItem = ({ room }: { room: IRoom }) => {
  const router = useRouter();

  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [recipient, setRecipient] = useState<IUser>();

  useEffect(() => {
    room.users?.every((item: IUser, index) => {
      if (item._id !== user._id) {
        setRecipient(item);
        return false;
      }
      return true;
    });
  }, [room]);
  return (
    <StyledInboxItem
      style={
        router.asPath.split("/")[3] === room._id
          ? { background: "#efefef" }
          : {}
      }
      onClick={() => {
        if (router.asPath.split("/")[3] === room._id) {
          return;
        }
        router.push(`/direct/t/${room?._id}`);
      }}
    >
      <StyledAvatar
        className="avtt"
        src={(recipient?.avatar as IMedia)?.media_url}
      />
      <div className="inbox-info">
        <div className="name">{recipient?.name}</div>
        <div className="last-message">
          {room?.last_message ? (
            <>
              <div className="msg">{room.last_message.message}</div>
              <div className="date">2d</div>
            </>
          ) : (
            <div className="msg">You haven't chatted yet</div>
          )}
        </div>
      </div>
    </StyledInboxItem>
  );
};

export default InboxItem;
