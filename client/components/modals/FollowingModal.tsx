import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { IFollow, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import FollowItem from "../follow/FollowItem";
import { CloseIcon } from "./LikeUsersModal";

import ModalProto from "./ModalProto";
const StyledFollowersContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 12px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    padding: 4px 0;
    &-l {
      width: 50px;
    }
    &-title {
      color: #262626;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
    }
    &-close {
      padding: 8px 16px;
      cursor: pointer;
    }
  }
  .bottom {
    height: 360px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
`;
const FollowingModal = ({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: IUser;
}) => {
  const [open, setOpen] = useState(false);
  const [following, setFollowing] = useState<IFollow[]>();
  useEffect(() => {
    const getFollowing = async () => {
      try {
        await publicRequest
          .get("/follow/get_following", {
            params: {
              user_id: currentUser._id,
            },
          })
          .then((res) => setFollowing(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    if (open === true) {
      getFollowing();
    }
  }, [open]);
  return (
    <ModalProto open={open} setOpen={setOpen} openBtn={children}>
      <StyledFollowersContainer>
        <div className="top">
          <div className="top-l"></div>
          <div className="top-title">Following</div>
          <div className="top-close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className="bottom">
          {following?.map((item) => (
            <FollowItem isFollowers={false} key={item._id} follow={item} />
          ))}
        </div>
      </StyledFollowersContainer>
    </ModalProto>
  );
};

export default FollowingModal;
