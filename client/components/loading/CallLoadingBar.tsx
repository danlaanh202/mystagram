import styled from "styled-components";

const StyledSpinner = styled.div`
  width: 100%;
  height: 90%;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  > div {
    background-color: #333;
    height: 100%;
    width: 3px;
    display: inline-block;
    margin-left: 1px;
    margin-right: 1px;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`;
const CallLoadingBar = () => {
  return (
    <StyledSpinner>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </StyledSpinner>
  );
};

export default CallLoadingBar;
