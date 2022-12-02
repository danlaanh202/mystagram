import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IPost } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import GridItem from "../profile/GridItem";

const StyledGridContainer = styled.div``;
const StyledGridItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  .grid-item {
    height: 293px;
    background: blue;
    display: flex;
    align-items: center;
    justify-content: center;
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
