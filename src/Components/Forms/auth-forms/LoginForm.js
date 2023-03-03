import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signin } from "../../../services/AuthService";
import ModalComponent from "../../ModalComponent";
import PasswordInput from "../PasswordInput";
import PasswordReset from "./PasswordReset";

const LoginForm = ({
  changeAuthMode,
  loginInfo,
  onChange,
  changeIsLoggedIn,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [isDisabled, setIsDisabled] = useState(false);
  const [color, setColor] = useState("gray");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const toggleShowPassword = () => {
    if (loginInfo.password) {
      if (showPassword === "password") {
        setColor("black");
        setShowPassword("text");
      } else {
        setColor("gray");
        setShowPassword("password");
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signin("dotnet", loginInfo, changeIsLoggedIn);
    setIsDisabled(true);
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
                disabled={isDisabled}
              />
            </div>
            <PasswordInput
              type={showPassword}
              defaultValue={loginInfo}
              onChange={onChange}
              disabled={isDisabled}
              showPassword={toggleShowPassword}
              color={color}
            />
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleLogin}
                disabled={isDisabled}
              >
                Submit
              </button>
            </div>
            <div className="text-center mt-2">
              Forgot{" "}
              <span className="link-primary link-auth-mode" onClick={openModal}>
                password?
              </span>
              <ModalComponent
                isOpen={showModal}
                onRequestClose={closeModal}
                label="Reset Password"
                component={<PasswordReset closeModal={closeModal} />}
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
