import FormComponent from "../Forms/FormComponent";
import classes from "../Forms/Form.module.css";
import ModalComponent from "../ModalComponent";
import Reminder from "../Reminder/Reminder";
import paintbrush from "../../Utils/Icons/paintbrush.svg";

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
        header="Create Reminder"
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
    <img
      className={classes.icon}
      src={paintbrush}
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
    {values?.hasReminder ? (
      <div className={classes.reminderContainer}>
        <h3 className={classes.formHeader}>Reminder</h3>
        <span className={classes.formLabel}>
          Date: {reminder.date}
          <br />
        </span>
        <span className={classes.formLabel}>
          Time: {reminder.time}
          <br />
        </span>
        <span className={classes.formLabel}>
          Alert: {reminder.alert}
          <br />
        </span>
      </div>
    ) : null}
  </div>
);

export default CreateForm;
