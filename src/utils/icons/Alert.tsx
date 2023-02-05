import React from "react";
import bell from "../../assets/bell.svg";
import { IconType } from '../../@types/IconType';

const Alert: React.FC<IconType> = ({ title, onClick }) => {
  return (
    <span className="" title={title} onClick={onClick}>
      <img src={bell} />
    </span>
  );
};

export default Alert;
