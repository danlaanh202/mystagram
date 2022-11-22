import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { editUser } from "../../redux/userRedux";
import { IUser, IMedia } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import DotSpinner from "../DotSpinner";

const StyledSuggestionItem = styled.div`
  display: flex;
  padding: 8px 0;
  .info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    margin-left: 16px;

    .name-container {
      cursor: pointer;
      .username {
        color: #262626;
        font-weight: 600;
      }
      .followed {
        color: #8e8e8e;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
    }
    button {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      cursor: pointer;
      color: #0095f6;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
  cursor: pointer;
`;

const SuggestionItem = ({ currentUser }: { currentUser: IUser }) => {
  const router = useRouter();
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const toUser = () => {
    router.push(`/${currentUser.username}`);
  };
  const dispatch = useDispatch();
  const handleUnfollow = async () => {
    setFollowLoading(true);
    try {
      await Promise.all([
        publicRequest.delete("/follow/unfollow", {
          params: {
            user_id: currentUser._id,
            follower_id: user._id,
          },
        }),
        publicRequest.put("/user/update_unfollow", {
          user_id: currentUser._id,
          follower_id: user._id,
        }),
      ]).then((response) => {
        setFollowLoading(false);
        setIsFollowed(false);
        let [data1, data2] = response.map((item) => item.data);
        //data2.user is current url user info
        dispatch(editUser(data2.follower));
        // setThisUser(data2.user);
      });
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      await Promise.all([
        publicRequest.post("/follow/follow", {
          user_id: currentUser._id,
          follower_id: user._id,
        }),
        publicRequest.put("/user/update_follow", {
          user_id: currentUser._id,
          follower_id: user._id,
        }),
      ]).then((response) => {
        setFollowLoading(false);
        setIsFollowed(true);
        let [data1, data2] = response.map((item) => item.data);
        //data2.user is current url user info
        dispatch(editUser(data2.follower));
        // setThisUser(data2.user);
      });
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  return (
    <StyledSuggestionItem>
      <StyledAvatar
        onClick={toUser}
        src={(currentUser.avatar as IMedia)?.media_url}
      />
      <div className="info-container">
        <div className="name-container" onClick={toUser}>
          <div className="username">{currentUser.username}</div>
          <div className="followed">New user</div>
        </div>
        {followLoading ? (
          <DotSpinner />
        ) : isFollowed ? (
          <button onClick={handleUnfollow}>Unfollow</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </StyledSuggestionItem>
  );
};

export default SuggestionItem;
