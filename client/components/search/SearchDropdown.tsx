import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IUser } from "../../types";

import DropdownItem from "./DropdownItem";
import LoadingComponent from "./LoadingComponent";

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
const SearchDropdown = ({
  searchUsers,
  isSearching,
  searchText,
  setOpen,
}: {
  searchUsers: IUser[];
  isSearching: boolean;
  searchText: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
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
                    <DropdownItem
                      clearDropdown={() => {
                        if (setOpen) setOpen(false);
                      }}
                      key={item._id}
                      searchUser={item}
                    />
                  ))}
              </div>
            ) : (
              <div className="nothing-show">No results found.</div>
            )}
          </>
        )}
      </div>
    </StyledDropdownContainer>
  );
};

export default SearchDropdown;
