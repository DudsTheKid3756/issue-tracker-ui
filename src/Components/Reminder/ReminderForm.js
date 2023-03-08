import React from "react";
import { ALERT_OPTIONS } from "../../utils/constants";
import "../forms/form.css";
import FormComponent from "../forms/FormComponent";
import SelectComponent from "../forms/SelectComponent";

const ReminderForm = ({ closeModal, values, onChanges }) => {
  const options = ALERT_OPTIONS.map((option) => option.text);
  return (
    <div className="formContainer">
      <div className="reminderInput">
        <FormComponent
          label="Date"
          field="date"
          type="date"
          values={values}
          onChanges={onChanges}
        />
      </div>
      <div className="reminderInput">
        <FormComponent
          label="Time"
          field="time"
          type="time"
          values={values}
          onChanges={onChanges}
        />
      </div>
      <div className="reminderInput">
        <SelectComponent
          label="Alert"
          field="alert"
          values={values}
          onChanges={onChanges}
          options={options}
        />
      </div>
      <button className="cancel" onClick={closeModal}>
        Cancel
      </button>
      <button className="submit" type="submit" onClick={closeModal}>
        Set Reminder
      </button>
    </div>
  );
};

export default ReminderForm;
