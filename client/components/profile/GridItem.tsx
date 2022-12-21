import styled from "styled-components";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IMedia, IPost } from "../../types";
import { MouseEventHandler } from "react";
import { m1000, md } from "../../utils/responsive";
import { useRouter } from "next/dist/client/router";
const StyledGridItem = styled.div`
  width: 100%;
  position: relative;
  span {
    position: unset !important;
  }
  :hover {
    .layer {
      display: flex;
      ${md({
        display: "none",
      })}
    }
  }
  .layer-mobile {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: none;
    ${md({
      display: "block",
    })}
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100% !important;
  position: relative !important;
  height: calc(935px / 3 - 14px) !important;
  ${m1000({
    height: "calc(100vw / 3 - 14px) !important",
    width: "calc(100vw / 3 - 14px) !important",
  })}
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
  const router = useRouter();
  return (
    <StyledGridItem>
      <StyledImage src={(post.media as IMedia).media_url} layout="fill" />
      <div
        onClick={() => {
          router.push("/");
        }}
        className="layer-mobile"
      ></div>
      <StyledLayer onClick={onClick} className="layer">
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
