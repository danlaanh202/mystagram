import styled from "styled-components";

import GridItem from "./GridItem";
import axios from "axios";
import { IPost } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { m1000, md } from "../../utils/responsive";
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
  ${md({
    maxWidth: "unset",
  })}
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;

    ${md({
      gap: "4px",
    })}
  }
  .empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    &-text {
      color: #262626;
      font-weight: 300;
      font-size: 28px;
      line-height: 32px;
    }
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
      {(!posts || posts.length === 0) && (
        <div className="empty">
          <div className="empty-text">No Posts Yet</div>
        </div>
      )}
    </StyledPosts>
  );
};

export default Posts;
