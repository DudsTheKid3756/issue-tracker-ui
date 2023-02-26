import React from "react";
import info from "../../assets/info.svg";

const Info = ({ style, title, onClick }) => {
  return (
    <span className={style} title={title} onClick={onClick}>
      <img src={info} />
    </span>
  );
};

export default Info;
