import { Avatar } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import MobileHeader from "../../../components/header/MobileHeader";
import PostComment from "../../../components/image-item/PostComment";
import Layout from "../../../components/Layout";
import { IComment, IMedia, IUser } from "../../../types";
import { publicRequest } from "../../../utils/requestMethod";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { IRootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";
import { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
const StyledCommentPageContainer = styled.div``;
const StyledContainer = styled.div`
  .comment-input-container {
    min-height: 62px;
    position: sticky;
    top: 44px;
    left: 0;
    right: 0;
    background: rgb(239, 239, 239);
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    padding: 8px 0px;
    display: flex;
    align-items: center;
    z-index: 20;
    form {
      width: 100%;
      margin-right: 16px;
      padding: 12px 16px;
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 30px;
      display: flex;
      align-items: center;
      textarea {
        flex: 1;
        border: none;
        outline: none;
      }
      .add-comment-btn {
        font-weight: 600;
        color: #0095f6;
        :disabled {
          color: #b3dbff;
        }
      }
    }
  }
`;
const StyledCommentsContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;

  gap: 8px;
  margin-bottom: 44px;
`;
const StyledAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  margin: 0 16px;
`;
const comments = ({
  initialComments,
  postId,
}: {
  initialComments: IComment[];
  postId: string;
}) => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const router = useRouter();
  const [width, height] = useWindowSize();
  const [cmts, setCmts] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState("");
  // const {
  //   handleSubmit,
  //   register,
  //   reset,
  //   formState: { errors, isValid, isSubmitting },
  // } = useForm({
  //   mode: "onSubmit",
  // });
  useEffect(() => {
    if (width >= 500) router.push(`/p/${postId}`);
  }, [width]);
  useEffect(() => {
    setCmts(initialComments);
  }, []);
  const onCommentHandler = async () => {
    try {
      await publicRequest
        .post("/comment/comment", {
          user_id: user._id,
          post_id: postId,
          comment: commentText,
        })
        .then((response) => {
          setCmts((prev: IComment[]) => [
            ...prev,
            response.data.comment as IComment,
          ]);
        })
        .then(() => {
          setCommentText("");
          // reset();
          // setToBottom();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledCommentPageContainer>
      <Head>
        <title>Comment on post</title>
      </Head>
      <Layout isShowHeader={false} isShowMobileBar={true}>
        <StyledContainer>
          <MobileHeader centerComp={<>Comments</>} />
          <div className="comment-input-container">
            <StyledAvatar src={(user?.avatar as IMedia)?.media_url} />
            <form>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Add a comment..."
                maxRows={6}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.keyCode == 13) {
                    onCommentHandler();
                  }
                }}
              />
              <button onClick={onCommentHandler} className="add-comment-btn">
                Post
              </button>
            </form>
          </div>
          <StyledCommentsContainer>
            {cmts.length === 0 &&
              initialComments.map((item) => (
                <PostComment key={item._id} comment={item} />
              ))}
            {cmts.length > 0 &&
              cmts.map((item) => <PostComment key={item._id} comment={item} />)}
          </StyledCommentsContainer>
        </StyledContainer>
      </Layout>
    </StyledCommentPageContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const comments = await publicRequest
    .get("/comment/get_comments", {
      params: {
        post_id: context.query.postId,
      },
    })
    .then((response) => {
      return response.data;
    });

  return {
    props: {
      initialComments: comments,
      postId: context.query.postId,
    },
  };
};
export default comments;
