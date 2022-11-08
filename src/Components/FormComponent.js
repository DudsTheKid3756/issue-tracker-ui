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
  errLength,
  isMultiline,
  min
}) => {
  return (
    <>
      <form className={classes.formComponent}>
        <label className={classes.formLabel} htmlFor={field}>
          {label}
        </label>
        {type == "text" ? <br /> : null}
        {!isMultiline ? (
          <>
            <input
              className={`${classes.formInput} ${
                errLength != 0 ? classes.errBorder : ""
              }`}
              id={field}
              name={field}
              type={type}
              placeholder={placeholder}
              defaultValue={values[field]}
              checked={values[field]}
              min={min}
              onChange={type == "text" ? onChanges[0] : onChanges[1]}
            />
            <div className={classes.errorContainer}>
              {type == "text" && errLength != 0 ? (
                <p className={`${classes.errorBase} ${classes.normErr}`}>
                  {errors[field]}
                </p>
              ) : null}
            </div>
            <br />
          </>
        ) : (
          <>
            <textarea
              className={`${errLength != 0 ? classes.textAreaErrBorder : ""}`}
              id={field}
              name={field}
              placeholder={placeholder}
              defaultValue={values[field]}
              onChange={onChanges[0]}
            ></textarea>
            <div className={classes.errorContainer}>
              {type == "text" && errLength != 0 ? (
                <p className={`${classes.errorBase} ${classes.textAreaErr}`}>
                  {errors[field]}
                </p>
              ) : null}
            </div>
            <br />
          </>
        )}
      </form>
    </>
  );
};

export default FormComponent;
