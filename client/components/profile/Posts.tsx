import styled from "styled-components";

import GridItem from "./GridItem";
import axios from "axios";
import { IPost, IUser } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { m1000, md } from "../../utils/responsive";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
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
    flex-direction: column;
    &-text {
      color: #262626;
      font-weight: 300;
      font-size: 28px;
      line-height: 32px;
    }
    &-title {
      color: #262626;
      font-weight: 300;
      font-size: 30px;
      line-height: 36px;
      margin: 24px 0;
    }
    &-p {
      margin-bottom: 24px;
      text-align: center;
    }
    &-btn {
      color: #0095f6;
      font-weight: 500;
      cursor: pointer;
      /* :hover {
        color: #262626;
      } */
    }
  }
`;

const Posts = ({
  posts,
  setOpenSlider,
  setModalIndex,
  currentUsername,
}: {
  posts: IPost[];
  setOpenSlider: Dispatch<SetStateAction<boolean>>;
  setModalIndex: Dispatch<SetStateAction<number>>;
  currentUsername: string;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);

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
      {currentUsername !== user.username && (!posts || posts.length === 0) && (
        <div className="empty">
          <div className="empty-text">No Posts Yet</div>
        </div>
      )}
      {currentUsername === user.username && (!posts || posts.length === 0) && (
        <div className="empty">
          <div className="empty-title">Share Photos</div>
          <div className="empty-p">
            When you share photos, they will appear on your profile.
          </div>
          <button className="empty-btn">Share your first photo</button>
        </div>
      )}
    </StyledPosts>
  );
};

export default Posts;
