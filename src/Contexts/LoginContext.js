import { createContext, useState } from "react";
import handleStorage from "../utils/storage";

export const LoginContext = createContext(null);

const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  handleStorage("set", "session", "authState", false);

  const changeIsLoggedIn = (bool) => {
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
