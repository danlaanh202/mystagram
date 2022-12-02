import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { IRootState } from "../redux/store";
import HeaderNav from "./header/HeaderNav";
import SearchInput from "./header/SearchInput";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function LoadingComponent() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 5000);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading ? <div id="rainbow_progress_bar"></div> : <></>;
}
const StyledHeaderContainer = styled.div`
  /* width: 100%; */
  border-bottom: 1px solid #dbdbdb;
  background: white;
  height: 62px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .container {
    max-width: 935px;
    width: 100%;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    align-items: center;
    .logo-container {
      padding-top: 8px;
      flex: 1;
      cursor: pointer;
    }
  }
`;
const Header = () => {
  const loading = useSelector((state: IRootState) => state.loading.isLoading);
  return (
    <StyledHeaderContainer>
      <LoadingComponent />
      <div className="container">
        <Link href="/">
          <a className="logo-container">
            <Image src="/logo.png" width={105} height={30} />
          </a>
        </Link>
        <SearchInput />
        {/* <SearchDropdown /> */}
        <HeaderNav />
      </div>
    </StyledHeaderContainer>
  );
};

export default Header;
