import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import useUploadMedia from "../../hooks/useUploadMedia";
import NewPostIcon from "../icons/NewPostIcon";
import ModalProto from "./ModalProto";
import Image from "next/image";
import { publicRequest } from "../../utils/requestMethod";
import { ChangeEvent, useState } from "react";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IMedia, IUser } from "../../types";
import { m1000 } from "../../utils/responsive";
const StyledCreateNewPost = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .top {
    background: white;
    width: 348px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #262626;
    border-radius: 16px 16px 0 0;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: white;
    border-top: 1px solid #dbdbdb;
    padding: 24px;
    border-radius: 0 0 16px 16px;
    .media-icon {
      margin: 32px 0 16px;
    }
    .drag {
      color: #262626;
      font-size: 22px;
      line-height: 26px;
      font-weight: 300;
    }
    &-select {
      background: #0095f6;
      color: white;
      padding: 6px;
      border-radius: 4px;
      font-weight: 600;
      margin: 24px 0 40px;
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
`;
const StyledCreatePostDetail = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .top {
    background: white;
    width: 840px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #262626;
    border-radius: 16px 16px 0 0;
    padding: 0 16px;
    ${m1000({
      width: "calc(100vw - 32px)",
    })}
    &-back {
      cursor: pointer;
    }
    &-share {
      color: #0095f6;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .bottom {
    display: flex;
    width: 840px;
    background: white;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
    ${m1000({
      width: "calc(100vw - 32px)",
    })}
    .b-l {
      flex: 1;
      height: 537px;

      position: relative;
      .image-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        span {
          position: unset !important;
        }
      }
    }
    .b-r {
      width: 320px;
      &-info-container {
        display: flex;
        align-items: center;
        padding: 16px 16px 0;
        &-username {
          font-weight: 600;
          color: #262626;
          font-size: 16px;
          line-height: 24px;
        }
      }
      &-content-container {
        margin-top: 12px;
        padding: 0 16px;
        textarea {
          width: 100% !important;
          max-width: 100%;
          outline: none;
          border: none;
          resize: none;
          height: 168px;
        }
      }
      &-arcordion {
        max-width: 100%;
        border-top: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        .MuiPaper-root {
          box-shadow: unset !important;
        }
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 28px !important;
  height: 28px !important;
  margin-right: 12px;
`;
const StyledTypography = styled(Typography)`
  color: #262626;
  font-size: 16px !important;
  line-height: 24px !important;
`;
const StyledTypography1 = styled(Typography)`
  color: #8e8e8e;
  font-size: 12px !important;
  line-height: 16px !important;
`;
const StyledImage1 = styled(Image)`
  width: 100% !important;
  object-fit: cover;
  position: relative !important;
  height: 100% !important;
`;
const CreateNewPost = () => {
  const {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
  } = useUploadMedia();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [openModal, setOpenModal] = useState(false);
  const [caption, setCaption] = useState<String>("");
  const resetState = () => {
    setCaption("");
    handleDeleteImage();
  };
  const handlePost = async () => {
    try {
      uploadImage("post_image")
        .then(
          async (res) =>
            await publicRequest.post("/post/upload", {
              caption: caption || "",
              user_id: user._id,
              media_id: (res?.data as IMedia)._id,
            })
        )
        .then((res) => setOpenModal(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalProto
      open={openModal}
      setOpen={setOpenModal}
      openBtn={<NewPostIcon />}
      resetState={resetState}
    >
      <>
        {!previewSource && (
          <StyledCreateNewPost>
            <div className="top">
              <div>Create New Post</div>
            </div>
            <div className="bottom">
              <MediaIcon className="media-icon" />
              <div className="drag">Drag photos and videos here</div>
              <label className="bottom-select" htmlFor="file-id">
                Select from computer
              </label>
              <input
                type="file"
                id="file-id"
                value={fileInputState}
                onChange={handleFileInputChange}
              />
            </div>
          </StyledCreateNewPost>
        )}
        {previewSource && (
          <StyledCreatePostDetail>
            <div className="top">
              <div className="top-back" onClick={() => handleDeleteImage()}>
                <BackIcon />
              </div>
              <div className="top-title">Create New Post</div>
              <button onClick={handlePost} className="top-share">
                Share
              </button>
            </div>
            <div className="bottom">
              <div className="b-l">
                <div className="image-container">
                  <StyledImage1 src={previewSource} layout="fill" />
                </div>
              </div>
              <div className="b-r">
                <div className="b-r-info-container">
                  <StyledAvatar src={(user.avatar as IMedia)?.media_url} />
                  <div className="b-r-info-container-username">
                    {user.username}
                  </div>
                </div>
                <div className="b-r-content-container">
                  <textarea
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setCaption(e.target.value)
                    }
                    placeholder="Write a caption..."
                  />
                </div>
                <div className="b-r-arcordion">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <StyledTypography>Accessibility</StyledTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <StyledTypography1>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </StyledTypography1>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </StyledCreatePostDetail>
        )}
      </>
    </ModalProto>
  );
};
const MediaIcon = ({ className }: { className: string }) => {
  return (
    <svg
      aria-label="Icon to represent media such as images or videos"
      color="#262626"
      fill="#262626"
      height="77"
      className={className}
      role="img"
      viewBox="0 0 97.6 77.3"
      width="96"
    >
      <path
        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
        fill="currentColor"
      ></path>
      <path
        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
        fill="currentColor"
      ></path>
      <path
        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
const BackIcon = () => {
  return (
    <svg
      aria-label="Back"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="2.909"
        x2="22.001"
        y1="12.004"
        y2="12.004"
      ></line>
      <polyline
        fill="none"
        points="9.276 4.726 2.001 12.004 9.276 19.274"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  );
};
export default CreateNewPost;
