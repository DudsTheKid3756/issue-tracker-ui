import React from "react";
import { IconType } from "src/@types/IconType";
import trashcan from "../../assets/trashcan.svg";

const TrashCan: React.FC<IconType> = ({ title, onClick }) => {
  return (
    <span className="" title={title} onClick={onClick}>
      <img src={trashcan} />
    </span>
  );
};

export default TrashCan;
