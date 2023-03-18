import styled from "styled-components";
import Layout from "../../components/Layout";
import Head from "next/head";
import GridExploreItems from "../../components/explore/GridExploreItems";
import { ChangeEvent, useEffect, useState } from "react";
import ImageSliderModal from "../../components/modals/ImageSliderModal";
import { IPost } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import { md } from "../../utils/responsive";
import MobileSearchComponent from "../../components/dialog/MobileSearchComponent";
import useDebounce from "../../hooks/useDebounce";
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
  z-index: 20;
  ${md({
    display: "flex",
  })}
  .cancel-btn {
    margin-left: 12px;
    color: #262626;
    font-weight: 600;
  }
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
const Explore = () => {
  const [showImageSlider, setShowImageSlider] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>(-1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showSearchComponent, setShowSearchComponent] =
    useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const searchTextDebounce = useDebounce(searchText, 300);

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
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIsSearching(true);
              setSearchText(e.target.value);
            }}
            value={searchText}
            onFocus={() => setShowSearchComponent(true)}
            type="text"
            className="search-inp"
            placeholder="Search"
          />
          {showSearchComponent && (
            <div
              onClick={() => {
                setShowSearchComponent(false);
                setSearchText("");
              }}
              className="cancel-btn"
            >
              Cancel
            </div>
          )}
        </StyledSearchBar>
        <StyledContainer>
          {showSearchComponent && (
            <MobileSearchComponent
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              searchText={searchTextDebounce}
            />
          )}
          <div style={showSearchComponent ? { display: "none" } : {}}>
            <GridExploreItems
              setShowImageSlider={setShowImageSlider}
              posts={posts}
              setModalIndex={setModalIndex}
            />
          </div>
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

export default Explore;
