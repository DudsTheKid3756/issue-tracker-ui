import React, { useContext, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";
import { getItem } from "../../Utils/storage";

const WelcomePage = () => {
  const { isLoggedIn } = useContext(LoginContext);
  // const location = useLocation();
  // const sessionToken = useRef(location.state);
  // const loginData = getItem(sessionToken.current, "session");
  // const firstName = loginData.fullName.split(" ")[0];



  return !isLoggedIn ? (
    <Navigate replace to="/login" />
  ) : (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};

export default WelcomePage;
