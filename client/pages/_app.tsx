import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import "swiper/css/bundle";
export const socket = io(`${process.env.API_URL}`);
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const [isLogged, setIsLogged] = useState<boolean>(false);
  useEffect(() => {
    if (window) {
      if (
        router.asPath !== "/login" &&
        router.asPath !== "/accounts/emailsignup" &&
        !JSON.parse(sessionStorage?.getItem("user") as string)
      )
        router.push("/login");
      if (
        JSON.parse(sessionStorage?.getItem("user") as string) &&
        (router.asPath === "/login" ||
          router.asPath === "/accounts/emailsignup")
      )
        router.push("/");
    }
  }, [router.asPath]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
