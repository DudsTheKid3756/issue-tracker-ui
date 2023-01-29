import React from "react";
import info from "../../assets/info.svg";
import classes from "../../components/issues/Issues.module.css";

const Info = ({ title, onClick }) => {
  return (
    <span className={classes.icon} title={title} onClick={onClick}>
      <img src={info} />
    </span>
  );
};

export default Info;
