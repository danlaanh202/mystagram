import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IPost } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import { m1000, md } from "../../utils/responsive";
import GridItem from "../profile/GridItem";

const StyledGridContainer = styled.div``;
const StyledGridItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  ${m1000({
    maxWidth: "calc(100vw - 32px)",
    width: "100%",
    margin: "0 auto",
    marginBottom: "24px",
  })};
  ${md({
    gap: "2px",
  })}
  .grid-item {
    height: 293px;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
    ${m1000({
      height: "calc(100vw / 3 - 14px) !important",
      width: "calc(100vw / 3 - 14px) !important",
    })}
  }
`;
const GridExploreItem = ({
  posts,
  setModalIndex,
  setShowImageSlider,
}: {
  posts: IPost[] | IPost;
  setModalIndex: Dispatch<SetStateAction<number>>;
  setShowImageSlider: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <StyledGridContainer>
      <StyledGridItemContainer>
        {(posts as IPost[])?.map((item, index) => (
          <GridItem
            key={item._id}
            onClick={() => {
              setShowImageSlider(true);
              setModalIndex(index);
            }}
            post={item}
          />
        ))}
      </StyledGridItemContainer>
    </StyledGridContainer>
  );
};

export default GridExploreItem;
