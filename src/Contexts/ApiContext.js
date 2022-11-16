import React, { createContext, useState } from "react";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [apiPathIndex, setApiPathIndex] = useState(0);
  const [apiError, setApiError] = useState(false);

  const toggleApiError = (bool) => setApiError(bool);
  const toggleApiPath = (e) => {
    setApiError(false);
    setApiPathIndex(e.target.value);
  };

  return (
    <ApiContext.Provider value={{ apiPathIndex, toggleApiPath, apiError, toggleApiError }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
