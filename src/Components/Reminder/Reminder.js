import React, { useState } from "react";
import ReminderForm from "./ReminderForm";

const Reminder = ({ onRequestClose }) => {
  const [reminder, setReminder] = useState({
    date: "",
    time: "",
    alert: "---Select an option---",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setReminder((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(reminder);
  };

  return (
    <div>
      <ReminderForm
        onRequestClose={onRequestClose}
        values={reminder}
        onChanges={[null, onChange]}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Reminder;
