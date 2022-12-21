import { TextField } from "@mui/material";
import * as yup from "yup";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginUser } from "../types";
import { useDispatch } from "react-redux";
import { login as loginFunc } from "../utils/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/loading/Spinner";
const StyledLoginPages = styled.div`
  background: #fafafa;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
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
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .matches(/^[a-z0-9_-]{3,16}$/, "Username is not valid"),
  password: yup.string().min(6, "Password must be longer than 6"),
});
const login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (data: ILoginUser) => {
    setLoading(true);
    try {
      loginFunc(dispatch, data).then((res) => {
        if (res === "done") {
          setLoading(false);
          router.push("/");
        }
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <StyledLoginPages className="container">
      <Head>
        <title>Login</title>
      </Head>
      <StyledLoginFormContainer>
        <StyledLogoContainer>
          <Image src="/logo.png" alt="" width={175} height={50} />
        </StyledLogoContainer>
        <StyledForm
          onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
        >
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
            label="password"
            id="outlined-size-small"
            size="small"
            type="password"
            InputProps={{ className: "style-input" }}
            InputLabelProps={{ className: "style-label" }}
            {...register("password")}
          />
          <StyledButton>
            {loading ? <Spinner width={14} height={14} /> : "Login"}
          </StyledButton>
        </StyledForm>
        <StyledOrComponent>
          <div className="thanh"></div>
          <div className="or">OR</div>
          <div className="thanh"></div>
        </StyledOrComponent>
        <StyledLoginWithFacebook>
          <button className="facebook-login">
            <FacebookIcon /> <span>Login with facebook</span>
          </button>
        </StyledLoginWithFacebook>
      </StyledLoginFormContainer>
      <StyledLoginFormContainer>
        <p>
          Don't have an account?{" "}
          <Link href="/accounts/emailsignup">
            <a className="sign-up-link">Sign up</a>
          </Link>
        </p>
      </StyledLoginFormContainer>
    </StyledLoginPages>
  );
};

export default login;
