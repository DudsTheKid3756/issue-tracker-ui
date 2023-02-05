import React, { useState } from "react";
import { Event } from "src/@types/Event";
import { Login } from "src/@types/Login";
import { SignUp } from "../../@types/SignUp";
import LoginForm from "../forms/auth-forms/LoginForm";
import SignUpForm from "../forms/auth-forms/SignUpForm";

const LoginPage = () => {
  const [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode == "signin" ? "signup" : "signin");
  };

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  } as Login);

  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  } as SignUp);

  const onChange = (
    e: Event,
    setInfo: {
      (value: React.SetStateAction<Login>): void;
      (value: React.SetStateAction<SignUp>): void;
      (arg0: (values: any) => any): void;
    }
  ) => {
    const { name, value } = e.target;
    setInfo((values) => ({ ...values, [name]: value }));
  };

  return authMode == "signin" ? (
    <LoginForm
      changeAuthMode={changeAuthMode}
      loginInfo={loginInfo}
      setLoginInfo={setLoginInfo}
      onChange={(e: Event) => onChange(e, setLoginInfo)}
    />
  ) : (
    <SignUpForm
      changeAuthMode={changeAuthMode}
      signUpInfo={signUpInfo}
      setSignUpInfo={setSignUpInfo}
      onChange={(e: Event) => onChange(e, setSignUpInfo)}
    />
  );
};

export default LoginPage;
