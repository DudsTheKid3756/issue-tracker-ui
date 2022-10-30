import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateIssue } from "../../Services/IssueServices";
import validateStrings from "../../Utils/validation";
import classes from "../Form.module.css";
import UpdateForm from "./UpdateForm";

const UpdateIssue = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIssue = useRef(location.state.issue);
  const currentReminder = useRef(location.state.issue);
  const [errors, setErrors] = useState({});
  const [errLength, setErrLength] = useState(0);

  const [strsToUpdate, setStrsToUpdate] = useState({
    title: currentIssue.current.title,
    comment: currentIssue.current.comment,
  });

  const onStringChange = (e) => {
    const { name, value } = e.target;
    setStrsToUpdate((values) => ({ ...values, [name]: value }));
  };

  const [boolsToUpdate, setBoolsToUpdate] = useState({
    hasReminder: currentIssue.current.hasReminder,
    isCompleted: currentIssue.current.isCompleted,
  });

  const onBoolChange = (e) => {
    const { name, checked } = e.target;
    setBoolsToUpdate((values) => ({ ...values, [name]: checked }));
  };

  const [reminder, setReminder] = useState({
    time: currentReminder.current.time,
    date: currentReminder.current.date,
    alert: currentReminder.current.alert,
  });

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    
  }

  const strErrors = validateStrings({ ...strsToUpdate });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (Object.keys(strErrors).length != 0) {
      setErrors(strErrors);
      setErrLength(strErrors.length);
    }
    updateIssue(
      currentIssue.current.id,
      { ...strsToUpdate, ...boolsToUpdate },
      navigate
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={classes.formContainer}>
      <UpdateForm
        values={{...strsToUpdate, ...boolsToUpdate}}
        onChanges={[onStringChange, onBoolChange]}
        handleUpdate={handleUpdate}
        errors={errors}
        errLength={errLength}
        handleCancel={handleCancel}
        reminder={reminder}
        setReminder={setReminder}
      />
      <ToastContainer />
    </div>
  );
};

export default UpdateIssue;
