import styled from "styled-components";

import Layout from "./Layout";
import ReelItem from "./main/ReelItem";
import RightItems from "./main/RightItems";
import Story from "./main/Story";
import { IPost, IStory, IUser } from "../types";
import Carousel from "react-multi-carousel";
import { m1000, md } from "../utils/responsive";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { publicRequest } from "../utils/requestMethod";
import LoadingComponent from "./search/LoadingComponent";
import CreateStoryDialog from "./dialog/CreateStoryDialog";
import useWindowSize from "../hooks/useWindowSize";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";
import { groupStoriesFunc } from "../utils";
import StoriesDialog from "./dialog/StoriesDialog";
import { useRouter } from "next/router";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const StyledHome = styled.div`
  background: #fafafa;
  min-height: 100vh;
`;
const MainContainer = styled.div`
  max-width: 820px;
  width: 100%;
  margin: 0 auto;
  padding: 8px 0;
  display: flex;
  gap: 32px;
  ${md({
    padding: 0,
    marginBottom: "44px",
  })}
`;
const MainItems = styled.div`
  width: 470px;
  ${m1000({
    marginLeft: "auto",
    marginRight: "auto",
  })}
  ${md({
    width: "100%",
  })}
`;
const ReelContainer = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  .carousel-container {
    width: 100%;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    .react-multiple-carousel__arrow {
      min-width: 26px;
      min-height: 26px;
      background: white;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
      ${md({
        display: "none",
        transition: "0s",
      })};
      ::before {
        font-weight: 600;
        color: #262626;
        font-size: 14px;
      }
    }
  }

  background: white;
  border-radius: 12px;
  border: 1px solid #dbdbdb;
  overflow: hidden;
  ${md({
    borderRadius: 0,
  })}
`;

export interface IGroupStories {
  [key: string]: IStory[];
}

const Home = ({ initialPosts }: { initialPosts: IPost[] }) => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [windowWidth, windowHeight] = useWindowSize();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [groupsStories, setGroupsStories] = useState<IGroupStories>({});
  const [activeSlider, setActiveSlider] = useState(-1);
  const refreshData = async () => {
    setHasMore(true);
    try {
      await publicRequest
        .get("/post/get_posts", {
          params: {
            limit: "20",
            page: 1,
          },
        })
        .then((res) => {
          if (res.data.docs.length === 0) {
            setHasMore(false);
          }

          setPosts(res.data.docs);
        });
    } catch (error) {
      setHasMore(false);
      console.log(error);
    }
  };
  const getMoreData = async () => {
    try {
      let lastId = posts[posts.length - 1]?._id;
      await publicRequest
        .get("/post/get_posts", {
          params: {
            limit: "20",
            page: 1,
            last_post: lastId,
          },
        })
        .then((res) => {
          if (res.data.docs.length === 0) {
            setHasMore(false);
          }
          setPosts((prev: IPost[]) => [...prev, ...res.data.docs]);
        });
    } catch (error) {
      setHasMore(false);
      console.log(error);
    }
  };
  useEffect(() => {
    const getStories = async () => {
      await publicRequest
        .get("/story/get", {
          params: {
            followingIds: [user._id, ...(user.following as string[])],
          },
        })
        .then((res) => setGroupsStories(groupStoriesFunc(res.data)));
    };
    getStories();
  }, []);
  useEffect(() => {
    Object.entries(groupsStories).map(([k, v]) =>
      console.log("k", k, "\n v", v)
    );
  }, [groupsStories]);
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/") setActiveSlider(-1);
  }, [router]);
  return (
    <>
      <StyledHome>
        <Layout isShowMobileBar={true} isShowHeader={true}>
          <MainContainer>
            <MainItems>
              <ReelContainer>
                <Carousel
                  containerClass="carousel-container"
                  responsive={responsive}
                  slidesToSlide={7}
                >
                  {windowWidth <= 500 && <CreateStoryDialog />}
                  {Object.entries(groupsStories).map(
                    ([k, v], index: number) => (
                      <div onClick={() => setActiveSlider(index)}>
                        <ReelItem story={v[0]} />
                      </div>
                    )
                  )}
                </Carousel>
              </ReelContainer>

              <InfiniteScroll
                next={getMoreData}
                hasMore={hasMore}
                refreshFunction={refreshData}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                releaseToRefreshContent={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      marginTop: "10px",
                    }}
                  >
                    <RefreshIcon />
                  </div>
                }
                loader={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "60px",
                    }}
                  >
                    <LoadingComponent />
                  </div>
                }
                endMessage={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LoadingComponent />
                  </div>
                }
                dataLength={posts?.length || 0}
                className="outer-stories"
              >
                {posts.map((item) => (
                  <Story showCommentInput={true} key={item._id} post={item} />
                ))}
              </InfiniteScroll>
            </MainItems>
            <RightItems />
          </MainContainer>
        </Layout>
      </StyledHome>
      {activeSlider !== -1 && (
        <StoriesDialog
          activeSlider={activeSlider}
          groupsStories={groupsStories}
          setActiveSlider={setActiveSlider}
        />
      )}
    </>
  );
};

export default Home;
