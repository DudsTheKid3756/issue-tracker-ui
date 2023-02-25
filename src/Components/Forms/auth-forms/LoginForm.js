import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signin } from "../../../services/AuthService";
import ModalComponent from "../../ModalComponent";
import PasswordReset from "./PasswordReset";

const LoginForm = ({
  changeAuthMode,
  loginInfo,
  onChange,
  changeIsLoggedIn,
}) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const displayModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleLogin = (e) => {
    e.preventDefault();
    signin("dotnet", loginInfo, changeIsLoggedIn);
    navigate("/issues");
  };

  return (
    <>
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
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot{" "}
              <button
                className="btn btn-link"
                type="button"
                onClick={displayModal}
              >
                password?
              </button>
              <ModalComponent
                isOpen={showModal}
                onRequestClose={closeModal}
                label="Reset Password"
                component={<PasswordReset closeModal={closeModal} />}
              />
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
