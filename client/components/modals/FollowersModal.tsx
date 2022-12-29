import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { IFollow, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import FollowItem from "../follow/FollowItem";
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
const FollowersModal = ({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: IUser;
}) => {
  const [open, setOpen] = useState(false);
  const [followers, setFollowers] = useState<IFollow[]>();
  useEffect(() => {
    const getFollowers = async () => {
      try {
        await publicRequest
          .get("/follow/get_followers", {
            params: {
              user_id: currentUser._id,
            },
          })
          .then((res) => setFollowers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    if (open === true) {
      getFollowers();
    }
  }, [open]);
  return (
    <ModalProto open={open} setOpen={setOpen} openBtn={children}>
      <StyledFollowersContainer>
        <div className="top">
          <div className="top-l"></div>
          <div className="top-title">Followers</div>
          <div className="top-close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className="bottom">
          {followers?.map((item) => (
            <FollowItem isFollowers={true} key={item._id} follow={item} />
          ))}
        </div>
      </StyledFollowersContainer>
    </ModalProto>
  );
};

const CloseIcon = () => {
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
export default FollowersModal;
