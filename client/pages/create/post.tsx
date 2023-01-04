import Head from "next/head";
import styled from "styled-components";
import MobileHeader from "../../components/header/MobileHeader";
import Layout from "../../components/Layout";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import useUploadMedia from "../../hooks/useUploadMedia";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IMedia, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import { useRouter } from "next/dist/client/router";
import DotSpinner from "../../components/loading/DotSpinner";
import LoadingComponent from "../../components/search/LoadingComponent";

const StyledPagesContainer = styled.div``;
const StyledContainer = styled.div`
  margin-bottom: 44px;
  .self-info {
    padding: 20px 8px;
    display: flex;
    align-items: center;
    .username {
      font-weight: 600;
      color: #262626;
      font-size: 16px;
      line-height: 24px;
    }
  }
  .image-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .media-label {
      height: 100vw;
      width: 100%;
      background-image: url("/img-upload.png");
      background-repeat: no-repeat;
      background-size: cover;
      .media-title {
        text-align: center;
        font-size: 16px;
        line-height: 24px;
        color: #262626;
        font-weight: 600;
      }
    }
    .post-image {
      width: 100%;
      object-fit: cover;
    }
  }
`;
const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  outline: none;
  padding: 8px 8px 20px;
`;
const StyledAvatar = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
  margin-right: 12px;
`;
const post = () => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [caption, setCaption] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
  } = useUploadMedia();
  const handlePost = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
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
        .then((res: any) => {
          setIsLoading(false);
          router.push(`/p/${res.data._id}`);
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <StyledPagesContainer>
      <Head>
        <title>Create post</title>
      </Head>
      <StyledContainer>
        <Layout isShowHeader={false} isShowMobileBar={true}>
          <MobileHeader
            centerComp={<>Create Post</>}
            rightComp={
              <ShareButton
                isLoading={isLoading}
                onClick={handlePost}
                disabled={!previewSource}
              />
            }
          />
          <div className="self-info">
            <StyledAvatar />
            <div className="username">dan_265022</div>
          </div>
          <div className="caption">
            <StyledTextarea
              aria-label="empty textarea"
              placeholder="Write a caption..."
              maxRows={8}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="image-container">
            {!previewSource && (
              <>
                <input
                  value={fileInputState}
                  onChange={handleFileInputChange}
                  type="file"
                  id="media-input"
                  style={{ display: "none" }}
                />

                <label className="media-label" htmlFor="media-input">
                  <div className="media-title">Add your media</div>
                </label>
              </>
            )}
            {previewSource && (
              <img className="post-image" src={previewSource} alt="" />
            )}
          </div>
        </Layout>
      </StyledContainer>
    </StyledPagesContainer>
  );
};
const StyledShareButton = styled.button`
  color: #0095f6;
  font-size: 16px;
  line-height: 18px;
  font-weight: 600;
  :disabled {
    color: #b3dbff;
  }
`;
const ShareButton = ({
  disabled = true,
  onClick = () => {},
  isLoading,
}: {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}) => {
  return (
    <StyledShareButton onClick={onClick} disabled={disabled}>
      {isLoading ? <LoadingComponent /> : <>Share</>}
    </StyledShareButton>
  );
};
export default post;
