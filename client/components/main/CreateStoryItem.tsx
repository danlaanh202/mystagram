import Avatar from "@mui/material/Avatar";
import { ChangeEvent, DragEvent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IUser } from "../../types";

const StyledReelItem = styled.div`
  width: 58px;
  :nth-child(1) {
    margin-left: 16px;
  }
  .reel-item {
    .reel-image-container {
      width: 100%;
      height: 100%;

      border-radius: 100%;
      position: relative;

      .plus-container {
        position: absolute;
        right: 4px;
        top: 38px;
        background-color: white;
        border-radius: 100%;
      }
    }
    .reel-name-container {
      .reel-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        color: #8e8e8e;
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 56px !important;
  height: 56px !important;
  margin-bottom: 4px;
`;
const CreateStoryItem = ({
  fileInputState,
  handleFileInputChange,
}: {
  fileInputState: string;
  handleFileInputChange: (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ) => void;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  return (
    <StyledReelItem>
      <div className="reel-item">
        <input
          type="file"
          style={{ display: "none" }}
          id="create-reel"
          value={fileInputState}
          onChange={handleFileInputChange}
        />
        <label htmlFor="create-reel" className="reel-image-container">
          <StyledAvatar
            draggable={false}
            src={(user?.avatar as IMedia)?.media_url}
            className="reel-avatar"
          />
          <div className="plus-container">
            <PlusIcon />
          </div>
        </label>
        <div className="reel-name-container">
          <div className="reel-name">Your story</div>
        </div>
      </div>
    </StyledReelItem>
  );
};

const PlusIcon = () => {
  return (
    <svg
      aria-label="Plus icon"
      color="#0095f6"
      fill="#0095f6"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5 12.5h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2Z"></path>
    </svg>
  );
};

export default CreateStoryItem;
