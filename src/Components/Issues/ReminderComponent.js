import React from "react";
import "../forms/form.css";

const ReminderComponent = ({ reminder }) => (
  <div className="reminderContainer">
    <h3 className="formHeader">Reminder</h3>
    <span className="formLabel">
      Date: {reminder.date}
      <br />
    </span>
    <span className="formLabel">
      Time: {reminder.time}
      <br />
    </span>
    <span className="formLabel">
      Alert: {reminder.alert}
      <br />
    </span>
  </div>
);

export default ReminderComponent;
