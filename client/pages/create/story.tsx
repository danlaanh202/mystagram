import styled from "styled-components";
import { md } from "../../utils/responsive";

const StyledCreateStoryContainer = styled.div`
  display: none;
  position: absolute;
  inset: 0;
  ${md({
    display: "block",
  })}
  .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;
const CreateStory = () => {
  return (
    <StyledCreateStoryContainer>
      <div className="image-container">
        <img src="/anh-test.jpg" alt="" />
      </div>
    </StyledCreateStoryContainer>
  );
};

export default CreateStory;
