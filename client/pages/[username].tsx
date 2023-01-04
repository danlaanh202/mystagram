import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Avatar from "@mui/material/Avatar";
import ProfileMuiTab from "../components/profile/ProfileMuiTab";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import axios from "axios";
import { IMedia, IPost, IUser } from "../types";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { publicRequest } from "../utils/requestMethod";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/userRedux";
import FollowersModal from "../components/modals/FollowersModal";
import FollowingModal from "../components/modals/FollowingModal";
import ImageSliderModal from "../components/modals/ImageSliderModal";
import MobileHeader from "../components/header/MobileHeader";
import { md } from "../utils/responsive";
import MobileOptionsDialog from "../components/dialog/MobileOptionsDialog";
import UnfollowModal from "../components/modals/UnfollowModal";
import {
  handleFollowUtil,
  handleUnfollowUtil,
  pushNotification,
  removeNotification,
} from "../utils";
import { socket } from "./_app";
const StyledUserProfile = styled.div``;
const StyledContainer = styled.div`
  width: 100%;
  background: #fafafa;
  min-height: 100vh;
  .prof-container {
    max-width: 935px;
    width: 100%;
    margin: 0 auto;
    padding: 30px 20px;
    overflow: hidden;
    ${md({ display: "none" })}
  }
  .mui-profile-tab {
    margin-top: 4px;
    .MuiTabs-flexContainer {
      justify-content: center !important;
      gap: 60px;
    }
    .MuiTabs-indicator {
      z-index: 5;
      top: -1px;
      height: 2px;
      background: #262626;
    }
    .MuiButtonBase-root {
      min-height: unset;
      height: 52px;
      padding: 0;
      min-width: unset;
      color: #8e8e8e;
      font-weight: 500;
      svg {
        color: #8e8e8e;
        fill: #8e8e8e;
      }
      .flex-center {
        gap: 4px;
        div {
          font-size: 12px;
          line-height: 16px;
          font-weight: 600;
        }
      }
      .MuiTouchRipple-root {
      }
    }
    .MuiButtonBase-root.Mui-selected {
      color: #262626;
      svg {
        color: #262626;
        fill: #262626;
      }
    }
  }
`;
const StyledTopContainer = styled.div`
  display: flex;
  .avatar-container {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-right: 30px;
    .avt {
      width: 150px;
      height: 150px;
    }
  }
  .prof-info {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    .t {
      display: flex;
      align-items: center;
      &-username {
        font-size: 28px;
        line-height: 32px;
        font-weight: 300;
      }
      .follow-btn {
        padding: 6px 20px;
        margin-left: 20px;
        border-radius: 4px;
        background: #0095f6;
        cursor: pointer;
        min-width: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .loading {
          animation: spin 1s linear infinite;
          width: 14px;
          height: 14px;
          border-radius: 100%;
          border: 1px solid white;
          border-right: 1px solid transparent;
        }
        div {
          font-weight: 600;
          font-size: 14px;
          line-height: 18px;
          color: white;
        }
      }
      .pri-btn {
        padding: 6px 8px;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 20px;

        div {
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
        }
      }
      &-settings {
        margin-left: 12px;
      }
    }
    .c {
      display: flex;
      &-item {
        margin-right: 40px;
        font-size: 16px;
        line-height: 24px;
        cursor: pointer;
        span {
          font-weight: 600;
          color: #262626;
        }
        &-followers {
        }
      }
    }
    .b {
      &-name {
        color: #262626;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
      }
    }
  }
`;

