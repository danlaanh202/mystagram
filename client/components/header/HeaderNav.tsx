import styled from "styled-components";

import FindPeopleIcon from "../icons/FindPeopleIcon";
import HomeIcon from "../icons/HomeIcon";
import MessageIcon from "../icons/MessageIcon";

import Link from "next/link";
import AccountMenu from "./AccountMenu";
import CreateNewPost from "../modals/CreateNewPost";
import ActivityFeed from "./ActivityFeed";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { IMessage, IUser } from "../../types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { publicRequest } from "../../utils/requestMethod";
import { useDispatch } from "react-redux";
import {
  IUnseenMessages,
  setUnseenMessages,
} from "../../redux/headerStatusRedux";
import { socket } from "../../pages/_app";

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
  .message-icon {
    position: relative;
    .number-not-seen {
      position: absolute;
      min-width: 18px;
      height: 18px;
      border-radius: 100px;
      background: #ff3040;
      top: -6px;
      right: -8px;
      text-align: center;
      color: white;
      font-size: 11px;
    }
  }
`;
const HeaderNav = () => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const router = useRouter();
  const [activeId, setActiveId] = useState(0);
  const dispatch = useDispatch();
  const { unseenMessages } = useSelector((state: IRootState) => state.header);
  useEffect(() => {
    let url = router.asPath.split("/");
    if (url[1] === "") setActiveId(0);
    else if (url[1] === "direct") setActiveId(1);
    else if (url[1] === "explore") setActiveId(3);
  }, [router]);
  useEffect(() => {
    const getNumberOfUnseen = async () => {
      await publicRequest("/room/unseen_number", {
        params: {
          userId: user?._id,
        },
      }).then((resp) => {
        // console.log(resp.data);
        let unseenMessages = resp.data.map((item: IMessage) => {
          return { _id: item._id, room: item.room };
        });

        dispatch(setUnseenMessages(unseenMessages));
      });
    };
    if (user) {
      getNumberOfUnseen();
    }
  }, []);

  return (
    <StyledHeaderNav>
      <Link href="/">
        <a
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HomeIcon isActive={activeId === 0} />
        </a>
      </Link>
      <Link href="/direct/inbox">
        <a
          className="message-icon"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {unseenMessages?.length > 0 && (
            <div className="number-not-seen">{unseenMessages.length}</div>
          )}
          <MessageIcon isActive={activeId === 1} />
        </a>
      </Link>
      <CreateNewPost />
      <Link href="/explore">
        <a
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FindPeopleIcon isActive={activeId === 3} />
        </a>
      </Link>

      <ActivityFeed />
      <AccountMenu user={user as IUser} />
    </StyledHeaderNav>
  );
};

export default HeaderNav;
