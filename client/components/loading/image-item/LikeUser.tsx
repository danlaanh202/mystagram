import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../../redux/store";
import { IMedia, IUser } from "../../../types";

const StyledLikeUserContainer = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  .like-user-info {
    /* flex: 1; */
    &-username {
      color: #262626;
      font-weight: 600;
      cursor: pointer;
    }
    &-name {
      color: #8e8e8e;
      cursor: pointer;
    }
  }
  .like-user-btn-container {
    .like-user-btn {
      color: white;
      font-weight: 600;
      background: #0095f6;
      border-radius: 8px;
      padding: 6px 16px;
      cursor: pointer;
    }
    .following {
      background: #efefef;
      color: #262626;
      /* border: 1px solid #dbdbdb; */
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 44px !important;
  height: 44px !important;
  margin-right: 12px;
  cursor: pointer;
`;
const LikeUser = ({ lUser }: { lUser: IUser }) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  return (
    <StyledLikeUserContainer className="like-user">
      <Link href={`/${lUser.username}`}>
        <StyledAvatar src={(lUser?.avatar as IMedia)?.media_url} />
      </Link>
      <Link href={`/${lUser.username}`}>
        <div className="like-user-info">
          <div className="like-user-info-username">{lUser.username}</div>
          <div className="like-user-info-name">{lUser.name}</div>
        </div>
      </Link>

      {user._id === lUser._id ? (
        <></>
      ) : (
        <div className="like-user-btn-container">
          {(user.following as string[])?.includes(lUser._id as string) ? (
            <button className="like-user-btn following">Following</button>
          ) : (
            <button className="like-user-btn">Follow</button>
          )}
        </div>
      )}
    </StyledLikeUserContainer>
  );
};

export default LikeUser;
