import { createContext, useState } from "react";
import { storeItem } from "../Utils/storage";

export const LoginContext = createContext(null);

const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  storeItem("authState", false, "session");

  const changeIsLoggedIn = (bool) => {
    setIsLoggedIn(bool);
    storeItem("authState", bool, "session");
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, changeIsLoggedIn }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
