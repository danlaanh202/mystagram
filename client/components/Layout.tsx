import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
const StyledContainer = styled.div`
  padding-top: 62px;
`;
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
