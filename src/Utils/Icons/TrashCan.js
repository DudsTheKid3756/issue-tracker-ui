import React from "react";
import trashcan from "../../assets/trashcan.svg";
import classes from "../../components/issues/Issues.module.css";

const TrashCan = ({ onClick }) => {
  return (
    <span className={classes.icon} title="Delete" onClick={onClick}>
      <img src={trashcan} />
    </span>
  );
};

export default TrashCan;
