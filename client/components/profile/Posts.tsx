import styled from "styled-components";

import GridItem from "./GridItem";
import axios from "axios";
import { IPost } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { m1000 } from "../../utils/responsive";
const StyledPosts = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${m1000({
    maxWidth: "calc(100vw - 32px)",
    width: "100%",
    margin: "0 auto",
    marginBottom: "24px",
  })}
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
  }
`;

const Posts = ({
  posts,
  setOpenSlider,
  setModalIndex,
}: {
  posts: IPost[];
  setOpenSlider: Dispatch<SetStateAction<boolean>>;
  setModalIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <StyledPosts>
      <div className="grid-container">
        {posts?.map((item: IPost, index: number) => (
          <GridItem
            onClick={() => {
              setOpenSlider(true);
              setModalIndex(index);
            }}
            key={item._id}
            post={item}
          />
        ))}
      </div>
    </StyledPosts>
  );
};

export default Posts;
