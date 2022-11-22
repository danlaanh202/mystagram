import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../../redux/store";
import { IMedia, IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import Suggestion from "./Suggestion";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .self {
    display: flex;
    align-items: center;
    margin: 16px 0 10px 0;
    .avatar-container {
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
        <div className="avatar-container">
          <Avatar src={(user.avatar as IMedia)?.media_url} className="avatar" />
        </div>
        <div className="info-container">
          <div className="name-container">
            <div className="username">{user?.username}</div>
            <div className="name">{user?.name}</div>
          </div>
          <button>Switch</button>
        </div>
      </div>
      <Suggestion initialNewUsers={initialNewUsers} />
    </RightContainer>
  );
};

export default RightItems;
