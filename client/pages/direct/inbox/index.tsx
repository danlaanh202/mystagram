import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import MessageLayout from "../../../components/message/MessageLayout";
import SendMessageContainer from "../../../components/message/SendMessageContainer";
import { IRoom } from "../../../types";
const StyledInbox = styled.div`
  flex-direction: column;
  background: #fafafa;
  height: 100vh;
  overflow: hidden;
`;

const index = () => {
  const [inboxList, setInboxList] = useState<IRoom[]>([]);

  return (
    <StyledInbox>
      <Head>
        <title>Inbox • Chats</title>
      </Head>
      <MessageLayout inboxList={inboxList} setInboxList={setInboxList}>
        <SendMessageContainer />
      </MessageLayout>
    </StyledInbox>
  );
};

export default index;
