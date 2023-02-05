import React from "react";
import classes from "./Form.module.css";
import constants from "../../utils/constants";

const ApiSelectComponent = ({ apiPath, toggleApiPath }) => {
  const urls = constants.BASE_URLS;

  return (
    <>
      <label className={classes.apiSelectLabel} htmlFor="api">
        API
      </label>
      <select
        id="api"
        name="api"
        className={classes.apiSelect}
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
