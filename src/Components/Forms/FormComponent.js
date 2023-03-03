import React from "react";
import "./form.css";

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
  min,
  maxLength,
}) => {
  return (
    <>
      <form className="formComponent">
        <label className="formLabel" htmlFor={field}>
          {label}
        </label>
        {type == "text" ? <br /> : null}
        {!isMultiline ? (
          <>
            <input
              className={`formInput ${errLength != 0 ? "errBorder" : ""}`}
              id={field}
              name={field}
              type={type}
              placeholder={placeholder}
              defaultValue={values[field]}
              checked={values[field]}
              min={min}
              maxLength={maxLength}
              onChange={type == "text" ? onChanges[0] : onChanges[1]}
            />
            <div className="errorContainer">
              {type == "text" && errLength != 0 ? (
                <p className="errorBase normErr">{errors[field]}</p>
              ) : null}
            </div>
            <br />
          </>
        ) : (
          <>
            <textarea
              className={`${errLength != 0 ? "textAreaErrBorder" : ""}`}
              id={field}
              name={field}
              placeholder={placeholder}
              defaultValue={values[field]}
              onChange={onChanges[0]}
            ></textarea>
            <div className="errorContainer">
              {type == "text" && errLength != 0 ? (
                <p className="errorBase textAreaErr">{errors[field]}</p>
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
