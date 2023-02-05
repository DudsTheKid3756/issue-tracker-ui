import React from "react";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../../services/AuthService";
import { SignUp } from '../../../@types/SignUp';

type SignUpFormPropsType = {
  changeAuthMode: () => void;
  signUpInfo: SignUp;
  setSignUpInfo: any;
  onChange: any;
  changeIsLoggedIn: (bool: boolean) => void;
};

const SignUpForm: React.FC<SignUpFormPropsType> = ({
  changeAuthMode,
  signUpInfo,
  setSignUpInfo,
  onChange,
}) => {
  const navigate = useNavigate();

  const onSignUp = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signup("dotnet", signUpInfo);
    setSignUpInfo((values: any) =>
      Object.keys(values).reduce<SignUp>((acc, key) => {
        acc[key as keyof SignUp] = "";
        return acc;
      }, {} as SignUp)
    );

    signin("dotnet", {
      username: signUpInfo.username,
      password: signUpInfo.password,
    }, () => true);

    navigate("/");
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
              defaultValue={signUpInfo.username}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="e.g JSmith123"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={signUpInfo.email}
              onChange={onChange}
              className="form-control mt-1"
              placeholder="e.g. jsmith123@mail.com"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue={signUpInfo.password}
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
