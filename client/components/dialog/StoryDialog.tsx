import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import styled from "styled-components";
import { IPost } from "../../types";
import { useRouter } from "next/router";
import { md } from "../../utils/responsive";

export default function StoryDialog({ post }: { post: IPost }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <svg
          aria-label="More options"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </div>
      <SimpleDialog
        onClose={handleClose}
        open={open}
        post={post}
      ></SimpleDialog>
    </div>
  );
}
const StyledButtonContainer = styled.div`
  border-bottom: 1px solid #dbdbdb;
  width: 400px;
  ${md({
    width: "80vw",
    maxWidth: "400px",
  })}
  .normal-btn {
    cursor: pointer;
    min-height: 48px;
    padding: 4px 8px;
    width: 100%;
    color: #262626;
  }
  .danger-btn {
    color: #ed4956;
    font-weight: 600;
  }
`;
const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 12px;
  }
`;
function SimpleDialog({
  open,
  onClose,
  post,
}: {
  open: boolean;
  onClose: () => void;
  post: IPost;
}) {
  const router = useRouter();
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledButtonContainer>
        <button className="normal-btn danger-btn">Report</button>
      </StyledButtonContainer>
      <StyledButtonContainer>
        <button className="normal-btn danger-btn">Unfollow</button>
      </StyledButtonContainer>
      <StyledButtonContainer>
        <button
          className="normal-btn"
          onClick={() => router.push(`/p/${post?._id}`)}
        >
          Go to post
        </button>
      </StyledButtonContainer>
      <StyledButtonContainer>
        <button className="normal-btn">Share to...</button>
      </StyledButtonContainer>
      <StyledButtonContainer>
        <button
          className="normal-btn"
          onClick={() => {
            navigator.clipboard
              .writeText(`http://localhost:3000/p/${post?._id}`)
              .then(() => {
                onClose();
              });
          }}
        >
          Copy link
        </button>
      </StyledButtonContainer>
      <StyledButtonContainer onClick={() => onClose()}>
        <button className="normal-btn">Cancel</button>
      </StyledButtonContainer>
    </StyledDialog>
  );
}
