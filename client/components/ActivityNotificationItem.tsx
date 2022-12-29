import Avatar from "@mui/material/Avatar";
import { formatDistance, formatDistanceStrict } from "date-fns";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IMedia, INotification, IPost, IUser } from "../types";
import { getShortTime } from "../utils";
import { publicRequest } from "../utils/requestMethod";

const StyledActivityNotiContainer = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  .notification {
    display: flex;
    gap: 4px;
    flex: 1;
    margin: 0 12px;
    &-username {
      color: #262626;
      font-weight: 600;
    }
    &-type {
      color: #262626;
      display: flex;
      gap: 8px;
    }
  }
  .right-btn {
    .notification-img {
      width: 40px;
      height: 40px;
    }
  }
`;
const StyledAvatar = styled(Avatar)``;
const ActivityNotificationItem = ({
  noti,
  setSeen,
}: {
  noti: INotification;
  setSeen: (id: string) => void;
}) => {
  const router = useRouter();
  const seenUpdate = async () => {
    await publicRequest.put("/noti/seen", { noti_id: noti?._id });
  };
  return (
    <StyledActivityNotiContainer
      onClick={() => {
        if (!noti.is_seen) {
          setSeen(noti._id as string);
          seenUpdate();
        }
        router.push(`/p/${(noti.post as IPost)._id}`);
      }}
    >
      <StyledAvatar
        alt="avatar"
        src={((noti.notification_from as IUser).avatar as IMedia)?.media_url}
      />
      <div className="notification">
        <div
          className="notification-username"
          style={noti.is_seen ? {} : { color: "#1876f2" }}
        >
          {(noti.notification_from as IUser).username}
        </div>
        <div className="notification-type">
          <span>
            {noti.notification_type === "like"
              ? " liked your photo"
              : `commented: ${""}`}
          </span>
          <div className="date">
            {getShortTime(
              formatDistanceStrict(
                new Date(noti?.created_at as string),
                Date.now()
              )
            )}
          </div>
        </div>
      </div>
      <div className="right-btn">
        {noti.is_seen ? <></> : <div className="not-seen"></div>}
        <img
          className="notification-img"
          src={((noti.post as IPost)?.media as IMedia)?.media_url}
          alt=""
        />
      </div>
    </StyledActivityNotiContainer>
  );
};

export default ActivityNotificationItem;
