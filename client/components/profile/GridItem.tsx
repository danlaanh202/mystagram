import styled from "styled-components";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IMedia, IPost } from "../../types";
import { MouseEventHandler } from "react";
const StyledGridItem = styled.div`
  width: 100%;
  position: relative;
  span {
    position: unset !important;
  }
  :hover {
    .layer {
      display: flex;
    }
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100% !important;
  position: relative !important;
  height: calc(935px / 3 - 14px) !important;
`;
const StyledLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background: rgba(0, 0, 0, 0.3);
  display: none;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;
  .layer-item {
    color: white;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;
const GridItem = ({
  post,
  onClick,
}: {
  post: IPost;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  // console.log(post);
  return (
    <StyledGridItem onClick={onClick}>
      <StyledImage src={(post.media as IMedia).media_url} layout="fill" />
      <StyledLayer className="layer">
        <div className="layer-item">
          <span>
            <FavoriteIcon />
          </span>{" "}
          <span>{post.likes.length}</span>
        </div>
        <div className="layer-item">
          <span>
            <FavoriteIcon />
          </span>{" "}
          <span>{post.comments.length}</span>
        </div>
      </StyledLayer>
    </StyledGridItem>
  );
};

export default GridItem;
