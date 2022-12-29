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
import DotSpinner from "../loading/DotSpinner";

const StyledSuggestionItem = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
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
      .name {
        color: #8e8e8e;
      }
      .followed {
        color: #8e8e8e;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;
export interface AvatarProps {
  isprimary: boolean;
}
export interface ButtonProps extends AvatarProps {
  isFollow: boolean;
}
const StyledAvatar = styled(Avatar)<AvatarProps>`
  width: ${(props) => (props.isprimary ? "44px" : "32px")} !important;
  height: ${(props) => (props.isprimary ? "44px" : "32px")} !important;
  cursor: pointer;
`;
const StyledButton = styled.button<ButtonProps>`
  font-weight: 600;
  font-size: ${(props) => (props.isprimary ? "14px" : "12px")};
  line-height: ${(props) => (props.isprimary ? "18px" : "16px")};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  min-width: ${(props) => (props.isprimary ? "70px" : "auto")};
  color: ${(props) =>
    props.isprimary ? (props.isFollow ? "#ed4956" : "white") : "#0095f6"};
  background: ${(props) =>
    props.isprimary ? (props.isFollow ? "white" : "#0095f6") : "white"};
  border: ${(props) =>
    props.isprimary && props.isFollow ? "1px solid #dbdbdb" : ""};
`;
const SuggestionItem = ({
  currentUser,
  primary = true,
}: {
  currentUser: IUser;
  primary?: boolean;
}) => {
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
        src={(currentUser?.avatar as IMedia)?.media_url}
        isprimary={primary}
      />
      <div className="info-container">
        <div className="name-container" onClick={toUser}>
          <div className="username">
            {currentUser?.username || "insta_user"}
          </div>
          {primary && <div className="name">Người dùng instagram</div>}
          <div className="followed">New user</div>
        </div>
        {followLoading ? (
          <DotSpinner />
        ) : isFollowed ? (
          <StyledButton
            isFollow={isFollowed}
            isprimary={primary}
            onClick={handleUnfollow}
          >
            Unfollow
          </StyledButton>
        ) : (
          <StyledButton
            isFollow={isFollowed}
            isprimary={primary}
            onClick={handleFollow}
          >
            Follow
          </StyledButton>
        )}
      </div>
    </StyledSuggestionItem>
  );
};

export default SuggestionItem;
