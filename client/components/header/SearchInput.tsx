import styled from "styled-components";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { ChangeEvent, useEffect, useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import { publicRequest } from "../../utils/requestMethod";

import { IUser } from "../../types";

import useDebounce from "../../hooks/useDebounce";
import { m1000, md2 } from "../../utils/responsive";

import SearchDropdown from "../search/SearchDropdown";
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
          <SearchDropdown
            searchUsers={searchUsers}
            searchText={searchText}
            isSearching={isSearching}
            setOpen={setOpen}
          />
        )}
      </StyledSearch>
    </ClickAwayListener>
  );
};

export default SearchInput;
