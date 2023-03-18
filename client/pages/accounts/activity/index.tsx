import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ActivityNotificationItem from "../../../components/ActivityNotificationItem";
import MobileHeader from "../../../components/header/MobileHeader";
import NotificationItem from "../../../components/header/NotificationItem";
import Layout from "../../../components/Layout";
import { setIsUnseenNotification } from "../../../redux/headerStatusRedux";
import { IRootState } from "../../../redux/store";
import { INotification, IUser } from "../../../types";
import { publicRequest } from "../../../utils/requestMethod";
import { md } from "../../../utils/responsive";
import { socket } from "../../_app";

const StyledActivityContainer = styled.div`
  background: #fafafa;
  min-height: 100vh;
  width: 100vw;
  ${md({
    background: "#ffffff",
  })}
`;
const StyledActContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  /* min-height: 100vh; */
`;
const Activity = () => {
  const dispatch = useDispatch();
  const [notis, setNotis] = useState<INotification[]>([]);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const setSeen = (id: string) => {
    setNotis((prev: INotification[]) =>
      prev.map((item) => {
        if (item._id === id) {
          return { ...item, is_seen: true };
        } else {
          return item;
        }
      })
    );
  };
  useEffect(() => {
    dispatch(setIsUnseenNotification(false));
    notis.every((item) => {
      if (item.is_seen === false) {
        dispatch(setIsUnseenNotification(true));
        return false;
      }
      return true;
    });
  }, [notis]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        await publicRequest
          .get("/noti/get_notifications", {
            params: {
              user_id: user._id,
            },
          })
          .then((response) => {
            setNotis(response.data);
          });
      } catch (error) {}
    };
    getNotifications();
  }, []);
  useEffect(() => {
    socket.on("get_new_noti", (data) => {
      setNotis((prev: INotification[]) => [data, ...prev]);
      dispatch(setIsUnseenNotification(true));
    });
  }, [socket]);
  return (
    <StyledActivityContainer>
      <Head>
        <title>Activity</title>
      </Head>
      <Layout isShowMobileBar={true} isShowHeader={false}>
        <MobileHeader leftCompRouter={"/"} centerComp={<>Notifications</>} />
        <StyledActContainer>
          {notis?.length > 0 &&
            notis.map((item) => (
              <NotificationItem key={item._id} noti={item} setSeen={setSeen} />
            ))}
        </StyledActContainer>
      </Layout>
    </StyledActivityContainer>
  );
};

export default Activity;
