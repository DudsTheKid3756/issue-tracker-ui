import React from "react";

const ResetConfirmation = ({ username, onChange, closeModal }) => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          <h5>Reset your password?</h5>
          <p>
            To reset your password, enter your username and a code will be sent
            to your email address.
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <form className="form-group">
            <label htmlFor="send-code">Username</label>
            <input
              className="form-control mt-1"
              type="text"
              id="send-code"
              name="send-code"
              value={username}
              onChange={onChange}
            />
          </form>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-secondary d-inline ps-3 pe-3"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary d-inline ps-3 pe-3"
              onClick={closeModal}
            >
              Send code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetConfirmation;
