import React from "react";
import FormComponent from "../FormComponent";
import classes from "../Form.module.css";
import SelectComponent from "../SelectComponent";
import constants from "../../Utils/constants";

const ReminderForm = ({ onRequestClose, values, onChanges, handleSubmit }) => {
  return (
    <div>
      <FormComponent
        label="Date"
        field="date"
        type="date"
        values={values}
        onChanges={onChanges}
      />
      <FormComponent
        label="Time"
        field="time"
        type="time"
        values={values}
        onChanges={onChanges}
      />
      <SelectComponent
        label="Alert"
        field="alert"
        values={values}
        onChanges={onChanges}
        options={constants.NOTIF_OPTIONS}
      />
      <button className={classes.cancel} onClick={onRequestClose}>
        Cancel
      </button>
      <button
        className={classes.submit}
        type="submit"
        onClick={handleSubmit}
      >
        Set Reminder
      </button>
    </div>
  );
};

export default ReminderForm;
