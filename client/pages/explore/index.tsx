import styled from "styled-components";
import Layout from "../../components/Layout";
import Head from "next/head";
import GridExploreItem from "../../components/explore/GridExploreItem";
import { useEffect, useState } from "react";
import ImageSliderModal from "../../components/modals/ImageSliderModal";
import { IPost } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import { md } from "../../utils/responsive";
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
const StyledSearchBar = styled.div`
  position: sticky;
  background: #ffffff;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  padding: 0 16px;
  display: none;
  align-items: center;
  ${md({
    display: "flex",
  })}
  .search-inp {
    padding: 4px 12px 4px 22px;
    flex: 1;
    border-radius: 6px;
    border: 1px solid #dbdbdb;
    color: #262626;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    ::placeholder {
      text-align: center;
    }
    :focus {
      ::placeholder {
        text-align: start;
      }
    }
  }
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
      <Layout isShowMobileBar={true} isShowHeader={false}>
        <StyledSearchBar>
          <input type="text" className="search-inp" placeholder="Search" />
        </StyledSearchBar>
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
