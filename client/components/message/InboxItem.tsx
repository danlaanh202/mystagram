import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IRoom, IUser } from "../../types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { handleSeenMessages } from "../../redux/headerStatusRedux";
import { format, formatDistanceStrict } from "date-fns";
import { getShortTime } from "../../utils";

const StyledInboxItem = styled.div`
  padding: 8px 20px;
  display: flex;
  position: relative;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  overflow: hidden;
  .avtt {
    width: 56px;
    height: 56px;
  }
  :hover {
    background: #fafafa;
  }
  .inbox-info {
    flex: 1;
    .name {
    }
    .name-noti {
      color: #262626;
      font-weight: 600;
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
      .msg-noti {
        color: #262626;
        font-weight: 600;
      }
    }
  }
  .not-seen-mark {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background: #0095f6;
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 56px !important;
  height: 56px !important;
`;
const InboxItem = ({
  room,
  handleSeen,
}: {
  room: IRoom;
  handleSeen: (room: IRoom) => void;
}) => {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [recipient, setRecipient] = useState<IUser>();
  const [isSeen, setIsSeen] = useState(true);
  const dispatch = useDispatch();
  console.log(room.last_message);
  useEffect(() => {
    room.users?.every((item: IUser, index) => {
      if (item._id !== user._id) {
        setRecipient(item);
        return false;
      }
      return true;
    });
    if ((room.last_message?.user as string) !== user._id) {
      setIsSeen(room.last_message?.is_seen as boolean);
    }
  }, [room]);
  useEffect(() => {
    if (!isSeen && router.asPath.split("/").includes(room._id as string)) {
      setIsSeen(true);
      handleSeen(room);
      dispatch(handleSeenMessages({ room: room._id as string }));
    }
  }, [router.asPath, isSeen]);
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
        <div className={`name ${isSeen ? "" : "name-noti"}`}>
          {recipient?.name}
        </div>
        <div className="last-message">
          {room?.last_message?._id ? (
            <>
              <div className={`msg ${isSeen ? "" : "msg-noti"}`}>
                {room.last_message?.message}
              </div>
              <div className="date">
                {(room.last_message?._id &&
                  getShortTime(
                    formatDistanceStrict(
                      new Date(room.last_message?.created_at as string),
                      Date.now()
                    )
                  )) ||
                  "1s"}
              </div>
            </>
          ) : (
            <div className="msg">You haven't chatted yet</div>
          )}
        </div>
      </div>
      {!isSeen && <div className="not-seen-mark"></div>}
    </StyledInboxItem>
  );
};

export default InboxItem;
