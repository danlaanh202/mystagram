import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IUser } from "../../types";
import { logout } from "../../utils/auth";
import { publicRequest } from "../../utils/requestMethod";
import { m1000 } from "../../utils/responsive";
import Suggestion from "./Suggestion";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${m1000({
    display: "none",
  })}
  .self {
    display: flex;
    align-items: center;
    margin: 16px 0 10px 0;
    .avatar-container {
      cursor: pointer;
      .avatar {
        width: 64px;
        height: 64px;
      }
    }
    .info-container {
      display: flex;
      justify-content: space-between;
      flex: 1;
      margin-left: 16px;

      .name-container {
        cursor: pointer;
        .username {
          color: #262626;
          font-weight: 600;
        }
        .name {
          margin-top: 2px;
          color: #8e8e8e;
          font-weight: 400;
        }
      }
      button {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        cursor: pointer;
        color: #0095f6;
      }
    }
  }
`;
const RightItems = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [initialNewUsers, setInitialNewUsers] = useState<IUser[]>();
  useEffect(() => {
    const getSuggestionUsers = async () => {
      try {
        await publicRequest
          .get("/user/get_suggestion_users", {
            params: {
              user_id: user._id,
              following: user.following || [], //if(populate) => user.following.map(item => item._id)
            },
          })
          .then((response) => setInitialNewUsers(response.data.docs));
      } catch (error) {}
    };
    getSuggestionUsers();
  }, []);
  return (
    <RightContainer>
      <div className="self">
        <Link href={`/${user.username}`}>
          <div className="avatar-container">
            <Avatar
              src={(user.avatar as IMedia)?.media_url}
              className="avatar"
            />
          </div>
        </Link>

        <div className="info-container">
          <div className="name-container">
            <Link href={`/${user.username}`}>
              <div className="username">{user?.username}</div>
            </Link>
            <Link href={`/${user.username}`}>
              <div className="name">{user?.name}</div>
            </Link>
          </div>
          <button
            onClick={() => {
              logout(dispatch);
              router.push("/login");
            }}
          >
            Switch
          </button>
        </div>
      </div>
      <Suggestion initialNewUsers={initialNewUsers} />
    </RightContainer>
  );
};

export default RightItems;
