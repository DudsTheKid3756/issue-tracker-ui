import FormComponent from "../FormComponent";
import classes from "../Issues.module.css";

const Form = ({ values, onChanges, onSubmit, errors, handleCancel }) => {
  return (
    <>
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
        <button className={classes.button} onClick={handleCancel}>
          Cancel
        </button>
        <button className={classes.button} type="submit" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Form;
