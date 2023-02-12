import React from "react";
import paintbrush from "../../assets/paintbrush.svg";
import classes from "../../components/issues/Issues.module.css";

const Paintbrush = ({ title, onClick }) => {
  return (
    <span className={classes.icon} title={title} onClick={onClick}>
      <img src={paintbrush} />
    </span>
  );
};

export default Paintbrush;
