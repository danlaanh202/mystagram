import Image from "next/image";
import styled from "styled-components";

const StyledReelItem = styled.div`
  width: 66px;
  :nth-child(1) {
    margin-left: 16px;
  }
  .reel-item {
    .reel-image-container {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      position: relative;
      /* :after {
        display: block;
        border-radius: 100%;
        content: "";
        width: 108%;
        height: 108%;
        position: absolute;
        z-index: -1;
        left: -4%;
        top: -4%;
        background-image: conic-gradient(#00aeef, #fff, #00aeef, #fff, #00aeef);
      } */
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
        color: #8e8e8e;
      }
    }
  }
`;
const ReelItem = () => {
  return (
    <StyledReelItem>
      <div className="reel-item">
        <div className="reel-image-container">
          <Image
            draggable={false}
            src="/avatar-mock.png"
            width={64}
            height={64}
            className="reel-avatar"
          />
        </div>
        <div className="reel-name-container">
          <div className="reel-name">Tran Thai Dan</div>
        </div>
      </div>
    </StyledReelItem>
  );
};

export default ReelItem;
