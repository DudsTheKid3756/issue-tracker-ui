import React, { useContext, useState } from "react";
import { ApiContext } from "../../contexts/ApiContext";
import { LoginContext } from "../../contexts/LoginContext";
import LoginForm from "../forms/auth-forms/LoginForm";
import SignUpForm from "../forms/auth-forms/SignUpForm";

const LoginPage = () => {
  const { changeIsLoggedIn } = useContext(LoginContext);
  const { apiPath } = useContext(ApiContext);

  const [authMode, setAuthMode] = useState("signin");
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const changeAuthMode = () => {
    setAuthMode(authMode == "signin" ? "signup" : "signin");
  };

  const onChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((values) => ({ ...values, [name]: value }));
  };

  return authMode == "signin" ? (
    <LoginForm
      changeAuthMode={changeAuthMode}
      loginInfo={loginInfo}
      onChange={(e) => onChange(e, setLoginInfo)}
      changeIsLoggedIn={changeIsLoggedIn}
      apiPath={apiPath}
    />
  ) : (
    <SignUpForm
      changeAuthMode={changeAuthMode}
      signUpInfo={signUpInfo}
      onChange={(e) => onChange(e, setSignUpInfo)}
      changeIsLoggedIn={changeIsLoggedIn}
      apiPath={apiPath}
    />
  );
};

export default LoginPage;
