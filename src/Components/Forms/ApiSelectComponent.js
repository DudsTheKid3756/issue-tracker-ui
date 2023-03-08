import React from "react";
import { BASE_URLS } from "../../utils/constants";
import Refresh from "../../utils/icons/Refresh";
import "./form.css";

const ApiSelectComponent = ({ apiPath, toggleApiPath }) => {
  const urls = BASE_URLS;
  const options = Object.entries(urls);

  // replce with modal prompting login for springboot api
  const promptChange = (e) => {
    e.preventDefault();
    if (apiPath == "dotnet") alert("Login to Springboot API??");
    toggleApiPath(e);
  };

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
        onChange={promptChange}
      >
        {options.map((value, index) => (
          <option key={index} defaultValue={value[1]}>
            {value[1]} ({value[0].toUpperCase()})
          </option>
        ))}
      </select>
      <Refresh
        style="ms-2 refresh"
        color="#252525"
        title="Refresh"
        onClick={() => window.location.reload()}
      />
    </>
  );
};

export default ApiSelectComponent;
