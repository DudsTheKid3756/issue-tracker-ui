import React from "react";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../../services/AuthService";
import { clearValues } from "../../../utils/clearValues";

const SignUpForm = ({
  changeAuthMode,
  signUpInfo,
  onChange,
  changeIsLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup("dotnet", signUpInfo);
    changeIsLoggedIn(true);

    signin(
      "dotnet",
      {
        username: signUpInfo.username,
        password: signUpInfo.password,
      },
      changeIsLoggedIn
    );

    navigate("/issues");
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form">
        <div className="auth-form-content">
          <h3 className="auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary link-auth-mode"
              onClick={changeAuthMode}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={signUpInfo.username}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="e.g johnsmith123"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={signUpInfo.email}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={signUpInfo.password}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
