import React from "react";
import paintbrush from "../../assets/paintbrush.svg";
import classes from "../../Components/Issues/Issues.module.css";

const Paintbrush = ({ onClick }) => {
  return (
    <span className={classes.icon} title="Change Color" onClick={onClick}>
      <img src={paintbrush} />
    </span>
  );
};

export default Paintbrush;
