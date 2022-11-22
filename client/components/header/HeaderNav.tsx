import styled from "styled-components";
import ActivityFeedIcon from "../icons/ActivityFeedIcon";
import FindPeopleIcon from "../icons/FindPeopleIcon";
import HomeIcon from "../icons/HomeIcon";
import MessageIcon from "../icons/MessageIcon";
import NewPostIcon from "../icons/NewPostIcon";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import CreateNewPost from "../modals/CreateNewPost";
import ActivityFeed from "./ActivityFeed";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { IUser } from "../../types";

const StyledHeaderNav = styled.div`
  flex: 1;
  display: flex;
  gap: 22px;
  justify-content: flex-end;
  align-items: center;
  .avatar-icon {
    width: 24px;
    height: 24px;
  }
`;
const HeaderNav = () => {
  const user = useSelector((state: IRootState) => state.user.user);

  return (
    <StyledHeaderNav>
      <HomeIcon />
      <Link href="/direct/inbox">
        <a
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageIcon />
        </a>
      </Link>
      <CreateNewPost />
      <FindPeopleIcon />
      <ActivityFeed />
      <AccountMenu user={user as IUser} />
    </StyledHeaderNav>
  );
};

export default HeaderNav;
