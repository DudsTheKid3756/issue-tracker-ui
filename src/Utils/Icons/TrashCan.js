import React from "react";
import trashcan from "../../assets/trashcan.svg";

const TrashCan = ({ style, title, onClick }) => {
  return (
    <span className={style} title={title} onClick={onClick}>
      <img src={trashcan} />
    </span>
  );
};

export default TrashCan;
