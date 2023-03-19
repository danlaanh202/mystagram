import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IFollow, IUser } from "../../types";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import Link from "next/link";
import {
  handleFollowUtil,
  handleUnfollowUtil,
  pushNotification,
  removeNotification,
} from "../../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/userRedux";
import { socket } from "../../pages/_app";
import DotSpinner from "../loading/DotSpinner";
const StyledFollowItem = styled.div`
  width: 100%;
  padding: 8px 16px;
  display: flex;
`;
const StyledAvatar = styled(Avatar)`
  height: 44px !important;
  width: 44px !important;
  margin-right: 12px;
  cursor: pointer;
`;
const StyledInfoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  .l-info {
    color: #262626;
    cursor: pointer;
    /* flex: 1; */
    &_username {
      font-weight: 600;
    }
    &_name {
      color: #9d9d9d;
    }
  }
  .l-btn {
    background: #0095f6;

    color: white;
    font-weight: 600;
    padding: 6px 16px;

    border-radius: 8px;
    cursor: pointer;
  }
`;
const FollowItem = ({
  follow,
  isFollowers = true,
  modalOff = () => {},
}: {
  follow: IFollow;
  isFollowers: boolean;
  modalOff: () => void;
}) => {
  console.log("Follow", follow);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  console.log("Logged user", user);
  const [currentUser, setCurrentUser] = useState<IUser>(
    !isFollowers ? (follow.user as IUser) : (follow.follow_by as IUser)
  );
  const [isFollowed, setIsFollowed] = useState<boolean>(
    !isFollowers
      ? (user.following as string[])?.includes(
          (follow.user as IUser)._id as string
        )
        ? true
        : false
      : (user.following as string[])?.includes(
          (follow.follow_by as IUser)._id as string
        )
      ? true
      : false
  );

  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleUnfollow = async () => {
    setFollowLoading(true);
    try {
      handleUnfollowUtil(currentUser._id as string, user._id as string).then(
        async (response) => {
          setFollowLoading(false);
          setIsFollowed(false);
          let [data1, data2] = response.map((item) => item.data);
          //data2.user is current url user info
          dispatch(editUser(data2.follower));
          // setThisUser(data2.user);
          removeNotification({
            type: "follow",
            myId: user._id as string,
            otherId: currentUser._id as string,
          });
        }
      );
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      handleFollowUtil(currentUser._id as string, user._id as string).then(
        (response) => {
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
            otherId: currentUser._id as string,
          });
        }
      );
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  return (
    <StyledFollowItem>
      <Link href={`/${currentUser.username}`}>
        <StyledAvatar onClick={modalOff} />
      </Link>
      <StyledInfoContainer>
        <Link href={`/${currentUser.username}`}>
          <div className="l-info" onClick={modalOff}>
            <div className="l-info_username">{currentUser.username}</div>
            <div className="l-info_name">{currentUser.name}</div>
          </div>
        </Link>
        {followLoading ? (
          <DotSpinner />
        ) : user._id !== currentUser._id ? (
          isFollowed ? (
            <button
              className="l-btn"
              onClick={handleUnfollow}
              style={{
                background: "white",
                color: "#262626",
                border: "1px solid #dbdbdb",
              }}
            >
              following
            </button>
          ) : (
            <button className="l-btn" onClick={handleFollow}>
              follow
            </button>
          )
        ) : (
          <></>
        )}
      </StyledInfoContainer>
    </StyledFollowItem>
  );
};

export default FollowItem;
