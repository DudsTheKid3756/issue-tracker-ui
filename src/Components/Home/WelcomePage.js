import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import handleStorage from "../../Utils/storage";

const WelcomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionToken = location.state.email;
  const loginData = handleStorage("get", "session", sessionToken);
  const firstName = loginData.fullName.split(" ")[0];

  return (
    <div>
      <h1>Welcome {firstName}</h1>
    </div>
  );
};

export default WelcomePage;
