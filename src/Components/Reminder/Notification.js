import React from "react";

const Notification = ({ info }) => {
  return (
    <>
      <h3>Issue Alert</h3>
      <div>
        <h5>{info.title}</h5>
        <p>{info.comment}</p>
        <span>
          {info.reminder.date} {info.reminder.time}
        </span>
      </div>
    </>
  );
};

export default Notification;
