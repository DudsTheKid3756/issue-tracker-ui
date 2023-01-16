import React from "react";
import ReminderForm from "./ReminderForm";

const Reminder = ({ closeModal, reminder, setReminder }) => {
  function onChange(e) {
    const { name, value } = e.target;
    setReminder((values) => ({ ...values, [name]: value }));
  }

  return (
    <div>
      <ReminderForm
        closeModal={closeModal}
        values={reminder}
        onChanges={[null, onChange]}
      />
    </div>
  );
};

export default Reminder;
