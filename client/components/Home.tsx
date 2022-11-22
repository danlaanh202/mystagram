import styled from "styled-components";

import Layout from "./Layout";
import ReelItem from "./main/ReelItem";
import RightItems from "./main/RightItems";
import Story from "./main/Story";
import { IPost } from "../types";
import StoryDialog from "./dialog/StoryDialog";

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
`;
const MainItems = styled.div`
  width: 470px;
`;
const ReelContainer = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #dbdbdb;
`;

const Home = ({ initialPosts }: { initialPosts: IPost[] }) => {
  return (
    <StyledHome>
      <Layout>
        <MainContainer>
          <MainItems>
            <ReelContainer>
              <ReelItem />
              <ReelItem />
            </ReelContainer>

            {initialPosts.map((item, index) => (
              <Story key={item._id} post={item} />
            ))}
          </MainItems>
          <RightItems />
        </MainContainer>
      </Layout>
    </StyledHome>
  );
};

export default Home;
