import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addIssue } from "../../Services/IssueServices";
import validateStrings from "../../validation";
import Form from "./Form";

const CreateIssue = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [newIssueStrings, setNewIssueStrings] = useState({
    title: "",
    comment: "",
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

  const strErrors = validateStrings({ ...newIssueStrings });

  const handleSubmit = (e) => {
    if (Object.keys(strErrors).length != 0) {
      e.preventDefault();
      setErrors(strErrors);
    }
    addIssue({ ...newIssueStrings, ...newIssueBools });
  }

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Form
        values={[newIssueStrings, newIssueBools]}
        onChanges={[onStringChange, onBoolChange]}
        onSubmit={handleSubmit}
        errors={errors}
      />
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
};

export default CreateIssue;
