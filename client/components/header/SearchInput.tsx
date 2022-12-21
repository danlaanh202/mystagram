import styled from "styled-components";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEvent, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { publicRequest } from "../../utils/requestMethod";

import { IMedia, IUser } from "../../types";
import { useRouter } from "next/router";
import useDebounce from "../../hooks/useDebounce";
import { m1000, md, md2 } from "../../utils/responsive";
const StyledSearch = styled.div`
  flex: 1;
  height: 36px;
  position: relative;
  margin-left: 12px;
  ${m1000({
    marginRight: "20px",
  })}
  ${md2({
    display: "none",
  })}
  .search-input {
    height: 100%;
    padding: 4px 4px 4px 32px;
    border-radius: 8px;
    background: #efefef;
    border: none;
    outline: none;
    width: 250px;
    ::placeholder {
      color: #b79a9b;
    }
  }
  .search-icon {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #b79a9b;
  }
`;
const StyledDropdownContainer = styled.div`
  position: absolute;
  background: white;
  top: calc(100% + 10px);
  left: 40%;
  transform: translateX(-50%);
  width: 375px;
  height: 20px;
  height: 360px;
  border-radius: 8px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32));
  transition: opacity 331ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  :before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    top: -5px;
    background: white;
    left: 50%;
    z-index: 0;
  }
  .dropdown-paper {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    .dropdown-items {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
    .hide-scroll {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .nothing-show {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8e8e8e;
    }
  }
`;
const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const searchTextDebounce = useDebounce(searchText, 300);
  const [searchUsers, setSearchUsers] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  useEffect(() => {
    const getSearchUsers = async () => {
      try {
        await publicRequest
          .get("/user/search_users", {
            params: {
              search_text: searchTextDebounce,
            },
          })
          .then((response) => {
            setSearchUsers(response.data);
            setIsSearching(false);
          });
      } catch (error) {
        setIsSearching(false);
      }
    };
    if (searchTextDebounce !== "") {
      getSearchUsers();
    } else {
      setIsSearching(false);
    }
  }, [searchTextDebounce]);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <StyledSearch>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            {
              setSearchText(e.target.value);
              setOpen(true);
              setIsSearching(true);
            }
          }}
          onClick={() => setOpen(true)}
          type="text"
          placeholder="search"
          className="search-input"
        />
        <div className="search-icon">
          <SearchRoundedIcon />
        </div>
        {open && (
          <StyledDropdownContainer>
            <div className="dropdown-paper">
              {isSearching ? (
                <LoadingComponent></LoadingComponent>
              ) : (
                <>
                  {searchText ? (
                    <div
                      className={`dropdown-items ${
                        searchUsers?.length >= 6 ? "" : "hide-scroll"
                      }`}
                    >
                      {searchUsers?.length > 0 &&
                        searchUsers.map((item: IUser) => (
                          <DropdownItem key={item._id} searchUser={item} />
                        ))}
                    </div>
                  ) : (
                    <div className="nothing-show">No results found.</div>
                  )}
                </>
              )}
            </div>
          </StyledDropdownContainer>
        )}
      </StyledSearch>
    </ClickAwayListener>
  );
};
const StyledDropdownItem = styled.div`
  .item-container {
    cursor: pointer;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    :hover {
      background: #fafafa;
    }
    .avatar-container {
      margin-right: 12px;
    }
    .info-container {
      .info-username {
        color: #262626;
        font-weight: 600;
      }
      .info-name {
        color: #8e8e8e;
        margin-top: 2px;
      }
    }
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 44px !important;
  height: 44px !important;
`;
const DropdownItem = ({ searchUser }: { searchUser: IUser }) => {
  const router = useRouter();
  return (
    <StyledDropdownItem onClick={() => router.push(`/${searchUser.username}`)}>
      <div className="item-container">
        <div className="avatar-container">
          <StyledAvatar src={(searchUser.avatar as IMedia)?.media_url} />
        </div>
        <div className="info-container">
          <div className="info-username">{searchUser.username}</div>
          <div className="info-name">{searchUser.name}</div>
        </div>
      </div>
    </StyledDropdownItem>
  );
};
const StyledLoadingContainer = styled.div`
  .sk-fading-circle {
    margin: 100px auto;
    width: 20px;
    height: 20px;
    position: relative;
  }

  .sk-fading-circle .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-fading-circle .sk-circle:before {
    content: "";
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #333;
    border-radius: 100%;
    -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
    animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
  }
  .sk-fading-circle .sk-circle2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
  }
  .sk-fading-circle .sk-circle3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }
  .sk-fading-circle .sk-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .sk-fading-circle .sk-circle5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }
  .sk-fading-circle .sk-circle6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
  }
  .sk-fading-circle .sk-circle7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .sk-fading-circle .sk-circle8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
  }
  .sk-fading-circle .sk-circle9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
  }
  .sk-fading-circle .sk-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  .sk-fading-circle .sk-circle11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
  }
  .sk-fading-circle .sk-circle12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
  }
  .sk-fading-circle .sk-circle2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .sk-fading-circle .sk-circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .sk-fading-circle .sk-circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .sk-fading-circle .sk-circle5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  .sk-fading-circle .sk-circle6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .sk-fading-circle .sk-circle7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .sk-fading-circle .sk-circle8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .sk-fading-circle .sk-circle9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .sk-fading-circle .sk-circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  .sk-fading-circle .sk-circle11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .sk-fading-circle .sk-circle12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  @-webkit-keyframes sk-circleFadeDelay {
    0%,
    39%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }

  @keyframes sk-circleFadeDelay {
    0%,
    39%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }
`;
const LoadingComponent = () => {
  return (
    <StyledLoadingContainer>
      <div className="sk-fading-circle">
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    </StyledLoadingContainer>
  );
};
export default SearchInput;
