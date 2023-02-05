import React from "react";
import info from "../../assets/info.svg";
import { IconType } from '../../@types/IconType';

const Info: React.FC<IconType> = ({ title, onClick }) => {
  return (
    <span className="" title={title} onClick={onClick}>
      <img src={info} />
    </span>
  );
};

export default Info;
