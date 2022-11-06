import React from "react";

const Notification = ({ info }) => {
  return (
    <>
      <h3>Issue Alert</h3>
      <p>{info.title}</p>
    </>
  );
};

export default Notification;
