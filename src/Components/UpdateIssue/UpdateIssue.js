import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateIssue } from "../../Services/IssueServices";
import constants from "../../Utils/constants";
import validateStrings from "../../Utils/validation";
import classes from "../Form.module.css";
import ModalComponent from "../ModalComponent";
import UpdateForm from "./UpdateForm";

const UpdateIssue = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIssue = useRef(location.state.issue);
  const currentReminder = useRef(location.state.reminder);
  const [errors, setErrors] = useState({});
  const [errLength, setErrLength] = useState(0);
  const [removeReminderModal, setRemoveReminderModal] = useState(false);

  const defaultReminder = {
    ...JSON.parse(JSON.stringify(constants.INITIAL_REMINDER)),
    ["alert"]: "---Select an option---",
  };

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
    if (name == "hasReminder") {
      if (checked == false) setRemoveReminderModal(!checked);
      else {
        setReminder(defaultReminder);
        setShowReminderModal(checked);
      }
    }
  };

  const [reminder, setReminder] = useState({
    date: currentReminder.current.date,
    time: currentReminder.current.time,
    alert: currentReminder.current.alert,
  });

  const [showReminderModal, setShowReminderModal] = useState(false);

  const removeReminder = () => {
    setReminder(null);
    setBoolsToUpdate(() => ({ ...boolsToUpdate, ["hasReminder"]: false }));
    setRemoveReminderModal(false);
  };

  const closeRemoveReminderModal = () => {
    setBoolsToUpdate(() => ({ ...boolsToUpdate, ["hasReminder"]: true }));
    setRemoveReminderModal(false);
  };

  const strErrors = validateStrings({ ...strsToUpdate });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (Object.keys(strErrors).length != 0) {
      setErrors(strErrors);
      setErrLength(strErrors.length);
    }
    updateIssue(
      currentIssue.current.id,
      { ...strsToUpdate, ...boolsToUpdate, reminder: { ...reminder } },
      navigate
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className={classes.formContainer}>
      <UpdateForm
        values={{ ...strsToUpdate, ...boolsToUpdate }}
        onChanges={[onStringChange, onBoolChange]}
        handleUpdate={handleUpdate}
        errors={errors}
        errLength={errLength}
        handleCancel={handleCancel}
        reminder={reminder}
        setReminder={setReminder}
        openModal={() => setShowReminderModal(true)}
        showModal={showReminderModal}
        closeModal={() => {
          setBoolsToUpdate((values) => ({
            ...values,
            ["hasReminder"]: Object.values(reminder).some((prop) => prop == "")
              ? false
              : true,
          }));
          setShowReminderModal(false);
        }}
      />
      <ModalComponent
        isOpen={removeReminderModal}
        onRequestClose={closeRemoveReminderModal}
        label="Remove Reminder"
        header="Remove Reminder?"
        component={
          <>
            <button
              className={classes.cancel}
              onClick={closeRemoveReminderModal}
            >
              Cancel
            </button>
            <button className={classes.submit} onClick={removeReminder}>
              Remove
            </button>
          </>
        }
      />
      <ToastContainer />
    </div>
  );
};

export default UpdateIssue;
