import jwtDecode from "jwt-decode";
import { useState } from "react";
import { CirclePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { addIssue } from "../../services/IssueServices";
import { COLORS, INITIAL_REMINDER, USERNAME_KEY } from "../../utils/constants";
import handleStorage from "../../utils/storage";
import { getToken } from "../../utils/tokenHelper";
import validateStrings from "../../utils/validation";
import "../forms/form.css";
import CreateForm from "./CreateForm";

const CreateIssue = () => {
  const navigate = useNavigate();
  const apiPath = handleStorage("get", "local", "api");
  const storedToken = getToken();
  const decodedToken = storedToken !== null ? jwtDecode(storedToken) : null;

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
    ...JSON.parse(JSON.stringify(INITIAL_REMINDER)),
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

    let username;
    try {
      username = decodedToken[USERNAME_KEY];
    } catch (e) {
      console.error(e);
    }

    const reminderToAdd = Object.values(reminder).some((prop) => prop == "")
      ? null
      : reminder;
    addIssue(
      {
        createdBy: username,
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
    <div className="formContainer">
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
      {showColorPicker ? (
        <div className="pickerContainer">
          <p className="p-1 text-md-center">Color Picker</p>
          <CirclePicker
            className="picker"
            colors={Array.from(COLORS.values())}
            circleSize={32}
            color={color}
            onChangeComplete={onColorChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreateIssue;
