import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IMedia, IMessage, IUser } from "../../types";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
const StyledMessage = styled.div`
  margin-bottom: 8px;
`;
const StyledMsg = styled.div`
  display: flex;
  align-items: center;
`;
const StyledAvatar = styled(Avatar)`
  width: 24px !important;
  height: 24px !important;
  margin-right: 8px;
  margin-bottom: 8px;
`;
const StyledMsgContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .content {
    word-wrap: break-word;
    white-space: normal;
    display: inline;
    border-radius: inherit;
  }
  .msg-from-me {
    align-self: flex-end;
    background: #efefef;
    padding: 16px;
    border-radius: 28px;
  }
  .msg-from-recipient {
    align-self: flex-start;
    /* background: #efefef; */
    padding: 16px;
    border-radius: 28px;
    border: 1px solid #efefef;
  }
`;
const Message = ({
  message,
  recipient,
}: {
  message: IMessage;
  recipient?: IUser;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);

  return (
    <StyledMessage>
      <StyledMsg>
        {user._id !== message.user._id && (
          <StyledAvatar src={(recipient?.avatar as IMedia)?.media_url} />
        )}
        <StyledMsgContent>
          {user._id === message.user._id ? (
            <div className="msg-from-me">
              <div className="content ">{message.message}</div>
            </div>
          ) : (
            <div className="msg-from-recipient">
              <div className="content">{message.message}</div>
            </div>
          )}
        </StyledMsgContent>
      </StyledMsg>
    </StyledMessage>
  );
};

export default Message;
