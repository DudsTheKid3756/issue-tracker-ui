import React from "react";

const SortComponent = ({ onChange, options }) => {
  return (
    <div className="mb-3 d-flex justify-content-end">
      <label className="me-2 d-inline" htmlFor="sorting">
        Sort By:{" "}
      </label>
      <select
        className="me-2 d-inline"
        id="sorting"
        name="sorting"
        onChange={onChange}
      >
        {options.map((value, index) => (
          <option key={index} defaultValue={value.sortBy}>
            {value.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortComponent;
