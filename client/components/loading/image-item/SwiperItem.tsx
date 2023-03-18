import Avatar from "@mui/material/Avatar";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IComment, IMedia, IPost, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import CommentIcon from "../icons/CommentIcon";
import HeartIcon from "../icons/HeartIcon";
import SaveIcon from "../icons/SaveIcon";
import ShareIcon from "../icons/ShareIcon";
import PostComment from "./PostComment";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { CloseIcon } from "../modals/LikeUsersModal";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { m1000, md } from "../../utils/responsive";
import { socket } from "../../pages/_app";
import { pushNotification, removeNotification } from "../../utils";
import { format } from "date-fns";
const StyledItemContainer = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  overflow: hidden;
  min-height: 80vh;
  ${m1000({
    maxWidth: "calc(100% - 20px)",
    height: "800px",
    minHeight: "unset",
    width: "100%",
    margin: "0 auto",
  })}

  .left-container {
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    ${m1000({
      width: "300px",
      flex: 1,
      height: "100%",
    })}
    ${md({
      display: "none",
    })}
    .image-container {
      display: flex;
      align-items: center;
      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }

  .r-container {
    background: white;
    width: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 0 8px 8px 0;
    height: 100%;
    overflow: hidden;
    ${m1000({
      width: "400px",
    })};

    .r-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #efefef;
      /* height: 62px; */
      &-header {
        padding: 14px 4px 14px 16px;
        display: flex;
        align-items: center;
        .r-top-username {
          color: #262626;
          font-weight: 600;
        }
      }
      &-icon {
        padding: 8px;
        padding-right: 16px;
      }
    }
    .r-center {
      padding: 16px;
      display: flex;
      flex: 1;

      flex-direction: column;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }
      &-info-container {
        display: flex;
        padding-bottom: 16px;
      }
      &-comments {
        display: flex;
        flex-direction: column-reverse;
      }
      &-l {
      }
      &-r {
        flex: 1;
        &-username {
          color: #262626;
          font-weight: 600;
          margin-right: 8px;
        }
        &-caption {
          color: #262626;
          display: block;
          /* width: 100%; */
          word-break: break-word;
        }
      }
      &-sb {
        width: 100%;
        height: 1px;
        background: transparent;
      }
    }
    .r-bottom {
      padding: 8px 16px;
      border-top: 1px solid #efefef;

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
          padding: 8px;
          cursor: pointer;
        }
      }
      .story {
        &-like {
          display: flex;
          margin-bottom: 4px;
          .story-avatars {
            display: flex;
            margin-right: 12px;
            .story-avatar {
              width: 20px;
              height: 20px;
              border: 1px solid white;
              :nth-child(2) {
                margin-left: -9px;
              }
              :nth-child(3) {
                margin-left: -9px;
              }
            }
          }
          .likes-length {
            color: #262626;
            font-weight: 600;
            cursor: pointer;
          }
        }
        &-date {
          color: #8e8e8e;
          font-size: 10px;
          line-height: 12px;
          margin-bottom: 16px;
        }
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
  }
