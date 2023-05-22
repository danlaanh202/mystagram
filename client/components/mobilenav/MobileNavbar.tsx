import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IUser } from "../../types";
import ActivityFeedIcon from "../icons/ActivityFeedIcon";
import HomeIcon from "../icons/HomeIcon";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";
import CreateNewPostMobile from "../modals/CreateNewPostMobile";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledNavbarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledNavbarButtonContainer = styled.div`
  flex: 1;
  height: 100%;
  .add-post-input {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    label {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 24px !important;
  height: 24px !important;
`;
const MobileNavbar = () => {
  const [activeId, setActiveId] = useState(0);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const router = useRouter();
  const { isUnseenNotification } = useSelector(
    (state: IRootState) => state.header
  );
  useEffect(() => {
    let url = router.asPath.split("/");
    if (url[1] === "") setActiveId(0);
    else if (url[1] === "direct") setActiveId(1);
    else if (url[1] === "explore") setActiveId(3);
  }, [router]);
  return (
    <>
      <StyledNavbarContainer>
        <StyledNavbarButtonContainer>
          <Link href="/">
            <a
              style={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HomeIcon isActive={activeId === 0} />
            </a>
          </Link>
        </StyledNavbarButtonContainer>
        <StyledNavbarButtonContainer>
          <Link href="/explore">
            <a
              style={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </a>
          </Link>
        </StyledNavbarButtonContainer>
        <StyledNavbarButtonContainer onClick={() => setOpenCreatePost(true)}>
          <div className="add-post-input">
            <label htmlFor="add-post">
              <AddPostIcon />
            </label>
          </div>
        </StyledNavbarButtonContainer>
        <StyledNavbarButtonContainer>
          <Link href="/accounts/activity">
            <a
              style={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityFeedIcon />
              {isUnseenNotification && (
                <div
                  className="new-noti"
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    background: "#ff3040",
                    width: "4px",
                    height: "4px",
                    borderRadius: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                ></div>
              )}
            </a>
          </Link>
        </StyledNavbarButtonContainer>
        <StyledNavbarButtonContainer>
          <Link href={`/${user.username}`}>
            <a
              style={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledAvatar src={(user.avatar as IMedia)?.media_url} />
            </a>
          </Link>
        </StyledNavbarButtonContainer>
      </StyledNavbarContainer>
      <CreateNewPostMobile open={openCreatePost} setOpen={setOpenCreatePost} />
    </>
  );
};

export default MobileNavbar;
const SearchIcon = () => {
  return (
    <svg
      aria-label="Search &amp; Explore"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      ></line>
    </svg>
  );
};
const AddPostIcon = () => {
  return (
    <svg
      aria-label="New post"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="6.545"
        x2="17.455"
        y1="12.001"
        y2="12.001"
      ></line>
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="12.003"
        x2="12.003"
        y1="6.545"
        y2="17.455"
      ></line>
    </svg>
  );
};
