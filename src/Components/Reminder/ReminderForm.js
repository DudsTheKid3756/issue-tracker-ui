import React from "react";
import FormComponent from "../FormComponent";
import classes from "../Form.module.css";
import SelectComponent from "../SelectComponent";
import constants from "../../Utils/constants";

const ReminderForm = ({ onRequestClose, value, onChanges, handleSubmit }) => {
  return (
    <div>
      <FormComponent
        label="Date"
        field="date"
        type="date"
        value={value}
        onChanges={onChanges}
      />
      <FormComponent
        label="Time"
        field="time"
        type="time"
        value={value}
        onChanges={onChanges}
      />
      <SelectComponent
        label="Alert"
        field="alert"
        value={value}
        onChanges={onChanges}
        options={constants.NOTIF_OPTIONS}
      />
      <button className={classes.cancel} onClick={onRequestClose}>
        Cancel
      </button>
      <button
        className={classes.submit}
        type="submit"
        onClick={() => handleSubmit}
      >
        Set Reminder
      </button>
    </div>
  );
};

export default ReminderForm;
