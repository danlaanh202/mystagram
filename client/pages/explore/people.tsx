import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MobileHeader from "../../components/header/MobileHeader";
import Layout from "../../components/Layout";
import SuggestionItem from "../../components/main/SuggestionItem";
import { IRootState } from "../../redux/store";
import { IUser } from "../../types";
import { publicRequest } from "../../utils/requestMethod";
import { md } from "../../utils/responsive";

const StyledPeoplePageContainer = styled.div``;
const StyledPeopleContainer = styled.div`
  width: 100%;
  max-width: 935px;
  margin: 0 auto;
  .suggestion-title {
    padding: 0 12px;
    margin: 16px 0 12px;
    color: #262626;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .suggestion-container {
    padding: 8px 16px;
    margin-bottom: 20px;
    ${md({
      marginBottom: "44px",
    })}
  }
`;
const people = () => {
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const [suggestionUser, setSuggestionUser] = useState<IUser[]>([]);
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
          .then((response) => setSuggestionUser(response.data.docs));
      } catch (error) {}
    };
    getSuggestionUsers();
  }, []);
  return (
    <StyledPeoplePageContainer>
      <Head>
        <title>Explore people</title>
      </Head>
      <StyledPeopleContainer>
        <Layout isShowHeader={false} isShowMobileBar={true}>
          <MobileHeader centerComp={<>Discover People</>} />
          <div className="suggestion-title">Suggested</div>
          <div className="suggestion-container">
            {suggestionUser?.length > 0 &&
              suggestionUser.map((item) => (
                <SuggestionItem key={item._id} currentUser={item} />
              ))}
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
            <SuggestionItem currentUser={suggestionUser[0]} />
          </div>
        </Layout>
      </StyledPeopleContainer>
    </StyledPeoplePageContainer>
  );
};

export default people;
