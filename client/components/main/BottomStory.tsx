import {
  compareAsc,
  format,
  formatDistance,
  formatDistanceStrict,
  subDays,
} from "date-fns";
import styled from "styled-components";
import { IComment, IPost, IUser } from "../../types";
import CommentIcon from "../icons/CommentIcon";
import HeartIcon from "../icons/HeartIcon";
import SaveIcon from "../icons/SaveIcon";
import ShareIcon from "../icons/ShareIcon";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import LikeUsersModal from "../modals/LikeUsersModal";
import { md } from "../../utils/responsive";

const StyledBottomStory = styled.div`
  padding: 8px;
  .pc-comp {
    ${md({
      display: "none",
    })}
  }
  .mb-comp {
    display: none;
    ${md({
      display: "block",
    })}
  }
`;
const IconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .icon {
    padding: 8px;
    border: none;
    outline: none;
    background: white;
    cursor: pointer;
  }
`;
const StyledLikeAmount = styled.div`
  padding: 0 8px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
`;
const PostContentContainer = styled.div`
  padding: 8px;
  font-size: 14px;
  line-height: 18px;
  .post {
    .username {
      font-weight: 600;
      cursor: pointer;
      color: #262626;
    }
    &-content {
      color: #262626;
      margin-bottom: 8px;
    }
    .view-all-comments {
      color: #8e8e8e;
      font-weight: 400;
      margin-bottom: 8px;
      margin-top: 8px;
      cursor: pointer;
      .mb-router {
        display: none;
        ${md({
          display: "inline-block",
        })}
      }
      .pc-router {
        ${md({
          display: "none",
        })}
      }
    }
    .date-created {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: #8e8e8e;
      margin-bottom: 12px;
    }
    .comment {
      margin-bottom: 4px;
      &-username {
        font-weight: 600;
        cursor: pointer;
        color: #262626;
      }
    }
  }
`;
const BottomStory = ({
  post,
  toggleLike,
  setOpenModal,
}: {
  post: IPost;
  toggleLike: (isLike: boolean) => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [additionComment, setAdditionComment] = useState<IComment[]>([]);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(
    (post?.likes as string[])?.includes(user?._id as string)
  );
  useEffect(() => {
    if (
      post?.last_comment &&
      additionComment[additionComment.length - 1]?._id !==
        (post.last_comment as IComment)?._id
    ) {
      setAdditionComment((prev: IComment[]) => [
        ...prev,
        post?.last_comment as IComment,
      ]);
    }
    setIsLiked((post?.likes as string[])?.includes(user?._id as string));
  }, [post]);
  // console.log(additionComment);
  return (
    <StyledBottomStory>
      <IconsContainer>
        <div>
          <button
            className="icon"
            onClick={() => {
              toggleLike(isLiked);
              setIsLiked((prev: boolean) => !prev);
            }}
          >
            <HeartIcon isLiked={isLiked} />
          </button>
          <button className="icon">
            <div onClick={() => setOpenModal(true)} className="pc-comp">
              <CommentIcon />
            </div>
            <div
              onClick={() => {
                router.push(`/p/${post._id}/comments`);
              }}
              className="mb-comp"
            >
              <CommentIcon />
            </div>
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
      </IconsContainer>
      <div className="pc-comp">
        <LikeUsersModal post={post} />
      </div>
      <button className="mb-comp">
        <div
          onClick={() => router.push(`/p/${post._id}/liked_by`)}
          style={{
            padding: "0 8px",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: "600",
            color: "#262626",
          }}
        >
          {post.likes?.length > 1
            ? `${post.likes.length} likes`
            : `${post.likes.length} like`}
        </div>
      </button>

      {/* <StyledLikeAmount>{post.likes?.length} likes</StyledLikeAmount> */}
      <PostContentContainer>
        <div className="post">
          <span
            className="username"
            onClick={() => router.push(`/${post.user?.username}`)}
          >
            {post.user?.username}{" "}
          </span>
          <span className="post-content">{post.caption}</span>
          <div className="view-all-comments">
            <div>
              <span
                className="mb-router"
                onClick={() => {
                  router.push(`/p/${post._id}/comments`);
                }}
              >
                View all {post.comments.length} comments
              </span>
              <span className="pc-router" onClick={() => setOpenModal(true)}>
                View all {post.comments.length} comments
              </span>
            </div>
          </div>
          <div className="date-created" style={{ textTransform: "uppercase" }}>
            {formatDistance(new Date(post?.created_at as string), Date.now(), {
              addSuffix: true,
            })}
          </div>
          {additionComment?.length > 0 &&
            additionComment.map((item: IComment, index) => (
              <div key={index} className="comment">
                <span
                  className="comment-username"
                  onClick={() =>
                    router.push(`/${(item?.user as IUser)?.username}`)
                  }
                >
                  {(item?.user as IUser)?.username}{" "}
                </span>
                <span className="comment-content">{item?.comment}</span>
              </div>
            ))}
        </div>
      </PostContentContainer>
    </StyledBottomStory>
  );
};

export default BottomStory;
