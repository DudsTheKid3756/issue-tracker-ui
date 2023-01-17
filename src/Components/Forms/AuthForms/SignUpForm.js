import React from "react";
import handleStorage from "../../../Utils/storage";

const SignUpForm = ({
  changeAuthMode,
  signUpInfo,
  setSignUpInfo,
  onChange,
  changeIsLoggedIn,
}) => {
  const onSignUp = (e) => {
    e.preventDefault();
    handleStorage("set", "session", signUpInfo.email, signUpInfo);
    changeIsLoggedIn(true);
    setSignUpInfo((values) => Object.values(values).fill(""));
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
            <label>Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={signUpInfo.fullName}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
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
            <button type="submit" className="btn-primary" onClick={onSignUp}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
