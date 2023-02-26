import React from "react";
import bars from "../../assets/bars.svg";

const Bars = ({ style, title, onClick }) => {
  return (
    <span className={style} title={title} onClick={onClick}>
      <img src={bars} />
    </span>
  );
};

export default Bars;
