import React from "react";
import ReminderForm from "./ReminderForm";

const Reminder = ({ onRequestClose, reminder, setReminder, hasReminder }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    setReminder((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    hasReminder = true;
    onRequestClose();
  }

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
