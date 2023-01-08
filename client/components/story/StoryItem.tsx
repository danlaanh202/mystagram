import Avatar from "@mui/material/Avatar";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IMedia, IStory, IUser } from "../../types";
import { md } from "../../utils/responsive";
import { CloseIcon } from "../modals/LikeUsersModal";

const StyledStoryContainer = styled.div`
  overflow: hidden;
  background: black;
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 100%;
  border-radius: 12px;
  ${md({
    borderRadius: 0,
  })}
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 16px;
    z-index: 20;
    .progress-bar {
      height: 2px;
      width: 100%;
      margin-bottom: 8px;
      .grid-bar-item {
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.35);
        border-radius: 4px;
      }
      .active {
        background: #ffffff;
      }
    }
    .info-container {
      display: flex;
      align-items: center;
      color: white;
      justify-content: space-between;
      .left-info-container {
        display: flex;
        align-items: center;
        .username {
        }
        .date-left {
          margin-left: 8px;
          font-weight: 400;
          opacity: 0.6;
        }
      }
      .right-btn {
        display: flex;
        .mb-btn {
          display: none;
          padding: 8px;
          cursor: pointer;
          ${md({
            display: "block",
          })}
        }
        .pc-btn {
          cursor: pointer;
          padding: 8px;
          ${md({
            display: "none",
          })}
        }
        svg {
          color: white;
        }
      }
    }
  }
  .image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
    }
    .control-layer {
      position: absolute;
      inset: 0;
      z-index: 10;
      display: none;
      ${md({
        display: "flex",
      })}
      .control-item {
        flex: 1;
      }
    }
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    color: white;
    padding: 20px 16px;
    justify-content: space-between;
    z-index: 20;
    .input-container {
      flex: 1;
      .send-input {
        width: 100%;
        background: transparent;
        outline: none;
        border: 1px solid #dbdbdb;
        padding: 8px 16px;
        border-radius: 22px;
        color: white;
      }
    }
    .send-btn {
      padding: 8px 8px 0;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  margin-right: 8px;
  width: 32px !important;
  height: 32px !important;
`;

const StoryItem = ({
  stories,
  activeId,
  setActiveId,
  controlStory,
  closeDialog = () => {},
  disableRightBtn = true,
  disableLeftBtn = true,
}: {
  stories: IStory[];
  activeId: number;
  setActiveId: Dispatch<SetStateAction<number>>;
  controlStory: (type: -1 | 1) => void;
  closeDialog?: () => void;
  disableRightBtn?: boolean;
  disableLeftBtn?: boolean;
}) => {
  const router = useRouter();
  useEffect(() => {
    if (stories.length > 0) {
      let urlId = window.location.pathname.split("/")[3];
      stories.every((item, index) => {
        if (item._id === urlId) {
          setActiveId(index);
          return false;
        }
        return true;
      });
    }
  }, []);

  return (
    <StyledStoryContainer>
      <div className="header">
        <div
          className="progress-bar"
          style={{
            display: "grid",
            gap: "4px",
            gridTemplateColumns: `repeat(${stories.length}, minmax(0, 1fr))`,
          }}
        >
          {stories.map((item, index) => (
            <div
              className={`grid-bar-item ${activeId === index ? "active" : ""}`}
            ></div>
          ))}
        </div>
        <div className="info-container">
          <div className="left-info-container">
            <StyledAvatar
              src={
                ((stories[activeId]?.poster as IUser)?.avatar as IMedia)
                  ?.media_url
              }
            />
            <div className="username">
              {(stories[activeId]?.poster as IUser)?.username}
            </div>
            <div className="date-left">
              {stories &&
                stories.length > 0 &&
                formatDistanceToNow(
                  new Date(stories[activeId]?.created_at as string)
                )}
            </div>
          </div>
          <div className="right-btn">
            <button
              className="mb-btn"
              onClick={() => {
                // window.location.href = "/";
                router.push("/");
              }}
            >
              <CloseIcon />
            </button>
            <button className="pc-btn">
              <PlayIcon />
            </button>
            <button className="pc-btn">
              <MuteIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img src={(stories[activeId]?.media as IMedia)?.media_url} alt="" />
        <div className="control-layer">
          <button
            onClick={() => controlStory(-1)}
            disabled={activeId === 0 && disableLeftBtn}
            className="control-item"
          ></button>
          <button
            onClick={() => controlStory(1)}
            disabled={activeId === stories.length - 1 && disableRightBtn}
            className="control-item"
          ></button>
        </div>
      </div>
      <div className="footer">
        <div className="input-container">
          <input
            type="text"
            placeholder="Send message"
            className="send-input"
          />
        </div>
        <div className="send-btn">
          <SendIcon />
        </div>
      </div>
    </StyledStoryContainer>
  );
};

const SendIcon = () => {
  return (
    <svg
      aria-label="Direct"
      color="#ffffff"
      fill="#ffffff"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <line
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="22"
        x2="9.218"
        y1="3"
        y2="10.083"
      ></line>
      <polygon
        fill="none"
        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polygon>
    </svg>
  );
};
const PlayIcon = () => {
  return (
    <svg
      aria-label="Play"
      color="#ffffff"
      fill="#ffffff"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path>
    </svg>
  );
};
const PauseIcon = () => {
  return (
    <svg
      aria-label="Pause"
      color="#ffffff"
      fill="#ffffff"
      height="16"
      role="img"
      viewBox="0 0 48 48"
      width="16"
    >
      <path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path>
    </svg>
  );
};
const MuteIcon = () => {
  return (
    <svg
      aria-label="Audio is muted."
      color="#ffffff"
      fill="#ffffff"
      height="16"
      role="img"
      viewBox="0 0 48 48"
      width="16"
    >
      <path
        clip-rule="evenodd"
        d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
        fill-rule="evenodd"
      ></path>
    </svg>
  );
};
const AudioIcon = () => {
  return (
    <svg
      aria-label="Audio is playing"
      color="#ffffff"
      fill="#ffffff"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z"></path>
    </svg>
  );
};
export default StoryItem;
