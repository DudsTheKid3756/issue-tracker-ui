import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { addIssue } from "../../Services/IssueServices";
import validateStrings from "../../Utils/validation";
import CreateForm from "./CreateForm";
import classes from "../Form.module.css";

const CreateIssue = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errLength, setErrLength] = useState(0);

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
    setNewIssueBools((values) => ({ ...values, [name]: checked }));
  };
  
  const handleCloseModal = () => {
    setNewIssueBools(newIssueBools.hasReminder);
  };

  const strErrors = validateStrings({ ...newIssueStrings });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(strErrors).length != 0) {
      setErrors(strErrors);
      setErrLength(strErrors.length);
    }
    addIssue({ ...newIssueStrings, ...newIssueBools }, navigate);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={classes.formContainer}>
      <CreateForm
        values={{...newIssueStrings, ...newIssueBools}}
        onChanges={[onStringChange, onBoolChange]}
        onSubmit={handleSubmit}
        errors={errors}
        errLength={errLength}
        handleCancel={handleCancel}
        showModal={newIssueBools.hasReminder}
        onRequestClose={handleCloseModal}
      />
      <ToastContainer />
    </div>
  );
};

export default CreateIssue;
