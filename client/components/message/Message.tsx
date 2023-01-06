import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IMedia, IMessage, IUser } from "../../types";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { md } from "../../utils/responsive";
import { format } from "date-fns";
const StyledMessage = styled.div`
  margin-bottom: 8px;
  .date-annouce {
    width: 100%;
    text-align: center;
    color: rgb(142, 142, 142);
    font-size: 12px;
    line-height: 16px;
    margin: 8px 0;
  }
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
    max-width: 236px;
    word-break: break-all;
    max-height: 340px;
    ${md({
      maxWidth: "70%",
    })}
  }
  .msg-from-recipient {
    max-width: 236px;
    align-self: flex-start;
    /* background: #efefef; */
    padding: 16px;
    border-radius: 28px;
    border: 1px solid #efefef;
    word-break: break-all;
    max-height: 340px;
    ${md({
      maxWidth: "70%",
    })}
  }
`;
const Message = ({
  message,
  recipient,
  date = "",
}: {
  message: IMessage;
  recipient?: IUser;
  date?: string;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);

  return (
    <StyledMessage>
      {date !== "" && (
        <div className="date-annouce">
          {format(new Date(date as string), "MMMM dd,yyyy h:mmaaa")}
        </div>
      )}

      <StyledMsg>
        {user._id !== (message.user as IUser)._id && (
          <StyledAvatar src={(recipient?.avatar as IMedia)?.media_url} />
        )}
        <StyledMsgContent>
          {user._id === (message.user as IUser)._id ? (
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
