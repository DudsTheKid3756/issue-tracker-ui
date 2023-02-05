import React from "react";
import paintbrush from "../../assets/paintbrush.svg";
import { IconType } from '../../@types/IconType';

const Paintbrush: React.FC<IconType> = ({ title, onClick }) => {
  return (
    <span className="" title={title} onClick={onClick}>
      <img src={paintbrush} />
    </span>
  );
};

export default Paintbrush;
