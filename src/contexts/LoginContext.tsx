import React, { createContext, useState } from "react";
import handleStorage from "../utils/storage";

export const LoginContext = createContext<any>({});

const LoginContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  handleStorage("set", "session", "authState", false);

  const changeIsLoggedIn = (bool: boolean) => {
    setIsLoggedIn(bool);
    handleStorage("set", "session", "authState", bool);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, changeIsLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