`;
const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
  width: 32px !important;
  height: 32px !important;
`;
const StyledSmallAvatar = styled(Avatar)`
  width: 19px !important;
  height: 19px !important;
`;
const SwiperItem = ({
  post,
  setUpdatedPost,
}: {
  post: IPost;
  setUpdatedPost?: Dispatch<SetStateAction<IPost>>;
}) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [openLikesModal, setOpenLikesModal] = useState<boolean>(false);
  const [likeLength, setLikeLength] = useState<number>(post.likes.length || 0);
  const [isLiked, setIsLiked] = useState(
    (post?.likes as string[])?.includes(user?._id as string)
  );
  const bottomRef = useRef<HTMLDivElement>(null);
  const handleToggleLike = () => {
    toggleLike(isLiked);
    setLikeLength((prev: number) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev: boolean) => !prev);
  };
  const setToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });
  useEffect(() => {
    const getComments = async () => {
      try {
        await publicRequest
          .get("/comment/get_comments", {
            params: {
              post_id: post?._id,
            },
          })
          .then((response) => {
            setComments(response.data);
          });
      } catch (error) {}
    };
    getComments();
  }, [post]);

  const toggleLike = async (isLike: boolean) => {
    try {
      if (!isLike) {
        await publicRequest
          .post("/like/like_post", {
            user_id: user._id,
            post_id: post._id,
          })
          .then((response) => {
            if (setUpdatedPost) {
              setUpdatedPost(response.data.post);
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
            if (setUpdatedPost) {
              setUpdatedPost(response.data.post);
              removeNotification({
                type: "like",
                postId: post._id,
                myId: user._id as string,
                otherId: (post.user as IUser)._id as string,
              });
              // await publicRequest.delete("/noti/undo_notification", {
              //   params: {
              //     post_id: post._id,
              //     noti_type: "like",
              //     noti_from: user._id,
              //     noti_to: (post.user as IUser)._id,
              //   },
              // });
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onCommentHandler = async (data: { comment: string }) => {
    try {
      await publicRequest
        .post("/comment/comment", {
          user_id: user._id,
          post_id: post._id,
          comment: data.comment,
        })
        .then((response) => {
          setComments((prev: IComment[]) => [
            ...prev,
            response.data.comment as IComment,
          ]);
          if (user._id !== (post.user as IUser)._id) {
            // socket.emit("push_noti", {
            //   type: "comment",
            //   postId: post._id,
            //   notificationFrom: user._id,
            //   notificationTo: (post.user as IUser)._id,
            //   commentId: response.data.comment._id,
            // });
            pushNotification({
              type: "comment",
              socket: socket,
              postId: post._id,
              myId: user._id as string,
              otherId: (post.user as IUser)._id as string,
              commentId: response.data.comment._id,
            });
          }
        })
        .then(() => {
          reset();
          setToBottom();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StyledItemContainer>
        <div className="left-container">
          <div className="image-container">
            <img src={(post.media as IMedia)?.media_url} alt="" />
          </div>
        </div>
        <div className="r-container">
          <div className="r-top">
            <div className="r-top-header">
              <StyledAvatar src={(post.user?.avatar as IMedia)?.media_url} />
              <div className="r-top-username">
                {(post.user as IUser)?.username}
              </div>
            </div>
            <div className="r-top-icon">
              <ThreeDotIcon />
            </div>
          </div>
          <div className="r-center">
            <div className="r-center-info-container">
              <div className="r-center-l">
                <StyledAvatar src={(post.user?.avatar as IMedia)?.media_url} />
              </div>
              <div className="r-center-r">
                <div className="r-center-r-caption">
                  <span className="r-center-r-username">
                    {(post.user as IUser)?.username}
                  </span>
                  {post?.caption}
                </div>
              </div>
            </div>
            <div className="r-center-comments">
              <div className="r-center-sb" ref={bottomRef}></div>
              <div>
                {comments?.map((item) => (
                  <PostComment key={item._id} comment={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="r-bottom">
            <div className="icon-container">
              <div>
                <button className="icon" onClick={handleToggleLike}>
                  <HeartIcon isLiked={isLiked} />
                </button>
                <button className="icon">
                  <CommentIcon />
                </button>
                <button className="icon">
                  <ShareIcon />
                </button>
              </div>
              <div>
                <button className="icon">
                  <SaveIcon />
                </button>
              </div>
            </div>
            <div className="story">
              <div className="story-like">
                <div className="story-avatars">
                  <div className="story-avatar">
                    <StyledSmallAvatar />
                  </div>
                  <div className="story-avatar">
                    <StyledSmallAvatar />
                  </div>
                  <div className="story-avatar">
                    <StyledSmallAvatar />
                  </div>
                </div>
                <div
                  className="likes-length"
                  onClick={() => setOpenLikesModal(true)}
                >
                  {likeLength} likes
                </div>
              </div>
              <div
                className="story-date"
                style={{ textTransform: "uppercase" }}
              >
                {format(new Date(post.created_at as string), "PP")}
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(
              onCommentHandler as SubmitHandler<FieldValues>
            )}
            className="comment-container"
          >
            <input
              type="text"
              placeholder="Add a comment"
              {...register("comment")}
            />
            <button>Post</button>
          </form>
        </div>
      </StyledItemContainer>
      {openLikesModal && (
        <LikeUsersModal
          post={post}
          open={openLikesModal}
          setOpen={setOpenLikesModal}
        />
      )}
    </>
  );
};
const StyledComponentContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 9999;
  /* width: 100vw; */
  height: 120vh;
  left: -50vw;
  right: -50vw;
  top: -30px;
  /* overflow: hidden; */
`;
const StyledLikeUsersContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background: white;
  width: 400px;
  height: 400px;
  max-height: calc(100vh - 40px);
  border-radius: 12px;
  flex-direction: column;
  overflow: hidden;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #dbdbdb;
    &-title {
      font-size: 16px;
      line-height: 24px;
      color: #262626;
      font-weight: 600;
    }
    &-icon {
      padding: 8px 16px;
      cursor: pointer;
    }
    &-temp {
      width: 50px;
    }
  }
  .bottom {
    flex: 1;
    overflow-y: scroll;
    .like-users-container {
      .like-user {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        &-info {
          flex: 1;
          &-username {
            color: #262626;
            font-weight: 600;
          }
          &-name {
            color: #8e8e8e;
          }
        }
        &-btn-container {
          .like-user-btn {
            color: white;
            font-weight: 600;
            background: #0095f6;
            border-radius: 4px;
            padding: 6px 24px;
            cursor: pointer;
          }
          .following {
            background: white;
            color: #262626;
            border: 1px solid #dbdbdb;
          }
        }
      }
    }
  }
`;
const LikeUsersModal = ({
  post,
  open,
  setOpen,
}: {
  post: IPost;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [likeUsers, setLikeUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const getLikeUsers = async () => {
      try {
        await publicRequest
          .get("/like/get_like_users", {
            params: {
              post_id: post._id,
            },
          })
          .then((response) => setLikeUsers(response.data));
      } catch (error) {}
    };
    if (open === true) {
      getLikeUsers();
    }
  }, [post, open]);
  return (
    <StyledComponentContainer>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <StyledLikeUsersContainer>
          <div className="top">
            <div className="top-temp"></div>
            <div className="top-title">Likes</div>
            <div className="top-icon" onClick={() => setOpen(false)}>
              <CloseIcon />
            </div>
          </div>
          <div className="bottom">
            <div className="like-users-container">
              {likeUsers?.length > 0 &&
                likeUsers.map((item) => (
                  <LikeUser key={item._id} lUser={item} />
                ))}
            </div>
          </div>
        </StyledLikeUsersContainer>
      </ClickAwayListener>
    </StyledComponentContainer>
  );
};
const LikeUser = ({ lUser }: { lUser: IUser }) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  return (
    <div className="like-user">
      <StyledAvatar src={(lUser?.avatar as IMedia)?.media_url} />
      <div className="like-user-info">
        <div className="like-user-info-username">{lUser.username}</div>
        <div className="like-user-info-name">{lUser.name}</div>
      </div>
      {user._id === lUser._id ? (
        <></>
      ) : (
        <div className="like-user-btn-container">
          {(user.following as string[])?.includes(lUser._id as string) ? (
            <button className="like-user-btn following">Following</button>
          ) : (
            <button className="like-user-btn">Follow</button>
          )}
        </div>
      )}
    </div>
  );
};
const ThreeDotIcon = () => {
  return (
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
  );
};
export default SwiperItem;
