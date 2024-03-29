import Paintbrush from "../../utils/icons/Paintbrush";
import "../forms/form.css";
import FormComponent from "../forms/FormComponent";
import ReminderComponent from "../issues/ReminderComponent";
import ModalComponent from "../ModalComponent";
import Reminder from "../reminder/Reminder";

const CreateForm = ({
  values,
  onChanges,
  onSubmit,
  errors,
  handleCancel,
  errLength,
  reminder,
  setReminder,
  showModal,
  closeModal,
  setShowColorPicker,
}) => (
  <div className="formContainer">
    <h1 className="formHeader">New Issue</h1>
    <div className="textInputs">
      <FormComponent
        label="Title"
        field="title"
        type="text"
        placeholder="New Issue"
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
        placeholder=""
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
        label="Create Reminder"
        component={
          <Reminder
            closeModal={closeModal}
            reminder={reminder}
            setReminder={setReminder}
          />
        }
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
      <button className="btn btn-primary ms-2" type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
    {values?.hasReminder ? <ReminderComponent reminder={reminder} /> : null}
  </div>
);

export default CreateForm;
