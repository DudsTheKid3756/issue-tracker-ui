import React from "react";
import FormComponent from "../FormComponent";
import classes from "../Form.module.css";
import ModalComponent from "../ModalComponent";
import Reminder from "../Reminder/Reminder";

const UpdateForm = ({
  values,
  onChanges,
  handleUpdate,
  errors,
  errLength,
  handleCancel,
  reminder,
  setReminder,
  showModal,
  closeModal
}) => {
  return (
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
          header="Update Reminder"
          component={
            <Reminder
              closeModal={closeModal}
              reminder={reminder}
              setReminder={setReminder}
            />
          }
        />
      </div>
      <div className={classes.checkboxInput2}>
        <FormComponent
          label="Completed"
          field="isCompleted"
          type="checkbox"
          values={values}
          onChanges={onChanges}
        />
      </div>
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
    </div>
  );
};

export default UpdateForm;
