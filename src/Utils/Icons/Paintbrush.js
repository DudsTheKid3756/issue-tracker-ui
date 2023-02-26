import React from "react";
import paintbrush from "../../assets/paintbrush.svg";

const Paintbrush = ({ style, title, onClick }) => {
  return (
    <span className={style} title={title} onClick={onClick}>
      <img src={paintbrush} />
    </span>
  );
};

export default Paintbrush;
