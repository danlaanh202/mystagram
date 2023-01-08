import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import styled from "styled-components";
import { IMedia, IStory, IUser } from "../../types";

const StyledReelItem = styled.div`
  width: 58px;
  :nth-child(1) {
    margin-left: 16px;
  }
  .reel-item {
    .reel-image-container {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      position: relative;
      .reel-avatar {
        border-radius: 100%;
      }
    }
    .reel-name-container {
      .reel-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        color: #262626;
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 56px !important;
  height: 56px !important;
  margin-bottom: 4px;
  img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;
const ReelItem = ({ story }: { story: IStory }) => {
  return (
    <StyledReelItem>
      <div className="reel-item">
        <div className="reel-image-container">
          <StyledAvatar
            draggable={false}
            className="reel-avatar"
            src={((story.poster as IUser).avatar as IMedia)?.media_url}
          />
        </div>
        <div className="reel-name-container">
          <div className="reel-name">{(story.poster as IUser).username}</div>
        </div>
      </div>
    </StyledReelItem>
  );
};

export default ReelItem;
