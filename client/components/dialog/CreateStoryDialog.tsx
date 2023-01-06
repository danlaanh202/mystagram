import Dialog from "@mui/material/Dialog";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CreateStoryItem from "../main/CreateStoryItem";
import useUploadMedia from "../../hooks/useUploadMedia";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import styled from "styled-components";
import { CloseIcon } from "../modals/LikeUsersModal";
import { publicRequest } from "../../utils/requestMethod";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { IUser } from "../../types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledImageDialogContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: black;
  .image-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .top-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px;
    .close-icon {
      padding: 8px;
      svg {
        color: white;
      }
    }
  }
  .bot-layer {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      color: white;
      font-weight: 600;
      line-height: 24px;
    }
  }
`;

export default function CreateStoryDialog() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: IRootState) => state.user.user as IUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleDeleteImage();
  };
  const {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
  } = useUploadMedia();
  const handleCreateStory = async () => {
    try {
      uploadImage({ preset: "stories", is_story: true })
        .then(
          async (res) =>
            await publicRequest.post("/story/create", {
              posterId: user._id,
              mediaId: res?.data._id,
            })
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (fileInputState !== "") {
      handleClickOpen();
    }
  }, [fileInputState]);
  return (
    <div>
      <CreateStoryItem
        handleFileInputChange={handleFileInputChange}
        fileInputState={fileInputState}
      />

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <StyledImageDialogContainer>
          <div className="image-container">
            <img src={previewSource} alt="Story Image" />
          </div>
          <div className="top-layer">
            <button onClick={handleClose} className="close-icon">
              <CloseIcon />
            </button>
          </div>
          <div className="bot-layer">
            <button onClick={() => handleCreateStory()}>
              Add to your story
            </button>
          </div>
        </StyledImageDialogContainer>
      </Dialog>
    </div>
  );
}
