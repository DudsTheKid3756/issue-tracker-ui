import React from "react";

const SessionEndModal = ({ closeModal }) => {
  return (
    <>
      <p>The current session has ended. Please log back in!</p>
      <button className="btn btn-primary" onClick={closeModal}>
        Close
      </button>
    </>
  );
};

export default SessionEndModal;
