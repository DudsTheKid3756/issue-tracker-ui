import React from "react";
import bars from "../../assets/bars.svg";
import classes from "../../components/issues/Issues.module.css";

const Bars = ({ title, onClick }) => {
  return (
    <span className={classes.icon} title={title} onClick={onClick}>
      <img src={bars} />
    </span>
  );
};

export default Bars;
