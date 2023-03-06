import React, { useRef, useState } from "react";
import { resetPassword } from "../../../services/AuthService";
import { toaster } from "../../../utils/toaster";

const PasswordReset = ({ closeModal }) => {
  const resetResponse = useRef("");
  const [passResetInfo, setPassResetInfo] = useState({
    username: "",
    newPassword: "",
    repeatPassword: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setPassResetInfo((values) => ({ ...values, [name]: value }));
  };

  const onReset = (e) => {
    e.preventDefault();
    resetPassword("dotnet", passResetInfo, resetResponse);
    closeModal();
    setTimeout(() => toaster(resetResponse.current, "success"), 1500);
  };

  return (
    <>
      <form className="overflow-hidden m-3">
        <div>
          <div className="form-group mt-3">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control mt-1"
              name="username"
              type="text"
              placeholder="Enter username"
              defaultValue={passResetInfo?.username}
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              className="form-control mt-1"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              defaultValue={passResetInfo?.newPassword}
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="repeatPassword">Confirm Password</label>
            <input
              id="repeatPassword"
              className="form-control mt-1"
              name="repeatPassword"
              type="password"
              placeholder="Re-enter new password"
              defaultValue={passResetInfo?.repeatPassword}
              onChange={onChange}
            />
          </div>
          <div className="row gap-3 mt-4">
            <button className="btn btn-secondary col ms-3" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-primary col me-3" onClick={onReset}>
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PasswordReset;
