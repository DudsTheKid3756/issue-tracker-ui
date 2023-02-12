import React from "react";
import pencil from "../../assets/pencil.svg";
import classes from "../../components/issues/Issues.module.css";

const Edit = ({ title, onClick }) => {
  return (
    <span className={classes.icon} title={title} onClick={onClick}>
      <img src={pencil} />
    </span>
  );
};

export default Edit;
