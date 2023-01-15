import React from "react";
import bell from "../../assets/bell.svg";
import classes from "../../Components/Issues/Issues.module.css";

const Alert = ({ title, onClick }) => {
  return (
    <span className={classes.icon} title={title} onClick={onClick}>
      <img src={bell} />
    </span>
  );
};

export default Alert;
