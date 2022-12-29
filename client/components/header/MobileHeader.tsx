import { useRouter } from "next/router";
import { ReactNode } from "react";
import styled from "styled-components";
import { md } from "../../utils/responsive";
import { BackIcon } from "../message/InboxList";

const StyledMobileHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: white;
  border-bottom: 1px solid #dbdbdb;
  display: none;
  z-index: 20;
  ${md({
    display: "flex",
  })}
  .left-btn {
    min-width: 32px;
  }
  .center-content {
    display: flex;
    align-items: center;
    color: #383838;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .right-content {
    min-width: 32px;
  }
`;

const MobileHeader = ({
  leftComp = (
    <div className="left-btn" onClick={() => router.push(leftCompRouter)}>
      <BackIcon />
    </div>
  ),
  centerComp,
  rightComp,
  leftCompRouter = "/",
  backRouter = "/",
  rightFunc = () => {},
}: {
  leftComp?: ReactNode;
  centerComp: ReactNode;
  rightComp?: ReactNode;
  leftCompRouter?: string;
  backRouter?: string;
  rightFunc?: () => void;
}) => {
  const router = useRouter();

  return (
    <StyledMobileHeader>
      {leftCompRouter !== "/" ? (
        leftComp
      ) : (
        <div className="left-btn" onClick={() => router.push(backRouter)}>
          <BackIcon />
        </div>
      )}
      <div className="center-content">{centerComp && centerComp}</div>
      <div
        className="right-content"
        onClick={() => {
          rightFunc();
        }}
      >
        {rightComp && rightComp}
      </div>
    </StyledMobileHeader>
  );
};

export default MobileHeader;
