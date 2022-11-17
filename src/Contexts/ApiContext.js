import React, { createContext, useState } from "react";
import { storeItem } from "../Utils/storage";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [apiPath, setApiPath] = useState("dotnet");
  const [apiError, setApiError] = useState(false);

  storeItem("api", apiPath);
  const toggleApiError = (bool) => setApiError(bool);
  const toggleApiPath = (e) => {
    setApiError(false);
    setApiPath(e.target.value);
    storeItem("api", e.target.value);
  };

  return (
    <ApiContext.Provider value={{ toggleApiPath, apiError, toggleApiError }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
