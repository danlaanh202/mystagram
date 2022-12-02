import styled from "styled-components";
import Layout from "../../components/Layout";
import Head from "next/head";
import GridExploreItem from "../../components/explore/GridExploreItem";
import { useEffect, useState } from "react";
import ImageSliderModal from "../../components/modals/ImageSliderModal";
import { IPost } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
const StyledExploreContainer = styled.div`
  background: #fafafa;
  min-height: 100vh;
`;
const StyledContainer = styled.div`
  max-width: 935px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 0;
`;
const index = () => {
  const [showImageSlider, setShowImageSlider] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(-1);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        await publicRequest
          .get("/post/get_posts")
          .then((resp) => setPosts(resp.data.docs));
      } catch (error) {}
    };
    getPosts();
  }, []);
  return (
    <StyledExploreContainer>
      <Head>
        <title>Explore</title>
      </Head>
      <Layout>
        <StyledContainer>
          <GridExploreItem
            setShowImageSlider={setShowImageSlider}
            posts={posts}
            setModalIndex={setModalIndex}
          />
        </StyledContainer>
      </Layout>
      {showImageSlider && (
        <ImageSliderModal
          modalIndex={modalIndex}
          setModalIndex={setModalIndex}
          open={showImageSlider}
          setOpen={setShowImageSlider}
          posts={posts}
        />
      )}
    </StyledExploreContainer>
  );
};

export default index;
