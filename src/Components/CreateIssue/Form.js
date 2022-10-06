const Form = ({ value, onChange, onSubmit }) => {
  return (
    <>
      <form className="form-container" onSubmit={onSubmit}>
        <h1 className="form-header">New Issue</h1>
        <label className="form-label" htmlFor="title">Title</label>
        <input
          id="title"
          className="form-input"
          type="text"
          name="title"
          placeholder="New Issue"
          value={value.title}
          onChange={onChange}
        />
        <label className="form-label" htmlFor="comment">Comment</label>
        <input
          id="comment"
          className="form-input"
          type="text"
          name="comment"
          placeholder="Comment"
          value={value.comment}
          onChange={onChange}
        />
        <label className="form-label" htmlFor="reminder">Reminder</label>
        <input
          id="reminder"
          className="form-input"
          type="checkbox"
          name="hasReminder"
          defaultChecked={value.hasReminder}
          onChange={onChange}
        />
        <label className="form-label" htmlFor="completed">Completed</label>
        <input
          id="completed"
          className="form-input"
          type="checkbox"
          name="isCompleted"
          defaultChecked={value.isCompleted}
          onChange={onChange}
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
