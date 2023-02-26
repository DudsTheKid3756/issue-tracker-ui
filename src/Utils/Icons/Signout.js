import React from "react";
import signout from "../../assets/sign-out.svg";

const Signout = ({ style, title }) => {
  return (
    <span className={style}>
      <img src={signout} />
    </span>
  );
};

export default Signout;
