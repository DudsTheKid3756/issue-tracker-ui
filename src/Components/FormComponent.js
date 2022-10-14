import React from "react";
import classes from "./Form.module.css";

const FormComponent = ({
  label,
  field,
  type,
  placeholder,
  values,
  onChanges,
  errors,
  errLength
}) => {
  return (
    <>
      <form className={classes.formComponent}>
        <label className={classes.formLabel} htmlFor={field}>
          {label}
        </label>
        {type == "text" ? <br /> : null}
        <input
          className={`${classes.formInput} ${errLength != 0 ? classes.errBorder : ""}`}
          id={field}
          name={field}
          type={type}
          placeholder={placeholder}
          value={values[0][field]}
          defaultChecked={values[1][field]}
          onChange={type == "text" ? onChanges[0] : onChanges[1]}
        />
      </form>
      <div className={classes.errorContainer}>
        {type == "text" && errLength != 0 ? (
          <p className={classes.error}>{errors[field]}</p>
        ) : null}
      </div>
      <br />
    </>
  );
};

export default FormComponent;
