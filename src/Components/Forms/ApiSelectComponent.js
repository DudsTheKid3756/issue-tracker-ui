import React from "react";
import constants from "../../utils/constants";
import "./form.css";

const ApiSelectComponent = ({ apiPath, toggleApiPath }) => {
  const urls = constants.BASE_URLS;

  return (
    <>
      <label className="apiSelectLabel" htmlFor="api">
        API
      </label>
      <select
        id="api"
        name="api"
        className="apiSelect"
        onChange={toggleApiPath}
      >
        <option>{urls[apiPath]}</option>
        <option key={"dotnet"} value={"dotnet"}>
          {urls.dotnet}
        </option>
        <option key={"java"} value={"java"}>
          {urls.java}
        </option>
      </select>
    </>
  );
};

export default ApiSelectComponent;
