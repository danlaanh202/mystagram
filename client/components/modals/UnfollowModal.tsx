import Avatar from "@mui/material/Avatar";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { FollowIcon } from "../../pages/[username]";
import { IUser } from "../../types";
import { md } from "../../utils/responsive";
import ModalProto from "./ModalProto";
const StyledUnfollowModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  ${md({
    width: "80%",
  })}
  .avatar-container {
    margin: 32px 16px 16px;
    display: flex;
    /* align-items: center; */
    justify-content: center;
  }
  .unfollow-text {
    color: #262626;
    text-align: center;
    margin: 16px 32px;
  }
  .unfollow-btn {
    color: #ed4956;
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 90px !important;
  height: 90px !important;
`;
const StyledButton = styled.button`
  width: 100%;
  min-height: 48px;
  border-top: 1px solid #dbdbdb;
  cursor: pointer;
  font-weight: 700;
  padding: 4px 8px;
`;
const UnfollowModal = ({
  open,
  setOpen,
  handleUnfollow,
  otherUser,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleUnfollow: () => {};
  otherUser: IUser;
}) => {
  return (
    <ModalProto openBtn={<FollowIcon />} open={open} setOpen={setOpen}>
      <StyledUnfollowModalContainer>
        <div className="avatar-container">
          <StyledAvatar />
        </div>
        <div className="unfollow-text">Unfollow @{otherUser?.username}?</div>
        <StyledButton
          className="unfollow-btn"
          onClick={() => {
            handleUnfollow();
            setOpen(false);
          }}
        >
          Unfollow
        </StyledButton>
        <StyledButton onClick={() => setOpen(false)} className="cancel-btn">
          Cancel
        </StyledButton>
      </StyledUnfollowModalContainer>
    </ModalProto>
  );
};

export default UnfollowModal;
