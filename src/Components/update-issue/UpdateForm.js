import React from "react";
import Paintbrush from "../../utils/icons/Paintbrush.js";
import Pencil from "../../utils/icons/Pencil";
import "../forms/form.css";
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
  <div className="formComponent">
    <h1 className="formHeader">Edit Issue</h1>
    <div className="textInputs">
      <FormComponent
        label="Title"
        field="title"
        type="text"
        values={values}
        onChanges={onChanges}
        errors={errors}
        errLength={errLength}
        maxLength={28}
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
    <div className="checkboxInput1">
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
      <Pencil style="icon" title="Edit Reminder" onClick={openModal} />
    ) : null}
    {" | "}
    <div className="checkboxInput2">
      <FormComponent
        label="Completed"
        field="isCompleted"
        type="checkbox"
        values={values}
        onChanges={onChanges}
      />
    </div>
    {" | "}
    <div className="d-inline">
      <label className="label">Color</label>
      <Paintbrush
        style="ms-1 point"
        title="Change Color"
        onClick={() => setShowColorPicker((prevState) => !prevState)}
      />
    </div>
    <div className="buttonDiv">
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
      <button
        className="btn btn-primary ms-2"
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
