import constants from "../../constants";
import "../Issues.component.css";

const Form = ({ values, onChanges, onSubmit, errors }) => {
  return (
    <>
      <form className="form-container" onSubmit={onSubmit}>
        <h1 className="form-header">New Issue</h1>
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="form-input"
          type="text"
          name="title"
          placeholder="New Issue"
          value={values[0].title}
          onChange={onChanges[0]}
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <label className="form-label" htmlFor="comment">
          Comment
        </label>
        <input
          id="comment"
          className="form-input"
          type="text"
          name="comment"
          placeholder="Comment"
          value={values[0].comment}
          onChange={onChanges[0]}
        />
        {errors.comment && <p className="error">{errors.comment}</p>}
        <label className="form-label" htmlFor="reminder">
          Reminder
        </label>
        <input
          id="reminder"
          className="form-input"
          type="checkbox"
          name="hasReminder"
          defaultChecked={values[1].hasReminder}
          onChange={onChanges[1]}
        />
        <label className="form-label" htmlFor="completed">
          Completed
        </label>
        <input
          id="completed"
          className="form-input"
          type="checkbox"
          name="isCompleted"
          defaultChecked={values[1].isCompleted}
          onChange={onChanges[1]}
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
