import React from "react";
import check from "../../assets/check.svg";
import classes from "../../components/issues/Issues.module.css";

const Check = ({ title }) => {
  return (
    <span className={classes.check} title={title}>
      <img src={check} />
    </span>
  );
};

export default Check;
