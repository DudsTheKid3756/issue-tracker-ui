import React from "react";
import "./notification.css";

const Notification = ({ info }) => {
  return (
    <>
      <h3 className="toastHeader">Issue Alert</h3>
      <div className="toastContainer">
        <h5 className="title">{info.title}</h5>
        <p className="comment">{info.comment}</p>
        <span className="reminderInfo">
          {info.reminder.date} {info.reminder.time}
        </span>
      </div>
    </>
  );
};

export default Notification;
