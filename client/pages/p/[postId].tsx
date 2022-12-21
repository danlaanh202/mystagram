import styled from "styled-components";
import Head from "next/head";
import Layout from "../../components/Layout";
import SwiperItem from "../../components/image-item/SwiperItem";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IPost } from "../../types";
const StyledPostContainer = styled.div`
  background: #fafafa;
  min-height: 100vh;
`;
const StyledContainer = styled.div`
  width: 100%;
  max-width: 935px;
  margin: 0 auto;
  padding: 20px;
`;
const Post = ({ post }: { post: IPost }) => {
  console.log(post);
  return (
    <StyledPostContainer>
      <Head>
        <title>Instagram photo by abcxyz</title>
      </Head>
      <Layout>
        {/* <SwiperItem /> */}
        <StyledContainer>
          <SwiperItem post={post} />
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
