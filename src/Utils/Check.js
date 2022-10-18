import React from "react";
import classes from "../Components/Issues/Issues.module.css";

const Check = ({ color, title }) => {
  return (
    <span title={title}>
      <svg
        className={classes.check}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={color}
        viewBox="0 0 512 512"
      >
        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
    </span>
  );
};

export default Check;
