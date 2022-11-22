import styled from "styled-components";
import { IUser } from "../../types";
import RightFooter from "../footer/RightFooter";
import SuggestionItem from "./SuggestionItem";

const StyledSuggestion = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    &-title {
      color: #8e8e8e;
      font-weight: 600;
    }
    button {
      cursor: pointer;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #262626;
    }
  }
  .suggestion {
    padding: 8px 0 8px 4px;
  }
`;
const Suggestion = ({ initialNewUsers }: { initialNewUsers?: IUser[] }) => {
  return (
    <StyledSuggestion>
      <div className="top">
        <div className="top-title">Suggestions For You</div>
        <button>See All</button>
      </div>
      <div className="suggestion">
        {initialNewUsers?.map((item, index) => (
          <SuggestionItem key={item._id} currentUser={item} />
        ))}
      </div>
      <div>
        <RightFooter />
      </div>
    </StyledSuggestion>
  );
};

export default Suggestion;
