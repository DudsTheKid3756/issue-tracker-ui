import React from "react";
import "./form.css";

const SelectComponent = ({ label, field, onChanges, values, options }) => {
  return (
    <div>
      <label className="formLabel" htmlFor={field}>
        {label}
      </label>
      <select
        id={field}
        className="formInput"
        name={field}
        onChange={onChanges[1]}
      >
        <option>{values[field]}</option>
        {options.map((option, index) => (
          <option key={index} defaultValue={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
