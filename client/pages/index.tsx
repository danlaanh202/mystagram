import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import Home from "../components/Home";
import { IRootState } from "../redux/store";
import { GetServerSideProps } from "next";

import { IPost } from "../types";
import { socket } from "./_app";
import { publicRequest } from "../utils/requestMethod";

const HomeContainer = styled.div``;
const Pages = ({ initialPosts }: { initialPosts: IPost[] }) => {
  const user = useSelector((state: IRootState) => state.user.user);

  useEffect(() => {
    socket.emit("active", { user: user });
  }, [user]);

  return (
    <HomeContainer>
      <Head>
        <title>Instagram</title>
      </Head>
      <Home initialPosts={initialPosts} />
    </HomeContainer>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  let initialPosts = await publicRequest
    .get(`/post/get_posts`, {
      params: {
        limit: "20",
        page: "1",
      },
    })
    .then((res) => res.data.docs);

  return {
    props: {
      initialPosts: initialPosts,
    },
  };
};
export default Pages;
