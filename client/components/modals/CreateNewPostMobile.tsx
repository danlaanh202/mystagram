import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import useUploadMedia from "../../hooks/useUploadMedia";
import { IRootState } from "../../redux/store";
import { IMedia, IUser } from "../../types";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { publicRequest } from "../../utils/requestMethod";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)`
  position: relative;
  .floating-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    background: #1976d2;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    input {
      display: none;
    }
  }
`;
const StyledAppBar = styled(AppBar)`
  background-color: white !important;
  color: black !important;
`;
const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .info-container {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    &-username {
      font-weight: 600;
      color: #262626;
      font-size: 16px;
      line-height: 24px;
    }
  }
  .content-container {
    margin-top: 4px;
    padding: 0 16px;

    textarea {
      width: 100% !important;
      max-width: 100%;
      outline: none;
      border: none;
      resize: none;
      height: 100%;
    }
  }
  .img-container {
    margin-top: 8px;
    img {
      width: 100%;
    }
  }
`;

export default function FullScreenDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
  } = useUploadMedia();
  const [caption, setCaption] = React.useState("");
  const resetState = () => {
    setCaption("");
    handleDeleteImage();
  };
  const handleClose = () => {
    resetState();
    setOpen(false);
  };
  const handlePost = async () => {
    if (loading || !previewSource) return;
    setLoading(true);
    try {
      uploadImage({ preset: "post_image", is_post: true })
        .then(
          async (res) =>
            await publicRequest.post("/post/upload", {
              caption: caption || "",
              user_id: user._id,
              media_id: (res?.data as IMedia)?._id,
            })
        )
        .then((res) => {
          setLoading(false);
          handleClose();
          router.push(`/p/${res.data._id}`);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <StyledDialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <StyledAppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create New Post
          </Typography>
          <Button autoFocus color="inherit" onClick={handlePost}>
            Share
          </Button>
        </Toolbar>
      </StyledAppBar>
      <StyledContainer>
        <div className="info-container">
          <StyledAvatar src={user?.avatar as string} />
          <div className="info-container-username">{user?.username}</div>
        </div>

        <div
          className="content-container"
          style={previewSource ? {} : { flex: 1 }}
        >
          <TextareaAutosize
            maxRows={12}
            onChange={
              (e: React.ChangeEvent<HTMLTextAreaElement>) => {}
              //   setCaption(e.target.value)
            }
            placeholder="Write a caption..."
          />
        </div>
        {previewSource && (
          <div className="img-container">
            <img src={previewSource} alt="" />
          </div>
        )}
      </StyledContainer>
      <label htmlFor="img-picker" className="floating-btn">
        <input
          id="img-picker"
          type="file"
          className="image-picker"
          value={fileInputState}
          onChange={handleFileInputChange}
        />
        <AddIcon />
      </label>
    </StyledDialog>
  );
}

const StyledAvatar = styled(Avatar)`
  width: 40px !important;
  height: 40px !important;
  margin-right: 12px;
`;
