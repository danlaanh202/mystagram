import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ITempLastMsg } from "../../pages/direct/t/[roomId]";
import { IRoom } from "../../types";
import { m1000 } from "../../utils/responsive";
import Layout from "../Layout";
import InboxList from "./InboxList";

const StyledInboxContainer = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 20px auto;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  height: calc(100% - 100px);
  display: flex;
  ${m1000({
    margin: "0 auto",
    height: "100%",
  })}
`;
const MessageLayout = ({
  children,
  lastMessage,
  inboxList,
  setInboxList,
  isChat,
}: {
  children: ReactNode;
  lastMessage?: ITempLastMsg;
  inboxList?: IRoom[];
  setInboxList?: Dispatch<SetStateAction<IRoom[]>>;
  isChat: boolean;
}) => {
  return (
    <>
      <Layout isShowHeader={false} isShowMobileBar={false}>
        <StyledInboxContainer>
          <InboxList
            isChat={isChat}
            inboxList={inboxList as IRoom[]}
            setInboxList={setInboxList as Dispatch<SetStateAction<IRoom[]>>}
            lastMessage={lastMessage}
          />
          {children}
        </StyledInboxContainer>
      </Layout>
    </>
  );
};

export default MessageLayout;
