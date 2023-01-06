import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import styled from "styled-components";

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
const ReelItem = () => {
  return (
    <StyledReelItem>
      <div className="reel-item">
        <div className="reel-image-container">
          <StyledAvatar draggable={false} className="reel-avatar" />
        </div>
        <div className="reel-name-container">
          <div className="reel-name">dan_dienx12</div>
        </div>
      </div>
    </StyledReelItem>
  );
};

export default ReelItem;
