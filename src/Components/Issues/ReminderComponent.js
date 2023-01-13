import React from "react";
import classes from "../Forms/Form.module.css";

const ReminderComponent = ({ reminder }) => {
  return (
    <div className={classes.reminderContainer}>
      <h3 className={classes.formHeader}>Reminder</h3>
      <span className={classes.formLabel}>
        Date: {reminder.date}
        <br />
      </span>
      <span className={classes.formLabel}>
        Time: {reminder.time}
        <br />
      </span>
      <span className={classes.formLabel}>
        Alert: {reminder.alert}
        <br />
      </span>
    </div>
  );
};

export default ReminderComponent;
