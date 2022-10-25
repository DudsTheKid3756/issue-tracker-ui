import FormComponent from "../FormComponent";
import classes from "../Form.module.css";
import ModalComponent from "../ModalComponent";
import Reminder from "../Reminder/Reminder";

const CreateForm = ({
  values,
  onChanges,
  onSubmit,
  errors,
  handleCancel,
  errLength,
  showModal,
  onRequestClose,
  reminder,
  setReminder,
}) => {
  return (
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
          onRequestClose={onRequestClose}
          label="Create Reminder"
          header="Create Reminder"
          component={
            <Reminder
              onRequestClose={onRequestClose}
              reminder={reminder}
              setReminder={setReminder}
              hasReminder={values.hasReminder}
            />
          }
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
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
