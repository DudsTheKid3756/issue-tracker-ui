import React from "react";
import bell from "../../assets/bell.svg";

const Alert = ({ style, title, onClick }) => {
  return (
    <span className={style} title={title} onClick={onClick}>
      <img src={bell} />
    </span>
  );
};

export default Alert;
