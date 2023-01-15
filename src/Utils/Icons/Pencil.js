import React from "react";
import pencil from "../../assets/pencil.svg";
import classes from "../../Components/Issues/Issues.module.css";

const Edit = ({ onClick }) => {
  return (
    <span className={classes.icon} title="Edit" onClick={onClick}>
      <img src={pencil} />
    </span>
  );
};

export default Edit;
