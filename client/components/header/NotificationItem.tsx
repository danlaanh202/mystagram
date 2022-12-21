import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IMedia, INotification, IPost, IUser } from "../../types";
import { useRouter } from "next/router";
import { publicRequest } from "../../utils/requestMethod";
const StyledNotificationItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .avatar-container {
  }
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
    }
  }
  .notification-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    .notification-img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .not-seen {
      width: 8px;
      height: 8px;
      background: #1876f2;
      border-radius: 100%;
      margin-right: 8px;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 44px !important;
  height: 44px !important;
`;
const NotificationItem = ({
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
    <StyledNotificationItem
      onClick={() => {
        if (!noti.is_seen) {
          setSeen(noti._id as string);
          seenUpdate();
        }
        router.push(`/p/${(noti.post as IPost)._id}`);
      }}
    >
      <div className="avatar-container">
        <StyledAvatar
          src={
            ((noti?.notification_from as IUser)?.avatar as IMedia)?.media_url
          }
        />
      </div>
      <div className="notification">
        <div
          className="notification-username"
          // style={noti.is_seen ? {} : { color: "#1876f2" }}
        >
          {(noti.notification_from as IUser).username}
        </div>
        <div className="notification-type">
          {noti.notification_type === "like"
            ? " liked your photo"
            : `commented: ${""}`}
        </div>
      </div>
      <div className="notification-btn">
        {noti.is_seen ? <></> : <div className="not-seen"></div>}
        <img
          className="notification-img"
          src={((noti.post as IPost)?.media as IMedia)?.media_url}
          alt=""
        />
      </div>
    </StyledNotificationItem>
  );
};

export default NotificationItem;
