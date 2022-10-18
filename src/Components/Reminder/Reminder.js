import React, { useState } from "react";
import ReminderForm from "./ReminderForm";

const Reminder = ({ onRequestClose }) => {
  const [reminder, setReminder] = useState({
    date: new Date().getUTCMonth().toString(),
    time: new Date().getTime().toString(),
    alert: "---Select an option---",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setReminder((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <ReminderForm
        onRequestClose={onRequestClose}
        value={reminder}
        onChanges={[null, onChange]}
        handleSubmit={() => console.log("submitted")}
      />
    </div>
  );
};

export default Reminder;
