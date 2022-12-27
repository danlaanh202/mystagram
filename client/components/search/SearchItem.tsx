import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import styled from "styled-components";
import { IMedia, IUser } from "../../types";

const StyledMobileSearchItem = styled.div`
  .item-container {
    display: flex;
    padding: 8px 16px;
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
const SearchItem = ({ searchUser }: { searchUser: IUser }) => {
  return (
    <StyledMobileSearchItem>
      <Link href={`/${searchUser.username}`}>
        <a>
          <div className="item-container">
            <div className="avatar-container">
              <StyledAvatar
                src={(searchUser?.avatar as IMedia)?.media_url || ""}
              />
            </div>
            <div className="info-container">
              <div className="info-username">
                {searchUser?.username || "dan"}
              </div>
              <div className="info-name">{searchUser?.name || "dien"}</div>
            </div>
          </div>
        </a>
      </Link>
    </StyledMobileSearchItem>
  );
};

export default SearchItem;
