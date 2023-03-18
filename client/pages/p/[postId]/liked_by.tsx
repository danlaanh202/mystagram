import Head from "next/head";
import styled from "styled-components";
import MobileHeader from "../../../components/header/MobileHeader";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { publicRequest } from "../../../utils/requestMethod";
import { IUser } from "../../../types";
import LikeUser from "../../../components/image-item/LikeUser";
import { useRouter } from "next/router";
import useWindowSize from "../../../hooks/useWindowSize";
import { useEffect } from "react";
const LikesDetailContainer = styled.div``;
const StyledPagesContainer = styled.div`
  margin-bottom: 44px;
`;
const LikedBy = ({
  initialLikes,
  postId,
}: {
  initialLikes: IUser[];
  postId: string;
}) => {
  const router = useRouter();
  const [width, height] = useWindowSize();
  useEffect(() => {
    if (width >= 500) router.push(`/p/${postId}`);
  }, [width]);
  return (
    <LikesDetailContainer>
      <Head>
        <title>Likes</title>
      </Head>
      <Layout isShowHeader={false} isShowMobileBar={true}>
        <StyledPagesContainer>
          <MobileHeader centerComp={<>Likes</>} />
          {initialLikes?.length > 0 &&
            initialLikes.map((item) => (
              <LikeUser key={item._id} lUser={item} />
            ))}
        </StyledPagesContainer>
      </Layout>
    </LikesDetailContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const likes = await publicRequest
    .get("/like/get_like_users", {
      params: {
        post_id: context.query.postId,
      },
    })
    .then((response) => response.data);

  return {
    props: {
      initialLikes: likes,
      postId: context.query.postId,
    },
  };
};
export default LikedBy;
