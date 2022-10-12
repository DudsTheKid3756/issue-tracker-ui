import FormComponent from "../FormComponent";
import classes from "./Create.module.css";

const Form = ({ values, onChanges, onSubmit, errors, handleCancel }) => {
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
        />
        <FormComponent
          label="Comment"
          field="comment"
          type="text"
          placeholder="Comment"
          values={values}
          onChanges={onChanges}
          errors={errors}
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
        <button className={`${classes.button} ${classes.cancel}`} onClick={handleCancel}>
          Cancel
        </button>
        <button className={`${classes.button} ${classes.submit}`} type="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
