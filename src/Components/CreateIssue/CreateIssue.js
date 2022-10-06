import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addIssue } from "../../Services/IssueServices";
import Form from "./Form";

const CreateIssue = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setApiError = location.state;
  const [newIssue, setNewIssue] = useState({
    title: "",
    comment: "",
    created: "",
    isCompleted: false,
    hasReminder: false,
  });

  const onIssueChange = (e) => {
    const { name, value } = e.target;
    setNewIssue((values) => ({ ...values, [name]: value }));
  };

  const issueToAdd = {
    title: newIssue.title,
    comment: newIssue.comment,
    isCompleted: newIssue.isCompleted == "on" ? true : false,
    hasReminder: newIssue.hasReminder == "on" ? true : false
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addIssue(issueToAdd, setApiError);
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Form value={newIssue} onChange={onIssueChange} onSubmit={handleSubmit} />
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
};

export default CreateIssue;
