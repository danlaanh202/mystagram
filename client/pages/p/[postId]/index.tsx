import styled from "styled-components";
import Head from "next/head";

import { GetServerSideProps } from "next";
import axios from "axios";
import { IPost, IUser } from "../../../types";

import Layout from "../../../components/Layout";
import { md } from "../../../utils/responsive";
import MobileHeader from "../../../components/header/MobileHeader";
import Story from "../../../components/main/Story";
import SwiperItem from "../../../components/loading/image-item/SwiperItem";

const StyledPostContainer = styled.div`
  background: #fafafa;
  min-height: 100vh;
  ${md({
    background: "white",
  })}
`;
const StyledContainer = styled.div`
  width: 100%;
  max-width: 935px;
  margin: 0 auto;
  padding: 20px;
  ${md({
    padding: "0",
  })}
  .story-comp {
    /* margin-top:; */
    margin-bottom: 44px;
    display: none;
    ${md({
      display: "block",
    })};
    .story-container {
      ${md({
        border: "none",
      })}
    }
  }
  .pc-comp {
    ${md({ display: "none" })}
  }
`;
const Post = ({ post }: { post: IPost }) => {
  return (
    <StyledPostContainer>
      <Head>
        <title>Instagram photo by {(post.user as IUser).username}</title>
      </Head>
      <Layout isShowHeader={false} isShowMobileBar={true}>
        {/* <SwiperItem /> */}
        <StyledContainer>
          <MobileHeader centerComp={<>Post</>} />
          <div className="story-comp">
            <Story showCommentInput={false} post={post} />
          </div>
          <div className="pc-comp">
            <SwiperItem post={post} />
          </div>
        </StyledContainer>
      </Layout>
    </StyledPostContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await axios
    .get(`${process.env.API_URL}/post/get_post_by_id`, {
      params: {
        post_id: context.params?.postId,
      },
    })
    .then((response) => response.data);
  return {
    props: { post: post },
  };
};

export default Post;
