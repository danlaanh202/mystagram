import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SplashScreen from "../components/splash/SplashScreen";
export const socket = io(`${process.env.API_URL}`);
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Thời gian hiển thị splash screen (2 giây trong ví dụ)

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (window) {
      if (
        router.asPath !== "/login" &&
        router.asPath !== "/accounts/emailsignup"
      ) {
        if (
          JSON.parse(
            JSON.parse(localStorage?.getItem("persist:root") as string).user
          ).user._id === undefined
        )
          router.push("/login");
      }
      if (
        router.asPath === "/login" ||
        router.asPath === "/accounts/emailsignup"
      )
        if (
          JSON.parse(
            JSON.parse(localStorage?.getItem("persist:root") as string).user
          ).user._id
        )
          router.push("/");
    }
  }, [router.asPath]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {showSplash ? <SplashScreen /> : <Component {...pageProps} />}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
