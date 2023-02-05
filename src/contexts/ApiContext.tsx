import React, { createContext, useState } from "react";
import handleStorage from "../utils/storage";
import { Event } from '../@types/Event';
import { SetStateAction } from "react";

export const ApiContext = createContext<any>({});

const ApiContextProvider = (props: { children: any }) => {
  const [apiPath, setApiPath] = useState("dotnet");
  const [apiError, setApiError] = useState(false);

  handleStorage("set", "local", "api", apiPath);

  function toggleApiError(bool: boolean) {
    return setApiError(bool);
  }

  function toggleApiPath(e: Event) {
    setApiError(false);
    setApiPath(e.target.value as SetStateAction<string>);
    handleStorage("set", "local", "api", e.target.value);
  }

  return (
    <ApiContext.Provider value={{ toggleApiPath, apiError, toggleApiError }}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
