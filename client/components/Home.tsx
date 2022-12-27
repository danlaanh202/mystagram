import styled from "styled-components";

import Layout from "./Layout";
import ReelItem from "./main/ReelItem";
import RightItems from "./main/RightItems";
import Story from "./main/Story";
import { IPost } from "../types";
import StoryDialog from "./dialog/StoryDialog";
import { m1000, md } from "../utils/responsive";
import MobileNavbar from "./mobilenav/MobileNavbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

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
  })}
`;
const MainItems = styled.div`
  width: 470px;
  ${m1000({
    marginLeft: "auto",
    marginRight: "auto",
  })}
`;
const ReelContainer = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #dbdbdb;
  ${md({
    borderRadius: 0,
  })}
`;

const Home = ({ initialPosts }: { initialPosts: IPost[] }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    setPosts(initialPosts); //re-init posts state
  }, []);
  return (
    <StyledHome>
      <Layout isShowMobileBar={true} isShowHeader={true}>
        <MainContainer>
          <MainItems>
            <ReelContainer>
              <ReelItem />
              <ReelItem />
            </ReelContainer>
            <div id="scrollable-story-div">
              {/* <InfiniteScroll
                next={() => {}}
                hasMore={false}
                refreshFunction={() => {}}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                loader={
                  <h4
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Loading...
                  </h4>
                }
                inverse={true}
                dataLength={10}
                className="outer-messages"
                scrollableTarget="scrollable-story-div"
              > */}
              {posts.map((item) => (
                <Story showCommentInput={true} key={item._id} post={item} />
              ))}
              {/* </InfiniteScroll> */}
            </div>
          </MainItems>
          <RightItems />
        </MainContainer>
      </Layout>
    </StyledHome>
  );
};

export default Home;
