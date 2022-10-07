import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addIssue } from "../../Services/IssueServices";
import Form from "./Form";

const CreateIssue = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(false);
  const [newIssueStrings, setNewIssueStrings] = useState({
    title: "",
    comment: "",
    created: "",
  });
  
  const onStringChange = (e) => {
    const { name, value } = e.target;
    setNewIssueStrings((values) => ({ ...values, [name]: value }));
  };

  const [newIssueBools, setNewIssueBools] = useState({
    hasReminder: false,
    isCompleted: false,
  });

  const onBoolChange = (e) => {
    const { name, checked } = e.target;
    setNewIssueBools(values => ({ ...values, [name]: checked }));
  }

  // add validation next
  const issueToAdd = {
    title: newIssueStrings.title,
    comment: newIssueStrings.comment,
    hasReminder: newIssueBools.hasReminder,
    isCompleted: newIssueBools.isCompleted,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIssue(issueToAdd, setApiError);
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Form
        values={[newIssueStrings, newIssueBools]}
        onChanges={[onStringChange, onBoolChange]}
        onSubmit={handleSubmit}
        apiError={apiError}
      />
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
};

export default CreateIssue;
