import styled from "styled-components";
import DotSpinner from "../loading/DotSpinner";
import { ButtonProps } from "../main/SuggestionItem";
const StyledButton = styled.button<ButtonProps>`
  font-weight: 600;
  font-size: ${(props) => (props.isprimary ? "14px" : "12px")};
  line-height: ${(props) => (props.isprimary ? "18px" : "16px")};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  min-width: ${(props) => (props.isprimary ? "70px" : "auto")};
  color: ${(props) =>
    props.isprimary ? (props.isFollow ? "#ed4956" : "white") : "#0095f6"};
  background: ${(props) =>
    props.isprimary ? (props.isFollow ? "white" : "#0095f6") : "white"};
  border: ${(props) =>
    props.isprimary && props.isFollow ? "1px solid #dbdbdb" : ""};
`;
const FollowButton = ({
  followLoading,
  isFollowed,
  primary,
  handleUnfollow,
  handleFollow,
}: {
  followLoading: boolean;
  isFollowed: boolean;
  primary: boolean;
  handleUnfollow: () => void;
  handleFollow: () => void;
}) => {
  return (
    <>
      {followLoading ? (
        <DotSpinner />
      ) : isFollowed ? (
        <StyledButton
          isFollow={isFollowed}
          isprimary={primary}
          onClick={handleUnfollow}
        >
          Following
        </StyledButton>
      ) : (
        <StyledButton
          isFollow={isFollowed}
          isprimary={primary}
          onClick={handleFollow}
        >
          Follow
        </StyledButton>
      )}
    </>
  );
};

export default FollowButton;
