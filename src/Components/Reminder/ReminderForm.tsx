import React from "react";
import FormComponent from "../forms/FormComponent";
import SelectComponent from "../forms/SelectComponent";
import constants from "../../utils/constants";

type ReminderFormType = {
  closeModal: () => void;
  values: { [k: string]: any };
  onChanges: (e: Event) => void;
}

const ReminderForm: React.FC<ReminderFormType> = ({ closeModal, values, onChanges }) => {
  const options = constants.ALERT_OPTIONS.map((option) => option.text);
  return (
    <div className="">
      <div className="">
        <FormComponent
          label="Date"
          field="date"
          type="date"
          values={values}
          onChanges={onChanges}
          placeholder={undefined}
          errors={undefined}
          errLength={undefined}
          isMultiline={undefined}
          min={undefined}
        />
      </div>
      <div className="">
        <FormComponent
          label="Time"
          field="time"
          type="time"
          values={values}
          onChanges={onChanges}
          placeholder={undefined}
          errors={undefined}
          errLength={undefined}
          isMultiline={undefined}
          min={undefined}
        />
      </div>
      <div className="">
        <SelectComponent
          label="Alert"
          field="alert"
          values={values}
          onChanges={onChanges}
          options={options}
        />
      </div>
      <button className="" onClick={closeModal}>
        Cancel
      </button>
      <button className="" type="submit" onClick={closeModal}>
        Set Reminder
      </button>
    </div>
  );
};

export default ReminderForm;
