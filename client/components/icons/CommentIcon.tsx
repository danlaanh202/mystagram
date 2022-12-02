import styled from "styled-components";

const StyledCommentIcon = styled.div`
  :hover {
    svg {
      color: #8e8e8e;
      fill: #8e8e8e;
    }
  }
`;
const CommentIcon = () => {
  return (
    <StyledCommentIcon>
      <svg
        aria-label="Comment"
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        ></path>
      </svg>
    </StyledCommentIcon>
  );
};

export default CommentIcon;
