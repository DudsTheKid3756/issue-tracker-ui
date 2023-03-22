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
          addtlStyles="p-1"
          label="Date"
          field="date"
          type="date"
          values={values}
          onChanges={onChanges}
        />
      </div>
      <div className="reminderInput">
        <FormComponent
          addtlStyles="p-1"
          label="Time"
          field="time"
          type="time"
          values={values}
          onChanges={onChanges}
        />
      </div>
      <div className="reminderInput">
        <SelectComponent
          addtlStyles="p-1"
          label="Alert"
          field="alert"
          values={values}
          onChanges={onChanges}
          options={options}
        />
      </div>
      <div className="buttonDiv">
        <button className="btn btn-secondary" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary ms-2" type="submit" onClick={closeModal}>
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default ReminderForm;
