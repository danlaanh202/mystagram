import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ActivityNotificationItem from "../../../components/ActivityNotificationItem";
import MobileHeader from "../../../components/header/MobileHeader";
import Layout from "../../../components/Layout";
import { IRootState } from "../../../redux/store";
import { INotification, IUser } from "../../../types";
import { publicRequest } from "../../../utils/requestMethod";
import { md } from "../../../utils/responsive";

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
const index = () => {
  const [notis, setNotis] = useState<INotification[]>([]);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const headerTitle = useSelector((state: IRootState) => state.header.title);
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
  return (
    <StyledActivityContainer>
      <Head>
        <title>Activity</title>
      </Head>
      <Layout isShowMobileBar={true} isShowHeader={false}>
        <MobileHeader leftCompRouter={"/"} centerComp={<>Notifications</>} />
        <StyledActContainer>
          {notis?.length > 0 &&
            notis.map((item, index) => (
              <ActivityNotificationItem
                key={item._id}
                noti={item}
                setSeen={setSeen}
              />
            ))}
        </StyledActContainer>
      </Layout>
    </StyledActivityContainer>
  );
};

export default index;
