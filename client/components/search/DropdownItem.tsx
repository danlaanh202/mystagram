import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IMedia, IUser } from "../../types";

const StyledDropdownItem = styled.div`
  .item-container {
    cursor: pointer;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    :hover {
      background: #fafafa;
    }
    .avatar-container {
      margin-right: 12px;
    }
    .info-container {
      .info-username {
        color: #262626;
        font-weight: 600;
      }
      .info-name {
        color: #8e8e8e;
        margin-top: 2px;
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 44px !important;
  height: 44px !important;
`;
const DropdownItem = ({ searchUser }: { searchUser: IUser }) => {
  const router = useRouter();
  return (
    <StyledDropdownItem onClick={() => router.push(`/${searchUser.username}`)}>
      <div className="item-container">
        <div className="avatar-container">
          <StyledAvatar src={(searchUser.avatar as IMedia)?.media_url} />
        </div>
        <div className="info-container">
          <div className="info-username">{searchUser.username}</div>
          <div className="info-name">{searchUser.name}</div>
        </div>
      </div>
    </StyledDropdownItem>
  );
};

export default DropdownItem;
