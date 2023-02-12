import React from "react";
import Paintbrush from "../../utils/icons/Paintbrush.js";
import Pencil from "../../utils/icons/Pencil";
import classes from "../forms/Form.module.css";
import FormComponent from "../forms/FormComponent";
import ReminderComponent from "../issues/ReminderComponent";
import ModalComponent from "../ModalComponent";
import Reminder from "../reminder/Reminder";

const UpdateForm = ({
  values,
  onChanges,
  handleUpdate,
  errors,
  errLength,
  handleCancel,
  reminder,
  setReminder,
  openModal,
  showModal,
  closeModal,
  setShowColorPicker,
}) => (
  <div className={classes.formComponent}>
    <h1 className={classes.formHeader}>Edit Issue</h1>
    <div className={classes.textInputs}>
      <FormComponent
        label="Title"
        field="title"
        type="text"
        values={values}
        onChanges={onChanges}
        errors={errors}
        errLength={errLength}
      />
      <FormComponent
        label="Comment"
        field="comment"
        type="text"
        values={values}
        onChanges={onChanges}
        errors={errors}
        errLength={errLength}
        isMultiline={true}
      />
    </div>
    <div className={classes.checkboxInput1}>
      <FormComponent
        label="Reminder"
        field="hasReminder"
        type="checkbox"
        values={values}
        onChanges={onChanges}
      />
      <ModalComponent
        isOpen={showModal}
        onRequestClose={closeModal}
        label="Update Reminder"
        component={
          <Reminder
            closeModal={closeModal}
            reminder={reminder}
            setReminder={setReminder}
          />
        }
      />
    </div>
    {values?.hasReminder ? (
      <Pencil title="Edit Reminder" onClick={openModal} />
    ) : null}
    {" | "}
    <div className={classes.checkboxInput2}>
      <FormComponent
        label="Completed"
        field="isCompleted"
        type="checkbox"
        values={values}
        onChanges={onChanges}
      />
    </div>
    {" | "}
    <label className={classes.label}>Color</label>
    <Paintbrush
      title="Change Color"
      onClick={() => setShowColorPicker((prevState) => !prevState)}
    />
    <div className={classes.buttonDiv}>
      <button
        className={`${classes.button} ${classes.cancel}`}
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className={`${classes.button} ${classes.submit}`}
        type="submit"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
    {values?.hasReminder ? <ReminderComponent reminder={reminder} /> : null}
  </div>
);

export default UpdateForm;