const StyledMobileProfileContainer = styled.div`
  display: none;
  margin: 16px;
  ${md({
    display: "block",
  })}
  .info-container {
    display: flex;
    .avt {
      width: 78px;
      height: 78px;
      /* margin-right: 28px; */
    }
    .right-prof-container {
      width: 100%;
      padding: 0 20px;
      .right-prof-username-container {
        margin-bottom: 12px;
        display: flex;
        .username {
          font-size: 28px;
          line-height: 32px;
          font-weight: 300;
        }
        .three-dot {
        }
      }
      .right-bottom-btn-container {
        display: flex;
        gap: 8px;
        .right-bottom-btn {
          width: 100%;
        }
        .rb-btn {
          padding: 4px 8px;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          color: #262626;
          font-weight: 600;
        }
        .msg-btn {
          flex: 1;
        }
        .follow-btn {
          padding: 4px 8px;
          border-radius: 4px;
          background: #0095f6;
          color: white;
          /* width: 100%; */
          flex: 1;
          text-align: center;
          .loading {
            animation: spin 1s linear infinite;
            width: 14px;
            height: 14px;
            border-radius: 100%;
            border: 1px solid white;
            border-right: 1px solid transparent;
          }
        }
      }
    }
  }
  .info-description {
    margin-top: 16px;
    .info-name {
      font-weight: 600;
    }
    .info-desc-content {
    }
  }
`;
const UserProfile = ({
  currentUser,
  posts,
}: {
  currentUser: IUser;
  posts: IPost[];
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [thisUser, setThisUser] = useState<IUser>();
  const [isFollowed, setIsFollowed] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [showImageSlider, setShowImageSlider] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(-1);
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false);
  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      handleFollowUtil(currentUser._id as string, user._id as string).then(
        (response) => {
          setFollowLoading(false);
          let [data1, data2] = response.map((item) => item.data);
          //data2.user is current url user info
          dispatch(editUser(data2.follower));
          setThisUser(data2.user);
          pushNotification({
            socket: socket,
            type: "follow",
            myId: user._id as string,
            otherId: currentUser._id as string,
          });
        }
      );
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  const handleUnfollow = async () => {
    setFollowLoading(true);
    try {
      handleUnfollowUtil(currentUser._id as string, user._id as string).then(
        async (response) => {
          setFollowLoading(false);
          setIsFollowed(false);
          let [data1, data2] = response.map((item) => item.data);
          //data2.user is current url user info
          dispatch(editUser(data2.follower));
          setThisUser(data2.user);
          removeNotification({
            type: "follow",
            myId: user._id as string,
            otherId: currentUser._id as string,
          }).then((resp) => console.log(resp));
        }
      );
    } catch (error) {
      // console.log(error);
      setFollowLoading(false);
    }
  };
  useEffect(() => {
    const getIsFollowed = async () => {
      await publicRequest
        .get("/follow/is_follow", {
          params: {
            user_id: currentUser._id,
            follower_id: user._id,
          },
        })
        .then((response) => {
          if (response.data !== null) {
            setIsFollowed(true);
          }
        });
    };
    if (currentUser._id !== user._id) {
      getIsFollowed();
    }
  }, [currentUser, user]);

  return (
    <StyledUserProfile>
      <Head>
        <title>
          {thisUser?.name || currentUser?.name}{" "}
          {`@${(thisUser?.username as string) || currentUser.username}`}
        </title>
      </Head>
      <Layout isShowMobileBar={true} isShowHeader={false}>
        <>
          <MobileHeader
            leftComp={<MobileOptionsDialog />}
            leftCompRouter="/abc"
            rightComp={<>{user._id === currentUser?._id && <DiscoverIcon />}</>}
            centerComp={(thisUser?.username as string) || currentUser.username}
            rightFunc={() => {
              router.push("/explore/people");
            }}
          />
          <StyledContainer>
            <div className="prof-container">
              <StyledTopContainer>
                <div className="avatar-container">
                  <Avatar
                    className="avt"
                    src={
                      (
                        (thisUser?.avatar as IMedia) ||
                        (currentUser.avatar as IMedia)
                      )?.media_url
                    }
                  />
                </div>
                <div className="prof-info">
                  <div className="t">
                    <div className="t-username">
                      {(thisUser?.username as string) || currentUser.username}
                    </div>
                    {currentUser._id === user?._id ? (
                      <>
                        <button
                          className="pri-btn"
                          onClick={() =>
                            router.push("/accounts/edit?activeInd=0")
                          }
                        >
                          <div>Edit Profile</div>
                        </button>
                        <div className="t-settings">
                          <SettingsIcon />
                        </div>
                      </>
                    ) : isFollowed ? (
                      <>
                        <button
                          className="pri-btn"
                          onClick={() => router.push("/")}
                        >
                          <div>Message</div>
                        </button>
                        <button
                          className="pri-btn"
                          onClick={() => setOpenUnfollowModal(true)}
                        >
                          <div style={{ padding: "0 16px" }}>
                            <FollowIcon />
                          </div>
                        </button>
                      </>
                    ) : (
                      <button
                        disabled={followLoading}
                        className="follow-btn"
                        onClick={handleFollow}
                      >
                        {followLoading ? (
                          <div className="loading"></div>
                        ) : (
                          <div>Follow</div>
                        )}
                      </button>
                    )}
                    <>
                      <ThreeDotIcon />
                    </>
                  </div>
                  <div className="c">
                    <div className="c-item">
                      <div>
                        <span>18</span> posts
                      </div>
                    </div>

                    <div className="c-item">
                      <FollowersModal currentUser={thisUser || currentUser}>
                        <div className="c-item-followers">
                          <span>
                            {thisUser?.followers?.length ||
                              currentUser?.followers?.length}
                          </span>{" "}
                          followers
                        </div>
                      </FollowersModal>
                    </div>
                    <div className="c-item">
                      <FollowingModal currentUser={thisUser || currentUser}>
                        <div>
                          <span>
                            {thisUser?.following?.length ||
                              currentUser?.following?.length}
                          </span>{" "}
                          following
                        </div>
                      </FollowingModal>
                    </div>
                  </div>
                  <div className="b">
                    <div className="b-name">
                      {thisUser?.name || currentUser.name}
                    </div>
                  </div>
                </div>
              </StyledTopContainer>
            </div>
            <StyledMobileProfileContainer>
              <div className="info-container">
                <div className="avatar-container">
                  <Avatar
                    className="avt"
                    src={
                      (
                        (thisUser?.avatar as IMedia) ||
                        (currentUser.avatar as IMedia)
                      )?.media_url
                    }
                  />
                </div>
                <div className="right-prof-container">
                  <div className="right-prof-username-container">
                    <div className="username">
                      {" "}
                      {(thisUser?.username as string) || currentUser.username}
                    </div>
                    {currentUser._id !== user?._id && (
                      <div className="three-dot">
                        <ThreeDotIcon />
                      </div>
                    )}
                  </div>
                  <div className="right-bottom-btn-container">
                    {currentUser._id === user?._id ? (
                      <>
                        <button
                          onClick={() =>
                            router.push("/accounts/edit?activeInd=0")
                          }
                          className="rb-btn right-bottom-btn"
                        >
                          Edit Profile
                        </button>
                      </>
                    ) : isFollowed ? (
                      <>
                        <button className="rb-btn msg-btn">Message</button>
                        <button
                          className="rb-btn"
                          onClick={() => setOpenUnfollowModal(true)}
                        >
                          <FollowIcon />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          disabled={followLoading}
                          onClick={handleFollow}
                          className="follow-btn"
                        >
                          {followLoading ? (
                            <div className="loading"></div>
                          ) : (
                            <div>Follow</div>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="info-description">
                <div className="info-name">
                  {" "}
                  {(thisUser?.name as string) || currentUser.name}
                </div>
                <div className="info-desc-content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Natus maxime ipsum at fugit sit necessitatibus beatae quaerat
                  magnam, adipisci corrupti recusandae nisi aliquid, iure dolore
                  illo accusamus animi ducimus ut?
                </div>
              </div>
            </StyledMobileProfileContainer>
            <div className="mui-profile-tab">
              <ProfileMuiTab
                setShowImageSlider={setShowImageSlider}
                posts={posts}
                setModalIndex={setModalIndex}
                currentUsername={currentUser.username}
              />
            </div>
          </StyledContainer>
        </>
      </Layout>
      {showImageSlider && (
        <ImageSliderModal
          modalIndex={modalIndex}
          setModalIndex={setModalIndex}
          open={showImageSlider}
          setOpen={setShowImageSlider}
          posts={posts}
        />
      )}
      {openUnfollowModal && (
        <UnfollowModal
          open={openUnfollowModal}
          setOpen={setOpenUnfollowModal}
          handleUnfollow={handleUnfollow}
          otherUser={thisUser || currentUser}
        />
      )}
    </StyledUserProfile>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getUser = axios.get(`${process.env.API_URL}/user/get_user`, {
    params: {
      username: context?.params?.username,
    },
  });
  const getPost = axios.get(
    `${process.env.API_URL}/post/get_posts_by_username`,
    {
      params: {
        username: context?.params?.username,
      },
    }
  );

  let [currentUser, posts] = await Promise.all([getUser, getPost]).then(
    (resp) => resp.map((item) => item.data)
  );

  return {
    props: {
      currentUser: currentUser,
      posts: posts,
    },
  };
};
export default UserProfile;

export const FollowIcon = () => {
  return (
    <svg
      aria-label="Following"
      color="#262626"
      fill="#262626"
      height="15"
      role="img"
      viewBox="0 0 95.28 70.03"
      width="20"
    >
      <path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0Zm19-50.8A19 19 0 1 1 64.32 0a19.05 19.05 0 0 1 18.91 19.18ZM14.76 50.01a5 5 0 0 1-3.37-1.31L.81 39.09a2.5 2.5 0 0 1-.16-3.52l3.39-3.7a2.49 2.49 0 0 1 3.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 0 1 3.52 0l3.53 3.58a2.49 2.49 0 0 1 0 3.52L18.23 48.57a5 5 0 0 1-3.47 1.44Z"></path>
    </svg>
  );
};
const StyledIconContainer = styled.div`
  padding: 0px 8px;
  margin-left: 4px;
  cursor: pointer;
`;
const ThreeDotIcon = () => {
  return (
    <StyledIconContainer>
      <svg
        aria-label="Options"
        color="#262626"
        fill="#262626"
        height="32"
        role="img"
        viewBox="0 0 24 24"
        width="32"
      >
        <circle cx="12" cy="12" r="1.5"></circle>
        <circle cx="6" cy="12" r="1.5"></circle>
        <circle cx="18" cy="12" r="1.5"></circle>
      </svg>
    </StyledIconContainer>
  );
};

const SettingsIcon = () => {
  return (
    <svg
      aria-label="Options"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="8.635"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
      <path
        d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  );
};
const DiscoverIcon = () => {
  return (
    <svg
      aria-label="Discover People"
      color="#262626"
      fill="#262626"
      height="24"
      role="img"
      viewBox="0 0 48 48"
      width="24"
    >
      <path d="M32 25.5c5.2 0 9.5-4.3 9.5-9.5S37.2 6.5 32 6.5s-9.5 4.3-9.5 9.5 4.3 9.5 9.5 9.5zm0-16c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zm5.5 19h-11c-5.5 0-10 4.5-10 10V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-3.9 3.1-7 7-7h11c3.9 0 7 3.1 7 7V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-5.5-4.5-10-10-10zm-20-4.5c0-.8-.7-1.5-1.5-1.5h-5.5V17c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v5.5H2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.5V31c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.5H16c.8 0 1.5-.7 1.5-1.5z"></path>
    </svg>
  );
};
