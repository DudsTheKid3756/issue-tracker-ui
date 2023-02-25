import { useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateIssue } from "../../services/IssueServices";
import constants from "../../utils/constants";
import handleStorage from "../../utils/storage";
import validateStrings from "../../utils/validation";
import "../forms/form.css";
import ModalComponent from "../ModalComponent";
import UpdateForm from "./UpdateForm";

const UpdateIssue = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");

  const currentIssue = useRef(state?.issue);
  const currentReminder = useRef(state?.reminder);
  const [errors, setErrors] = useState({});
  const [errLength, setErrLength] = useState(0);
  const [removeReminderModal, setRemoveReminderModal] = useState(false);
  const [strsToUpdate, setStrsToUpdate] = useState({
    title: currentIssue?.current?.title,
    comment: currentIssue?.current?.comment,
  });
  const [boolsToUpdate, setBoolsToUpdate] = useState({
    hasReminder: currentIssue?.current?.hasReminder,
    isCompleted: currentIssue?.current?.isCompleted,
  });
  const [colorToUpdate, setColorToUpdate] = useState({
    color: currentIssue?.current?.color,
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const defaultReminder = {
    ...JSON.parse(JSON.stringify(constants.INITIAL_REMINDER)),
    ["alert"]: "---Select an option---",
  };
  const [reminder, setReminder] = useState({
    date: currentReminder?.current?.date,
    time: currentReminder?.current?.time,
    alert: currentReminder?.current?.alert,
  });
  const [showReminderModal, setShowReminderModal] = useState(false);
  const strErrors = validateStrings({ ...strsToUpdate });

  function onStringChange(e) {
    const { name, value } = e.target;
    setStrsToUpdate((values) => ({ ...values, [name]: value }));
  }

  function onColorChange(colorToUpdate) {
    return setColorToUpdate(() => ({ ["color"]: colorToUpdate.hex }));
  }

  function onBoolChange(e) {
    const { name, checked } = e.target;
    setBoolsToUpdate((values) => ({ ...values, [name]: checked }));
    if (name == "hasReminder") {
      if (checked == false) setRemoveReminderModal(!checked);
      else {
        setReminder(defaultReminder);
        setShowReminderModal(checked);
      }
    }
  }

  function removeReminder() {
    setReminder(null);
    setBoolsToUpdate(() => ({ ...boolsToUpdate, ["hasReminder"]: false }));
    setRemoveReminderModal(false);
  }

  function closeRemoveReminderModal() {
    setBoolsToUpdate(() => ({ ...boolsToUpdate, ["hasReminder"]: true }));
    setRemoveReminderModal(false);
  }

  function closeReminderModal() {
    setBoolsToUpdate((values) => ({
      ...values,
      ["hasReminder"]: Object.values(reminder).some((prop) => prop == "")
        ? false
        : true,
    }));
    setShowReminderModal(false);
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (Object.keys(strErrors).length != 0) {
      setErrors(strErrors);
      setErrLength(strErrors.length);
    }
    updateIssue(
      currentIssue.current.id,
      {
        ...strsToUpdate,
        ...boolsToUpdate,
        ...colorToUpdate,
        reminder: reminder,
      },
      navigate,
      apiPath,
      false
    );
  }

  function handleCancel() {
    navigate("/issues");
  }

  return (
    <div className="formContainer">
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
        closeModal={closeReminderModal}
        setShowColorPicker={setShowColorPicker}
      />
      <div className="pickerContainer">
        {showColorPicker ? (
          <TwitterPicker
            className="picker"
            triangle="hide"
            color={colorToUpdate.color}
            onChangeComplete={onColorChange}
          />
        ) : null}
      </div>
      <ModalComponent
        isOpen={removeReminderModal}
        onRequestClose={closeRemoveReminderModal}
        label="Remove Reminder"
        header="Remove Reminder?"
        component={
          <>
            <button className="cancel" onClick={closeRemoveReminderModal}>
              Cancel
            </button>
            <button className="submit" onClick={removeReminder}>
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
