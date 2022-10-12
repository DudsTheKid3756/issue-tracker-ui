import React from "react";
import classes from "../Components/CreateIssue/Create.module.css";

const FormComponent = ({
  label,
  field,
  type,
  placeholder,
  values,
  onChanges,
  errors,
}) => {
  return (
    <>
      <form className={classes.formComponent}>
        <label className={classes.formLabel} htmlFor={field}>
          {label}
        </label>
        {type == "text" ? <br /> : null}
        <input
          className={classes.formInput}
          id={field}
          name={field}
          type={type}
          placeholder={placeholder}
          value={values[0][field]}
          defaultChecked={values[1][field]}
          onChange={type == "text" ? onChanges[0] : onChanges[1]}
        />
      </form>
      {type == "text" && errors.length != 0 ? (
        <p className={classes.error}>{errors[field]}</p>
      ) : null}
    </>
  );
};

export default FormComponent;
