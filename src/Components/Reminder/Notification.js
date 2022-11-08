import React from "react";
import classes from "./Notification.module.css";

const Notification = ({ info }) => {
  return (
    <>
      <h3 className={classes.toastHeader}>Issue Alert</h3>
      <div className={classes.toastContainer}>
        <h5 className={classes.title}>{info.title}</h5>
        <p className={classes.comment}>{info.comment}</p>
        <span className={classes.reminderInfo}>
          {info.reminder.date} {info.reminder.time}
        </span>
      </div>
    </>
  );
};

export default Notification;
