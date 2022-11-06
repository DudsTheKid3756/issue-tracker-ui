import React from "react";
import FormComponent from "../FormComponent";
import classes from "../Form.module.css";
import SelectComponent from "../SelectComponent";
import constants from "../../Utils/constants";

const ReminderForm = ({ closeModal, values, onChanges }) => {
  const options = constants.ALERT_OPTIONS.map((option) => option.text);
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
        options={options}
      />
      <button className={classes.cancel} onClick={closeModal}>
        Cancel
      </button>
      <button className={classes.submit} type="submit" onClick={closeModal}>
        Set Reminder
      </button>
    </div>
  );
};

export default ReminderForm;
