import React, { useRef, useState } from "react";
import { handleEmail, signin } from "../../../services/AuthService";
import randCode from "../../../utils/randCode";
import ModalComponent from "../../ModalComponent";
import PasswordInput from "../PasswordInput";
import ResetConfirmation from "./ResetConfirmation";
import ResetEmail from "./ResetEmail";

const LoginForm = ({
  changeAuthMode,
  loginInfo,
  onChange,
  changeIsLoggedIn,
  apiPath,
}) => {
  const resetCode = useRef("");
  const usernameRef = useRef("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showResetCodeModal, setShowResetCodeModal] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [isDisabled, setIsDisabled] = useState(false);
  const [color, setColor] = useState("gray");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const onUsernameChange = (e) => setUsername(e.target.value);

  const sendResetCode = () => {
    resetCode.current = randCode(7);
    handleEmail(username, resetCode.current, apiPath, setEmail); // set errors later
  };

  const openConfirmationModal = () => setShowConfirmationModal(true);
  const closeConfirmationModal = (e) => {
    if (e.currentTarget.innerHTML === "Send code") {
      // handle errors
      sendResetCode();
      setShowResetCodeModal(true);
    }

    usernameRef.current = username;
    setUsername("");
    setShowConfirmationModal(false);
  };

  const closeResetCodeModal = () => {
    resetCode.current = "";
    setShowResetCodeModal(false);
  };

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
              <span
                className="link-primary link-auth-mode"
                onClick={openConfirmationModal}
              >
                password?
              </span>
              <ModalComponent
                isOpen={showResetCodeModal}
                onRequestClose={closeResetCodeModal}
                label="Password Reset Code"
                component={
                  <ResetEmail
                    resetCode={resetCode.current}
                    email={email}
                    username={usernameRef.current}
                    closeResetCodeModal={closeResetCodeModal}
                  />
                }
              />
              <ModalComponent
                isOpen={showConfirmationModal}
                onRequestClose={closeConfirmationModal}
                label="Forgot Password"
                component={
                  <ResetConfirmation
                    username={username}
                    onChange={onUsernameChange}
                    closeModal={closeConfirmationModal}
                  />
                }
              />
            </div>
          </div>
        </form>
      </div>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      ></script>

      <script type="text/javascript">emailjs.init(publicKey)</script>
    </>
  );
};

export default LoginForm;
