import { useEffect, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import LoadingComponent from "../search/LoadingComponent";
import SearchItem from "../search/SearchItem";

const StyledMobileSearchContainer = styled.div`
  margin-top: -20px;
  margin-bottom: 32px;
`;

const MobileSearchComponent = ({ searchText }: { searchText: string }) => {
  const [searchUsers, setSearchUsers] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(true);
  useEffect(() => {
    const getSearchUsers = async () => {
      try {
        await publicRequest
          .get("/user/search_users", {
            params: {
              search_text: searchText,
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
    if (searchText !== "") {
      getSearchUsers();
    } else {
      setIsSearching(false);
    }
  }, [searchText]);
  return (
    <StyledMobileSearchContainer>
      {isSearching && <LoadingComponent />}
      {searchUsers.map((item) => (
        <SearchItem key={item._id} searchUser={item} />
      ))}
    </StyledMobileSearchContainer>
  );
};

export default MobileSearchComponent;
