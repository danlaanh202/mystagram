import Image from "next/image";
import styled from "styled-components";
import { IPost, IUser } from "../../types";
import BottomStory from "./BottomStory";
import TopStory from "./TopStory";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { publicRequest } from "../../utils/requestMethod";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { useEffect, useState } from "react";
import ImageSliderModal from "../modals/ImageSliderModal";
import { socket } from "../../pages/_app";
import { md } from "../../utils/responsive";
import { pushNotification, removeNotification } from "../../utils";

const StyledStory = styled.div`
  background: white;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #dbdbdb;
  margin-top: 16px;
  ${md({
    borderRadius: 0,
    marginTop: 0,
    borderTop: "1px solid transparent",
    marginBottom: "16px",
  })}
  display: flex;
  flex-direction: column;
  .image-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      position: unset !important;
      width: 100% !important;
    }
  }
  .comment-container {
    border-radius: 0 0 12px 12px;
    border-top: 1px solid #dbdbdb;
    display: flex;
    overflow: hidden;
    input {
      padding: 16px 12px;
      border: none;
      outline: none;
      flex: 1;
    }
    button {
      color: #0095f6;
      font-weight: 600;
      cursor: pointer;
      padding: 0 12px;
      width: 64px;
    }
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

const Story = ({
  post,
  showCommentInput = true,
}: {
  post: IPost;
  showCommentInput: boolean;
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  const [updatedPost, setUpdatedPost] = useState<IPost>(post);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const onCommentHandler = async (data: { comment: string }) => {
    try {
      await publicRequest
        .post("/comment/comment", {
          user_id: user._id,
          post_id: post._id,
          comment: data.comment,
        })
        .then((response) => {
          setUpdatedPost(response.data.post);
          if (user._id !== (post.user as IUser)._id) {
            pushNotification({
              socket: socket,
              type: "comment",
              postId: post._id,
              myId: user._id as string,
              otherId: (post.user as IUser)._id as string,
              commentId: response.data.comment._id,
            });
          }
        });

      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleLike = async (isLike: boolean) => {
    try {
      if (!isLike) {
        await publicRequest
          .post("/like/like_post", {
            user_id: user._id,
            post_id: post._id,
          })
          .then((response) => {
            setUpdatedPost(response.data.post);
            if (user._id !== (post.user as IUser)._id) {
              pushNotification({
                type: "like",
                socket: socket,
                postId: post._id,
                myId: user._id as string,
                otherId: (post.user as IUser)._id as string,
              });
            }
          });
      } else {
        await publicRequest
          .delete("/like/unlike_post", {
            params: {
              user_id: user._id,
              post_id: post._id,
            },
          })
          .then(async (response) => {
            setUpdatedPost(response.data.post);

            removeNotification({
              postId: post._id,
              myId: user._id as string,
              otherId: (post.user as IUser)._id as string,
              type: "like",
            }).then((response) => console.log(response?.data));
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledStory className="story-container">
      <TopStory post={updatedPost} />
      <div className="image-container">
        <StyledImage
          src={updatedPost?.media?.media_url as string}
          layout="fill"
        />
      </div>
      <BottomStory
        setOpenModal={setOpenModal}
        toggleLike={toggleLike}
        post={updatedPost}
      />
      {showCommentInput && (
        <form
          onSubmit={handleSubmit(
            onCommentHandler as SubmitHandler<FieldValues>
          )}
          className="comment-container"
        >
          <input
            type="text"
            placeholder="Add a comment"
            autoComplete="off"
            {...register("comment")}
          />
          <button>Post</button>
        </form>
      )}
      {openModal && (
        <ImageSliderModal
          open={openModal}
          setOpen={setOpenModal}
          posts={updatedPost}
          modalIndex={0}
          setModalIndex={() => {}}
          setUpdatedPost={setUpdatedPost}
        />
      )}
    </StyledStory>
  );
};

export default Story;
