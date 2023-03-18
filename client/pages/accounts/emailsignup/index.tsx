import * as yup from "yup";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignupUser } from "../../../types";
import { publicRequest } from "../../../utils/requestMethod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const StyledSignUp = styled.div`
  background: #fafafa;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  margin: 12px;
`;
const StyledLoginFormContainer = styled.div`
  width: 350px;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  border: 1px solid #dbdbdb;
  .sign-up-link {
    color: #0095f6;
    font-weight: 500;
  }
`;
const StyledLogoContainer = styled.div`
  margin: 28px 0 12px 0;
`;
const StyledForm = styled.form`
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .style-label {
    font-size: 14px;
    line-height: 16px;
  }
  .style-input {
    font-size: 14px;
    line-height: 16px;
    background: #fafafa;
    border: #dbdbdb;
  }
  .term {
    color: #8e8e8e;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
  }
`;
const StyledButton = styled.button`
  padding: 5px 9px;
  border: none;
  outline: none;
  background: #0095f6;
  color: white;
  font-size: 16px;
  line-height: 18px;
  border-radius: 4px;
  margin-top: 4px;
  cursor: pointer;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  max-height: 28px;
`;
const StyledOrComponent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .or {
    padding: 8px 16px;
    color: #8e8e8e;
  }
  .thanh {
    flex: 1;
    height: 1px;
    background: #8e8e8e;
  }
`;
const StyledLoginWithFacebook = styled.div`
  width: 100%;
  button {
    width: 100%;
    padding: 5px 9px;
    border: none;
    outline: none;
    background: #385185;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;
const StyledIntro = styled.div`
  text-align: center;
  color: #8e8e8e;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 12px;
`;
const schema = yup.object({});
const EmailSignup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (data: ISignupUser) => {
    setLoading(true);
    try {
      await publicRequest.post("/auth/register", data).then((response) => {
        console.log(response.data);
        setLoading(false);
        router.push("/login");
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <StyledSignUp>
      <Head>
        <title>Sign up - Instagram</title>
      </Head>
      <StyledLoginFormContainer>
        <StyledLogoContainer>
          <Image src="/logo.png" alt="" width={175} height={50} />
        </StyledLogoContainer>
        <StyledIntro>
          Sign up to see photos and videos from your friends.
        </StyledIntro>
        <StyledLoginWithFacebook>
          <button className="facebook-login">
            <FacebookIcon /> <span>Login with facebook</span>
          </button>
        </StyledLoginWithFacebook>
        <StyledOrComponent>
          <div className="thanh"></div>
          <div className="or">OR</div>
          <div className="thanh"></div>
        </StyledOrComponent>
        <StyledForm
          onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
        >
          <TextField
            fullWidth
            label="Mobile Number or Email"
            id="outlined-size-small"
            size="small"
            InputProps={{ className: "style-input" }}
            InputLabelProps={{ className: "style-label" }}
            {...register("email")}
          />
          <TextField
            fullWidth
            label="Full Name"
            id="outlined-size-small"
            size="small"
            InputProps={{ className: "style-input" }}
            InputLabelProps={{ className: "style-label" }}
            {...register("fullname")}
          />
          <TextField
            fullWidth
            label="Username"
            id="outlined-size-small"
            size="small"
            InputProps={{ className: "style-input" }}
            InputLabelProps={{ className: "style-label" }}
            {...register("username")}
          />
          <TextField
            fullWidth
            label="Password"
            id="outlined-size-small"
            type="password"
            size="small"
            InputProps={{ className: "style-input" }}
            InputLabelProps={{ className: "style-label" }}
            {...register("password")}
          />
          <div className="term">
            People who use our service may have uploaded your contact
            information to Instagram. Learn More
          </div>
          <div className="term">
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </div>
          <StyledButton>Sign up</StyledButton>
        </StyledForm>
      </StyledLoginFormContainer>
      <StyledLoginFormContainer>
        <p>
          Have an account?{" "}
          <Link href="/login">
            <a className="sign-up-link">Log in</a>
          </Link>
        </p>
      </StyledLoginFormContainer>
    </StyledSignUp>
  );
};

export default EmailSignup;
