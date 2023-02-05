import React from "react";
import ReminderForm from "./ReminderForm";
import { Event } from "../../@types/Event";
import { Reminder } from "src/@types/Reminder";

type ReminderType = {
  closeModal: () => void;
  reminder: Reminder;
  setReminder: (prevState: unknown) => void;
};

const Reminder: React.FC<ReminderType> = ({
  closeModal,
  reminder,
  setReminder,
}) => {
  function onChange(e: Event) {
    const { name, value } = e.target;
    setReminder((values: { [k: string]: any }) => ({
      ...values,
      [name]: value,
    }));
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
