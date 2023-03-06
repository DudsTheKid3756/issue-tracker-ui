import React from "react";
import { useState } from "react";
import ModalComponent from "../../ModalComponent";
import PasswordReset from "./PasswordReset";
import "../form.css";

const ResetEmail = ({ resetCode, email, closeResetCodeModal }) => {
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setCode(e.target.value);
    setError("");
  };

  const openModal = () => {
    if (resetCode === code) setShowModal(true);
    else setError("Incorrect code!");
  };
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          <p>
            A password reset email was sent to <u>{email}</u>. Check your email
            for a code and enter it below!
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-inline">
            <form className="form-group">
              <label htmlFor="code">Enter code</label>
              <input
                className={`form-control mt-1 ${!!error ? "errBorder" : ""}`}
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={onChange}
              />
              {!!error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <p className="text-white">Spacer</p>
              )}
            </form>
          </div>
          <div className="d-inline mt-4">
            <button className="btn btn-secondary" onClick={closeResetCodeModal}>
              Cancel
            </button>
            <button className="btn btn-primary ms-2" onClick={openModal}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        isOpen={showModal}
        onRequestClose={closeModal}
        label="Password Reset"
        component={<PasswordReset />}
      />
    </>
  );
};

export default ResetEmail;
