import { useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateIssue } from "../../Services/IssueServices";
import constants from "../../Utils/constants";
import validateStrings from "../../Utils/validation";
import classes from "../Forms/Form.module.css";
import ModalComponent from "../ModalComponent";
import UpdateForm from "./UpdateForm";
import { getItem } from "../../Utils/storage";

const UpdateIssue = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const apiPath = getItem("api", "local");

  const currentIssue = useRef(state?.issue);
  const currentReminder = useRef(state?.reminder);
  const [errors, setErrors] = useState({});
  const [errLength, setErrLength] = useState(0);
  const [removeReminderModal, setRemoveReminderModal] = useState(false);

  const defaultReminder = {
    ...JSON.parse(JSON.stringify(constants.INITIAL_REMINDER)),
    ["alert"]: "---Select an option---",
  };

  const [strsToUpdate, setStrsToUpdate] = useState({
    title: currentIssue?.current?.title,
    comment: currentIssue?.current?.comment,
  });

  const onStringChange = (e) => {
    const { name, value } = e.target;
    setStrsToUpdate((values) => ({ ...values, [name]: value }));
  };

  const [showColorPicker, setShowColorPicker] = useState(false);

  const [colorToUpdate, setColorToUpdate] = useState({
    color: currentIssue?.current?.color,
  });

  const onColorChange = (colorToUpdate) =>
    setColorToUpdate(() => ({ ["color"]: colorToUpdate.hex }));

  const [boolsToUpdate, setBoolsToUpdate] = useState({
    hasReminder: currentIssue?.current?.hasReminder,
    isCompleted: currentIssue?.current?.isCompleted,
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
    date: currentReminder?.current?.date,
    time: currentReminder?.current?.time,
    alert: currentReminder?.current?.alert,
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

  const closeReminderModal = () => {
    setBoolsToUpdate((values) => ({
      ...values,
      ["hasReminder"]: Object.values(reminder).some((prop) => prop == "")
        ? false
        : true,
    }));
    setShowReminderModal(false);
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
      {
        ...strsToUpdate,
        ...boolsToUpdate,
        ...colorToUpdate,
        reminder: reminder,
      },
      navigate,
      apiPath
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
        closeModal={closeReminderModal}
        setShowColorPicker={setShowColorPicker}
      />
      <div className={classes.pickerContainer}>
        {showColorPicker ? (
          <TwitterPicker
            className={classes.picker}
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
