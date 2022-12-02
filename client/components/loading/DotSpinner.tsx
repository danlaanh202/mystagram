import styled from "styled-components";

const StyledDot = styled.div`
  .spinner {
    width: 20px;
    height: 20px;
    /* margin: 100px auto; */
    background-color: #333;

    border-radius: 100%;
    -webkit-animation: sk-scaleout 1s infinite ease-in-out;
    animation: sk-scaleout 1s infinite ease-in-out;
  }

  @-webkit-keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
`;
const DotSpinner = () => {
  return (
    <StyledDot>
      <div className="spinner"></div>
    </StyledDot>
  );
};

export default DotSpinner;
