import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { IMedia, INotification, IPost, IUser } from "../types";

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
  return (
    <StyledActivityNotiContainer>
      <StyledAvatar />

      <div className="notification">
        <div
          className="notification-username"
          style={noti.is_seen ? {} : { color: "#1876f2" }}
        >
          {(noti.notification_from as IUser).username}
        </div>
        <div className="notification-type">
          {noti.notification_type === "like"
            ? " liked your photo"
            : `commented: ${""}`}
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
