import React from "react";
import check from "../../assets/check.svg";

const Check: React.FC<{ title: string }> = ({ title }) => {
  return (
    <span className="" title={title}>
      <img src={check} />
    </span>
  );
};

export default Check;
