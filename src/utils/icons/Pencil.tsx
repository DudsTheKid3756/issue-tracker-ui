import React from "react";
import pencil from "../../assets/pencil.svg";
import { IconType } from '../../@types/IconType';

const Edit: React.FC<IconType> = ({ title, onClick }) => {
  return (
    <span className="" title={title} onClick={onClick}>
      <img src={pencil} />
    </span>
  );
};

export default Edit;
