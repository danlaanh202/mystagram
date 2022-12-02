import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IPost, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import ModalProto from "./ModalProto";

const StyledLikeUsersContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background: white;
  width: 400px;
  height: 400px;
  max-height: calc(100vh - 40px);
  border-radius: 12px;
  flex-direction: column;
  overflow: hidden;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #dbdbdb;
    &-title {
      font-size: 16px;
      line-height: 24px;
      color: #262626;
      font-weight: 600;
    }
    &-icon {
      padding: 8px 16px;
      cursor: pointer;
    }
    &-temp {
      width: 50px;
    }
  }
  .bottom {
    flex: 1;
    overflow-y: scroll;
    .like-users-container {
      .like-user {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        &-info {
          flex: 1;
          &-username {
            color: #262626;
            font-weight: 600;
          }
          &-name {
            color: #8e8e8e;
          }
        }
        &-btn-container {
          .like-user-btn {
            color: white;
            font-weight: 600;
            background: #0095f6;
            border-radius: 4px;
            padding: 6px 24px;
            cursor: pointer;
          }
          .following {
            background: white;
            color: #262626;
            border: 1px solid #dbdbdb;
          }
        }
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 44px !important;
  height: 44px !important;
  margin-right: 12px;
`;
const LikeUsersModal = ({ post }: { post: IPost }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [likeUsers, setLikeUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getLikeUsers = async () => {
      try {
        await publicRequest
          .get("/like/get_like_users", {
            params: {
              post_id: post._id,
            },
          })
          .then((response) => setLikeUsers(response.data));
      } catch (error) {}
    };
    if (open === true) {
      getLikeUsers();
    }
  }, [post, open]);
  return (
    <ModalProto
      open={open}
      setOpen={setOpen}
      openBtn={
        <div
          style={{
            padding: "0 8px",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "600",
            color: "#262626",
          }}
        >
          {post.likes?.length > 1
            ? `${post.likes.length} likes`
            : `${post.likes.length} like`}
        </div>
      }
    >
      <StyledLikeUsersContainer>
        <div className="top">
          <div className="top-temp"></div>
          <div className="top-title">Likes</div>
          <div className="top-icon" onClick={() => setOpen(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className="bottom">
          <div className="like-users-container">
            {likeUsers?.length > 0 &&
              likeUsers.map((item) => <LikeUser lUser={item} />)}
          </div>
        </div>
      </StyledLikeUsersContainer>
    </ModalProto>
  );
};
const LikeUser = ({ lUser }: { lUser: IUser }) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  return (
    <div className="like-user">
      <StyledAvatar src={(lUser?.avatar as IMedia)?.media_url} />
      <div className="like-user-info">
        <div className="like-user-info-username">{lUser.username}</div>
        <div className="like-user-info-name">{lUser.name}</div>
      </div>
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
    </div>
  );
};
export default LikeUsersModal;

export const CloseIcon = () => {
  return (
    <svg
      aria-label="Close"
      color="#262626"
      fill="#262626"
      height="18"
      role="img"
      viewBox="0 0 24 24"
      width="18"
    >
      <polyline
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      ></polyline>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      ></line>
    </svg>
  );
};
