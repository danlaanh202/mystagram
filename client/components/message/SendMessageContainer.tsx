import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { IRoom } from "../../types";
import { md, sm } from "../../utils/responsive";
import SendNewMessageModal from "../modals/SendNewMessageModal";

const StyledSendMessageContainer = styled.div`
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${md({
    display: "none",
  })}
  .title {
    margin-top: 16px;
    font-weight: 300;
    font-size: 22px;
    line-height: 26px;
    color: #262626;
  }
  .des {
    margin-top: 18px;
    color: #8e8e8e;
  }
  .send-msg-btn {
    margin-top: 24px;
    padding: 5px 10px;
    color: white;
    background: #0095f6;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }
`;
const SendMessageContainer = ({
  setInboxList,
}: {
  setInboxList: Dispatch<SetStateAction<IRoom[]>>;
}) => {
  return (
    <StyledSendMessageContainer>
      <DirectIcon />

      <div className="title">Your Message</div>
      <div className="des">
        Send private photos and messages to a friend or group.
      </div>
      <SendNewMessageModal type={2} setInboxList={setInboxList} />
    </StyledSendMessageContainer>
  );
};
const DirectIcon = () => {
  return (
    <svg
      aria-label="Direct"
      color="#262626"
      fill="#262626"
      height="96"
      role="img"
      viewBox="0 0 96 96"
      width="96"
    >
      <circle
        cx="48"
        cy="48"
        fill="none"
        r="47"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="69.286"
        x2="41.447"
        y1="33.21"
        y2="48.804"
      ></line>
      <polygon
        fill="none"
        points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  );
};
export default SendMessageContainer;
