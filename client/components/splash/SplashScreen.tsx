import React from "react";
import styled from "styled-components";

const StyledSplashScreen = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  .logo-container {
    width: 180px;
    max-width: 50%;

    img {
      width: 100%;
    }
  }
`;
const SplashScreen = () => {
  return (
    <StyledSplashScreen>
      <div className="logo-container">
        <img src="/instagram-logo.png" alt="" />
      </div>
    </StyledSplashScreen>
  );
};

export default SplashScreen;
