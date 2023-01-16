import React, { createContext, useState } from "react";
import handleStorage, { storeItem } from "../Utils/storage";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [apiPath, setApiPath] = useState("dotnet");
  const [apiError, setApiError] = useState(false);

  handleStorage("set", "local", "api", apiPath);

  function toggleApiError(bool) {
    return setApiError(bool);
  }

  function toggleApiPath(e) {
    setApiError(false);
    setApiPath(e.target.value);
    handleStorage("set", "local", "api", e.target.value);
  }

  return (
    <ApiContext.Provider value={{ toggleApiPath, apiError, toggleApiError }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
