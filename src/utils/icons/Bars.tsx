import React from "react";
import bars from "../../assets/bars.svg";
import { IconType } from '../../@types/IconType';

const Bars: React.FC<IconType> = ({ title, onClick }) => {
  return (
    <span className="" title={title} onClick={onClick}>
      <img src={bars} />
    </span>
  );
};

export default Bars;
