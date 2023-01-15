import React from "react";
import check from "../../assets/check.svg";
import classes from "../../Components/Issues/Issues.module.css";

const Check = () => {
  return (
    <span className={classes.check} title="Completed">
      <img src={check} />
    </span>
  );
};

export default Check;
