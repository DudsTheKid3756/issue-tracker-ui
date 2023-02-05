import FormComponent from "../forms/FormComponent";
import classes from "../forms/Form.module.css";
import ModalComponent from "../ModalComponent";
import Reminder from "../reminder/Reminder";
import ReminderComponent from "../issues/ReminderComponent";
import Paintbrush from "../../utils/icons/Paintbrush";

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
  <div className={classes.formContainer}>
    <h1 className={classes.formHeader}>New Issue</h1>
    <div className={classes.textInputs}>
      <FormComponent
        label="Title"
        field="title"
        type="text"
        placeholder="New Issue"
        values={values}
        onChanges={onChanges}
        errors={errors}
        errLength={errLength}
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
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
    {values?.hasReminder ? <ReminderComponent reminder={reminder} /> : null}
  </div>
);

export default CreateForm;
