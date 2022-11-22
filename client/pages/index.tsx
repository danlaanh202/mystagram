import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components";
import Home from "../components/Home";
import { IRootState } from "../redux/store";
import { GetServerSideProps } from "next";
import axios from "axios";
import { IPost, IUser } from "../types";
import { socket } from "./_app";

const HomeContainer = styled.div``;
const index = ({ initialPosts }: { initialPosts: IPost[] }) => {
  const user = useSelector((state: IRootState) => state.user.user);
  useEffect(() => {
    console.log(user);
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
  let initialPosts = await axios
    .get(`${process.env.API_URL}/post/get_posts`, {
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
export default index;
