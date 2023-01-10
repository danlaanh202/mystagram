import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../../components/modals/LikeUsersModal";
import StoryItem from "../../../components/story/StoryItem";
import { IStory, IUser } from "../../../types";
import { publicRequest } from "../../../utils/requestMethod";
import { md } from "../../../utils/responsive";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { GetServerSideProps } from "next";
const StyledStoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #202023;
  padding: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  ${md({
    padding: 0,
  })}
  .close-btn-icon {
    right: 20px;
    top: 20px;
    position: absolute;
    cursor: pointer;
    ${md({ display: "none" })}
    svg {
      color: white;
    }
  }
  .control-btn {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: white;
    opacity: 0.4;
    cursor: pointer;
    ${md({
      display: "none",
    })}
    :hover {
      opacity: 1;
    }
    :disabled {
      opacity: 0;
      pointer-events: none;
    }
  }
  .reverse {
    transform: rotate(180deg);
  }
`;
const storyId = ({ initialStories }: { initialStories: IStory[] }) => {
  const router = useRouter();
  const [stories, setStories] = useState<IStory[]>(initialStories);
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const getStories = async () => {
      await publicRequest
        .get("/story/get_stories_by_username", {
          params: {
            username: router.query.username,
          },
        })
        .then((res) => setStories(res.data));
    };
    getStories();
  }, []);
  const controlStory = (type: -1 | 1) => {
    if (type === -1) {
      if (activeId === 0) {
        return;
      }
      setActiveId((prev) => prev - 1);
    } else if (type === 1) {
      if (activeId === stories.length - 1) {
        return;
      }

      setActiveId((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.history.pushState(
      "",
      "",
      `/stories/${(stories[0]?.poster as IUser)?.username}/${
        stories[activeId]?._id
      }`
    );
  }, [activeId]);
  return (
    <StyledStoryContainer>
      <Head>
        <title>Story</title>
      </Head>
      <div
        className="close-btn-icon"
        onClick={() => {
          router.push("/");
        }}
      >
        <CloseIcon />
      </div>
      <button
        className="control-btn reverse"
        disabled={activeId === 0}
        onClick={() => controlStory(-1)}
      >
        <ChevronRightIcon />
      </button>
      <StoryItem
        activeId={activeId}
        setActiveId={setActiveId}
        stories={stories}
        controlStory={controlStory}
      />
      <button
        className="control-btn"
        disabled={activeId === stories.length - 1}
        onClick={() => controlStory(1)}
      >
        <ChevronRightIcon />
      </button>
    </StyledStoryContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialStories = await publicRequest
    .get("/story/get_stories_by_username", {
      params: {
        username: context.query.username,
      },
    })
    .then((res) => res.data);
  return {
    props: {
      initialStories: initialStories,
    },
  };
};
export default storyId;
