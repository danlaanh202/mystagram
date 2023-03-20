import Avatar from "@mui/material/Avatar";
import { formatDistanceStrict } from "date-fns";
import styled from "styled-components";
import { IComment, IMedia, IUser } from "../../../types";

const StyledReplyComment = styled.div`
  padding-top: 12px;
  display: flex;
  gap: 8px;
  .modal-comment-container {
    flex: 1;
    display: flex;
  }
  .modal-like-container {
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
  margin-right: 12px;
`;
const StyledCommentContentContainer = styled.div`
  .t-comment {
    &-username {
      color: #262626;
      font-weight: 600;
      margin-right: 8px;
    }
  }
  .b-comment {
    display: flex;
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 12px;
    color: #8e8e8e;
    line-height: 16px;
    &-date {
      margin-right: 12px;
    }
    &-nor-btn {
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
const ReplyComment = ({ comment }: { comment: IComment }) => {
  return (
    <StyledReplyComment>
      <div className="modal-comment-container">
        <div className="avatar-container">
          <StyledAvatar
            src={((comment.user as IUser)?.avatar as IMedia)?.media_url}
          />
        </div>
        <StyledCommentContentContainer>
          <div className="t-comment">
            <span className="t-comment-username">
              {(comment.user as IUser)?.username}
            </span>
            {comment?.comment}
          </div>
          <div className="b-comment">
            <div className="b-comment-date">
              {formatDistanceStrict(
                new Date(comment?.created_at as string),
                Date.now(),
                { addSuffix: true }
              )}
            </div>
            <div className="b-comment-nor-btn" onClick={() => {}}>
              Reply
            </div>
          </div>
        </StyledCommentContentContainer>
      </div>
      <div className="modal-like-container">{/* <LikeIcon /> */}</div>
    </StyledReplyComment>
  );
};

export default ReplyComment;
