import React from "react";
import classes from "../Components/Form.module.css";

const SelectComponent = ({ label, field, onChanges, value, options }) => {
    console.log(value[field]);
  return (
    <div>
      <label className={classes.formLabel} htmlFor={field}>
        {label}
      </label>
      <select
        id={field}
        className={classes.formInput}
        name={field}
        value={value[field]}
        onChange={onChanges[1]}
      >
        {options.map((option, index) => (
          <option key={index}>{option.optStr}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
