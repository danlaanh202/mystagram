import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IFollow, IUser } from "../../types";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import Link from "next/link";
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
    }
  }
  .l-btn {
    color: #262626;
    font-weight: 600;
    padding: 4px 8px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
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
  return (
    <StyledFollowItem>
      <Link
        href={`/${
          isFollowers
            ? (follow.follow_by as IUser)?.username
            : (follow.user as IUser)?.username
        }`}
      >
        <StyledAvatar />
      </Link>
      <StyledInfoContainer>
        <Link
          href={`/${
            isFollowers
              ? (follow.follow_by as IUser)?.username
              : (follow.user as IUser)?.username
          }`}
        >
          <div className="l-info">
            <div className="l-info_username">
              {isFollowers
                ? (follow.follow_by as IUser)?.username
                : (follow.user as IUser)?.username}
            </div>
            <div className="l-info_name">
              {isFollowers
                ? (follow.follow_by as IUser)?.name
                : (follow.user as IUser)?.name}
            </div>
          </div>
        </Link>
        <button className="l-btn">
          {!isFollowers
            ? (user.following as string[])?.includes(
                (follow.user as IUser)._id as string
              )
              ? "following"
              : "follow"
            : (user.following as string[])?.includes(
                (follow.follow_by as IUser)._id as string
              )
            ? "following"
            : "follow"}
        </button>
      </StyledInfoContainer>
    </StyledFollowItem>
  );
};

export default FollowItem;
