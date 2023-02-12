import { useState } from "react";
import { TwitterPicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { addIssue } from "../../services/IssueServices";
import constants from "../../utils/constants";
import handleStorage from "../../utils/storage";
import validateStrings from "../../utils/validation";
import classes from "../forms/Form.module.css";
import CreateForm from "./CreateForm";

const CreateIssue = () => {
  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");

  const [errors, setErrors] = useState({});
  const [errLength, setErrLength] = useState(0);
  const [newIssueStrings, setNewIssueStrings] = useState({
    title: "",
    comment: "",
  });
  const [color, setColor] = useState("#000000");
  const [newIssueBools, setNewIssueBools] = useState({
    hasReminder: false,
    isCompleted: false,
  });
  const defaultReminder = {
    ...JSON.parse(JSON.stringify(constants.INITIAL_REMINDER)),
    ["alert"]: "---Select an option---",
  };
  const [reminder, setReminder] = useState(defaultReminder);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const strErrors = validateStrings({ ...newIssueStrings });

  const onColorChange = (color) => setColor(color.hex);

  function onStringChange(e) {
    const { name, value } = e.target;
    setNewIssueStrings((values) => ({ ...values, [name]: value }));
  }

  function onBoolChange(e) {
    const { name, checked } = e.target;
    setNewIssueBools((values) => ({ ...values, [name]: checked }));
    if (name == "hasReminder") {
      if (checked == true) setShowModal(true);
      else setReminder(defaultReminder);
    }
  }

  function closeModal(e) {
    if (e.currentTarget.innerHTML == "Cancel")
      setNewIssueBools((values) => ({ ...values, ["hasReminder"]: false }));
    setShowModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(strErrors).length != 0) {
      setErrors(strErrors);
      setErrLength(strErrors.length);
    }
    const reminderToAdd = Object.values(reminder).some((prop) => prop == "")
      ? null
      : reminder;
    addIssue(
      {
        ...newIssueStrings,
        ...newIssueBools,
        color,
        reminder: reminderToAdd,
      },
      navigate,
      apiPath
    );
  }

  function handleCancel() {
    navigate("/issues");
  }

  return (
    <div className={classes.formContainer}>
      <CreateForm
        values={{ ...newIssueStrings, ...newIssueBools }}
        onChanges={[onStringChange, onBoolChange, onColorChange]}
        onSubmit={handleSubmit}
        errors={errors}
        errLength={errLength}
        handleCancel={handleCancel}
        reminder={reminder}
        setReminder={setReminder}
        showModal={showModal}
        closeModal={closeModal}
        setShowColorPicker={setShowColorPicker}
      />
      <div className={classes.pickerContainer}>
        {showColorPicker ? (
          <TwitterPicker
            className={classes.picker}
            triangle="hide"
            color={color}
            onChangeComplete={onColorChange}
          />
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateIssue;
