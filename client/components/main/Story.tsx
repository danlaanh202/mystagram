import Image from "next/image";
import styled from "styled-components";
import { IPost, IUser } from "../../types";
import BottomStory from "./BottomStory";
import TopStory from "./TopStory";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { publicRequest, pushNotification } from "../../utils/requestMethod";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { useEffect, useState } from "react";
import ImageSliderModal from "../modals/ImageSliderModal";
import { socket } from "../../pages/_app";

const StyledStory = styled.div`
  background: white;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #dbdbdb;
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  .image-container {
    width: 100%;
    span {
      position: unset !important;
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
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

const Story = ({ post }: { post: IPost }) => {
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
            socket.emit("push_noti", {
              type: "comment",
              postId: post._id,
              notificationFrom: user._id,
              notificationTo: (post.user as IUser)._id,
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
              socket.emit("push_noti", {
                type: "like",
                postId: post._id,
                notificationFrom: user._id,
                notificationTo: (post.user as IUser)._id,
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
            await publicRequest
              .delete("/noti/undo_like_notification", {
                params: {
                  post_id: post._id,
                  noti_type: "like",
                  noti_from: user._id,
                  noti_to: (post.user as IUser)._id,
                },
              })
              .then((response) => console.log(response.data));
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledStory>
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
      <form
        onSubmit={handleSubmit(onCommentHandler as SubmitHandler<FieldValues>)}
        className="comment-container"
      >
        <input
          type="text"
          placeholder="Add a comment"
          {...register("comment")}
        />
        <button>Post</button>
      </form>
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
