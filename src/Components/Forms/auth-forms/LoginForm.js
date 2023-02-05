import React from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../../services/AuthService";

const LoginForm = ({
  changeAuthMode,
  loginInfo,
  setLoginInfo,
  onChange,
  changeIsLoggedIn,
}) => {
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    signin("dotnet", loginInfo, changeIsLoggedIn);
    setLoginInfo((values) => Object.values(values).fill(""));
    navigate("/");
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span
              className="link-primary link-auth-mode"
              onClick={changeAuthMode}
            >
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={loginInfo.username}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue={loginInfo.password}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn-primary" onClick={onLogin}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
