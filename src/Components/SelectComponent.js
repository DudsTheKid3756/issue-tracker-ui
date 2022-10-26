import React from "react";
import classes from "../Components/Form.module.css";

const SelectComponent = ({ label, field, onChanges, values, options }) => {
  return (
    <div>
      <label className={classes.formLabel} htmlFor={field}>
        {label}
      </label>
      <select
        id={field}
        className={classes.formInput}
        name={field}
        onChange={onChanges[1]}
      >
        <option>{values[field]}</option>
        {options.map((option, index) => (
          <option key={index} defaultValue={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
