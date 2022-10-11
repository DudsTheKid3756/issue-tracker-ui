import FormComponent from "../FormComponent";
import classes from "../Issues.module.css";

const Form = ({ values, onChanges, onSubmit, errors }) => {
  return (
    <>
      <h1 className={classes.formHeader}>New Issue</h1>
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
      <FormComponent
        label="Reminder"
        field="hasReminder"
        type="checkbox"
        values={values}
        onChanges={onChanges}
      />
      <FormComponent
        label="Completed"
        field="isCompleted"
        type="checkbox"
        values={values}
        onChanges={onChanges}
      />
      <button className={classes.button} type="submit" onClick={onSubmit}>
        Submit
      </button>
    </>
  );
};

export default Form;
