import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { addIssue } from "../../Services/IssueServices";
import { TwitterPicker } from "react-color";
import validateStrings from "../../Utils/validation";
import CreateForm from "./CreateForm";
import classes from "../Form.module.css";
import constants from "../../Utils/constants";
import { ApiContext } from "../../Contexts/ApiContext";

const CreateIssue = () => {
  const navigate = useNavigate();
  const { apiPathIndex } = useContext(ApiContext);

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

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#000000");

  const onColorChange = (color) => setColor(color.hex);

  const [newIssueBools, setNewIssueBools] = useState({
    hasReminder: false,
    isCompleted: false,
  });

  const defaultReminder = {
    ...JSON.parse(JSON.stringify(constants.INITIAL_REMINDER)),
    ["alert"]: "---Select an option---",
  };

  const [reminder, setReminder] = useState(defaultReminder);

  const onBoolChange = (e) => {
    const { name, checked } = e.target;
    setNewIssueBools((values) => ({ ...values, [name]: checked }));
    if (name == "hasReminder") {
      if (checked == true) setShowModal(true);
      else setReminder(defaultReminder);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const closeModal = (event) => {
    if (event.currentTarget.innerHTML == "Cancel")
      setNewIssueBools((values) => ({ ...values, ["hasReminder"]: false }));
    setShowModal(false);
  };

  const strErrors = validateStrings({ ...newIssueStrings });

  const handleSubmit = (e) => {
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
      apiPathIndex
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

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
