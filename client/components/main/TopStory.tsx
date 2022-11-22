import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { IMedia, IPost } from "../../types";
import { useRouter } from "next/router";
import StoryDialog from "../dialog/StoryDialog";

const StyledTopStory = styled.div`
  padding: 8px 4px 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .p-8 {
    padding: 8px;
    cursor: pointer;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      font-size: 14px;
      line-height: 18px;
      color: #262626;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  border-radius: 100%;
  width: 32px !important;
  height: 32px !important;
  cursor: pointer;
`;
const TopStory = ({ post }: { post: IPost }) => {
  const router = useRouter();
  return (
    <StyledTopStory>
      <div
        className="info"
        onClick={() => router.push(`/${post.user?.username}`)}
      >
        <StyledAvatar src={(post.user?.avatar as IMedia)?.media_url} />
        <span>{post.user?.username}</span>
      </div>
      <div className="p-8">
        <StoryDialog />
      </div>
    </StyledTopStory>
  );
};

export default TopStory;
