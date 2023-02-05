import React from "react";
import { Reminder } from "src/@types/Reminder";

const ReminderComponent: React.FC<{ reminder: Reminder }> = ({ reminder }) => (
  <div className="">
    <h3 className="">Reminder</h3>
    <span className="">
      Date: {reminder.date}
      <br />
    </span>
    <span className="">
      Time: {reminder.time}
      <br />
    </span>
    <span className="">
      Alert: {reminder.alert}
      <br />
    </span>
  </div>
);

export default ReminderComponent;
