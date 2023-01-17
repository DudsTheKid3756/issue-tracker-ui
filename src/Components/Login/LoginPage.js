import React, { useContext, useState } from "react";
import { LoginContext } from "../../Contexts/LoginContext";
import LoginForm from "../Forms/AuthForms/LoginForm";
import SignUpForm from "../Forms/AuthForms/SignUpForm";

const LoginPage = () => {
  const { changeIsLoggedIn } = useContext(LoginContext);
  const [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode == "signin" ? "signup" : "signin");
  };

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [signUpInfo, setSignUpInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const onChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((values) => ({ ...values, [name]: value }));
  };

  return authMode == "signin" ? (
    <LoginForm
      changeAuthMode={changeAuthMode}
      loginInfo={loginInfo}
      setLoginInfo={setLoginInfo}
      onChange={(e) => onChange(e, setLoginInfo)}
      changeIsLoggedIn={changeIsLoggedIn}
    />
  ) : (
    <SignUpForm
      changeAuthMode={changeAuthMode}
      signUpInfo={signUpInfo}
      setSignUpInfo={setSignUpInfo}
      onChange={(e) => onChange(e, setSignUpInfo)}
      changeIsLoggedIn={changeIsLoggedIn}
    />
  );
};

export default LoginPage;
