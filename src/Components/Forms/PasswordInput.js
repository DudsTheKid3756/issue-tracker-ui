import React from "react";
import Eye from "../../utils/icons/Eye";
import "./form.css";

const PasswordInput = ({
  type,
  defaultValue,
  onChange,
  disabled,
  showPassword,
  color,
}) => {
  return (
    <div className="form-group mt-3">
      <label>Password</label>
      <Eye
        style="eye"
        color={color}
        title={type == "password" ? "Show password" : "Hide password"}
        onClick={showPassword}
      />
      <input
        className="form-control mt-1"
        id="password"
        name="password"
        type={type}
        defaultValue={defaultValue.password}
        onChange={onChange}
        placeholder="Enter password"
        disabled={disabled}
      />
    </div>
  );
};

export default PasswordInput;
