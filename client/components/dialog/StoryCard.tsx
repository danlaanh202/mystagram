import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IMedia, IStory, IUser } from "../../types";
import { IGroupStories } from "../Home";
import StoryItem from "../story/StoryItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { md } from "../../utils/responsive";
interface IProps {
  active: Boolean;
}
const StyledCardContainer = styled.div<IProps>`
  height: 100%;
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  ${md({
    margin: 0,
  })}
  .card {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    .control-btn {
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 100%;
      right: -28px;
      cursor: pointer;
      z-index: 30;
      ${md({
        display: "none",
      })}
    }
    .left {
      left: -28px;
      transform: rotate(180deg);
    }
  }
`;
const StoryCard = ({
  stories,
  active,
  setActiveSlider,
  id,
  disableRightBtn,
  disableLeftBtn,
}: {
  stories: IStory[];
  active: Boolean;
  setActiveSlider: Dispatch<SetStateAction<number>>;
  id: number;
  disableRightBtn: boolean;
  disableLeftBtn: boolean;
}) => {
  const [activeId, setActiveId] = useState(0);
  const controlStory = (type: -1 | 1) => {
    if (type === -1) {
      if (activeId === 0) {
        setActiveSlider((prev) => prev - 1);
      } else {
        setActiveId((prev) => prev - 1);
      }
    }
    if (type === 1) {
      if (disableRightBtn) {
        return;
      }
      if (activeId === stories.length - 1) {
        setActiveSlider((prev) => prev + 1);
      } else {
        setActiveId((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {
    if (active) {
      window.history.pushState(
        "",
        "",
        `/stories/${(stories[0]?.poster as IUser)?.username}/${
          stories[activeId]?._id
        }`
      );
    }
  }, [activeId, active]);
  return (
    <StyledCardContainer active={active}>
      <div className="card">
        {active ? (
          <>
            <button
              className="control-btn left"
              onClick={() => controlStory(-1)}
              disabled={disableLeftBtn && activeId === 0}
            >
              <ChevronRightIcon />
            </button>

            <StoryItem
              stories={stories}
              activeId={activeId}
              setActiveId={setActiveId}
              controlStory={controlStory}
              closeDialog={() => {
                setActiveId(-1);
              }}
              disableRightBtn={disableRightBtn as boolean}
              disableLeftBtn={disableLeftBtn as boolean}
            />

            <button
              disabled={disableRightBtn && activeId === stories.length - 1}
              className="control-btn"
              onClick={() => controlStory(1)}
            >
              <ChevronRightIcon />
            </button>
          </>
        ) : (
          <CardPreview
            stories={stories}
            num={id}
            setActiveSlider={setActiveSlider}
          />
        )}
      </div>
    </StyledCardContainer>
  );
};
const StyledCardPreviewContainer = styled.div`
  height: 60%;
  background: black;
  width: 60%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .info-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.35);
    flex-direction: column;
    .username {
      margin-top: 8px;
      color: white;
      font-weight: 600;
    }
    .time-distance {
      margin-top: 4px;
      color: white;
      font-weight: 600;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 56px !important;
  height: 56px !important;
`;
const CardPreview = ({
  stories,
  num,
  setActiveSlider,
}: {
  stories: IStory[];
  num: number;
  setActiveSlider: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <StyledCardPreviewContainer onClick={() => setActiveSlider(num)}>
      <div className="image-container">
        <img src={(stories[0]?.media as IMedia)?.media_url} alt="" />
      </div>
      <div className="info-layer">
        <div className="avatar-container">
          <StyledAvatar />
        </div>
        <div className="username">
          {(stories[0]?.poster as IUser)?.username}
        </div>
        <div className="time-distance">
          {formatDistanceToNow(new Date(stories[0]?.created_at as string))}
        </div>
      </div>
    </StyledCardPreviewContainer>
  );
};
export default StoryCard;
