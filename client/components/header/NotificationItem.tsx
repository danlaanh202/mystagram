import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IComment, IMedia, INotification, IPost, IUser } from "../../types";
import { useRouter } from "next/router";
import { publicRequest } from "../../utils/requestMethod";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { editUser } from "../../redux/userRedux";
import FollowButton from "../button/FollowButton";
import {
  handleFollowUtil,
  handleUnfollowUtil,
  pushNotification,
  removeNotification,
} from "../../utils";
import { socket } from "../../pages/_app";
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
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const seenUpdate = async () => {
    await publicRequest.put("/noti/seen", { noti_id: noti?._id });
  };
  const handleUnfollow = async () => {
    setFollowLoading(true);
    try {
      handleUnfollowUtil(
        (noti?.notification_from as IUser)._id as string,
        user._id as string
      ).then(async (response) => {
        setFollowLoading(false);
        setIsFollowed(false);
        let [data1, data2] = response.map((item) => item.data);
        //data2.user is current url user info
        dispatch(editUser(data2.follower));
        // setThisUser(data2.user);
        removeNotification({
          type: "follow",
          myId: user._id as string,
          otherId: (noti?.notification_from as IUser)._id as string,
        });
      });
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      handleFollowUtil(
        (noti?.notification_from as IUser)._id as string,
        user._id as string
      ).then((response) => {
        setFollowLoading(false);
        setIsFollowed(true);
        let [data1, data2] = response.map((item) => item.data);
        //data2.user is current url user info
        dispatch(editUser(data2.follower));
        // setThisUser(data2.user);
        pushNotification({
          socket: socket,
          type: "follow",
          myId: user._id as string,
          otherId: (noti?.notification_from as IUser)._id as string,
        });
      });
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  useEffect(() => {
    if (user && noti.notification_type === "follow")
      setIsFollowed(
        (user.following as string[])?.includes(
          (noti.notification_from as IUser)._id as string
        )
      );
  }, [user]);
  return (
    <StyledNotificationItem
      onClick={() => {
        if (!noti.is_seen) {
          setSeen(noti._id as string);
          seenUpdate();
        }
        if (noti.notification_type !== "follow") {
          router.push(`/p/${(noti.post as IPost)._id}`);
        } else if (noti.notification_type === "follow") {
          return;
        }
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
          {noti.notification_type === "like" && " liked your photo"}

          {noti.notification_type === "comment" &&
            `commented: ${(noti.comment as IComment)?.comment}`}
          {noti.notification_type === "follow" && <>started following you</>}
        </div>
      </div>
      <div className="notification-btn">
        {noti.is_seen ? <></> : <div className="not-seen"></div>}
        {noti.notification_type !== "follow" && (
          <img
            className="notification-img"
            src={((noti.post as IPost)?.media as IMedia)?.media_url}
            alt=""
          />
        )}
        {noti.notification_type === "follow" && (
          <FollowButton
            followLoading={followLoading}
            isFollowed={isFollowed}
            primary={true}
            handleUnfollow={handleUnfollow}
            handleFollow={handleFollow}
          />
        )}
      </div>
    </StyledNotificationItem>
  );
};

export default NotificationItem;
