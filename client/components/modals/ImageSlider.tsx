import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IPost } from "../../types";
import SwiperItem from "../image-item/SwiperItem";

const StyledImageSlider = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledPrevBtn = styled.button`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledNextBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageSlider = ({
  modalIndex,
  posts,
  setModalIndex,
}: {
  modalIndex: number;
  posts: IPost[] | IPost;
  setModalIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      {Array.isArray(posts) ? (
        <>
          {modalIndex !== 0 && (
            <StyledPrevBtn
              onClick={() => {
                setModalIndex((prev) => prev - 1);
              }}
            >
              <BtnIcon />
            </StyledPrevBtn>
          )}
          <StyledImageSlider>
            <SwiperItem post={posts[modalIndex]} />
          </StyledImageSlider>
          {modalIndex !== (posts as IPost[]).length - 1 && (
            <StyledNextBtn
              onClick={() => {
                setModalIndex((prev) => prev + 1);
              }}
            >
              <BtnIcon />
            </StyledNextBtn>
          )}
        </>
      ) : (
        <>
          <StyledImageSlider>
            <SwiperItem post={posts as IPost} />
          </StyledImageSlider>
        </>
      )}
    </>
  );
};
const BtnIcon = () => {
  return (
    <svg
      aria-label="Go Back"
      color="#000000"
      fill="#000000"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
    </svg>
  );
};

export default ImageSlider;
