import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { IFollow, IUser } from "../../types";
const StyledFollowItem = styled.div`
  width: 100%;
  padding: 8px 16px;
  display: flex;
`;
const StyledAvatar = styled(Avatar)`
  height: 44px !important;
  width: 44px !important;
  margin-right: 12px;
`;
const StyledInfoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  .l-info {
    color: #262626;
    &_username {
      font-weight: 600;
    }
    &_name {
    }
  }
  .l-btn {
    color: #262626;
    font-weight: 600;
    /* max-height: 30px; */
    padding: 4px 8px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    cursor: pointer;
  }
`;
const FollowItem = ({ follow }: { follow: IFollow }) => {
  return (
    <StyledFollowItem>
      <StyledAvatar />
      <StyledInfoContainer>
        <div className="l-info">
          <div className="l-info_username">
            {(follow.follow_by as IUser)?.username}
          </div>
          <div className="l-info_name">{(follow.follow_by as IUser)?.name}</div>
        </div>
        <button className="l-btn">Remove</button>
      </StyledInfoContainer>
    </StyledFollowItem>
  );
};

export default FollowItem;
