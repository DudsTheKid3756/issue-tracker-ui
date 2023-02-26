import React from "react";
import pencil from "../../assets/pencil.svg";

const Edit = ({ style, title, onClick }) => {
  return (
    <span className={style} title={title} onClick={onClick}>
      <img src={pencil} />
    </span>
  );
};

export default Edit;
