import React from "react";
import magnifyglass from "../../assets/magnifying-glass.svg";

const Search = ({ title, onClick, style }) => {
  return (
    <span title={title} onClick={onClick}>
      <img className={style} src={magnifyglass} />
    </span>
  );
};

export default Search;
