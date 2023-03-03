import React from "react";
import constants from "../../utils/constants";
import "./form.css";

const ApiSelectComponent = ({ apiPath, toggleApiPath }) => {
  const urls = constants.BASE_URLS;
  const options = Object.entries(urls);

  return (
    <>
      <label className="apiSelectLabel" htmlFor="api">
        API
      </label>
      <select
        id="api"
        name="api"
        className="apiSelect"
        defaultValue={urls[apiPath]}
        onChange={toggleApiPath}
      >
        {options.map((value, index) => (
          <option key={index} defaultValue={value[1]}>
            {value[1]}
          </option>
        ))}
      </select>
    </>
  );
};

export default ApiSelectComponent;
