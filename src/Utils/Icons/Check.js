import React from "react";
import check from "../../assets/check.svg";

const Check = ({ style, title }) => {
  return (
    <span className={style} title={title}>
      <img src={check} />
    </span>
  );
};

export default Check;
