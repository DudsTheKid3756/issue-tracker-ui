import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="alert alert-danger">
      <h1 className="font-weight-bolder">404 Not Found</h1>
      <p>
        The resource you are trying to access does not exist :({" "}
        <NavLink className="stretched-link" to="/issues">
          Go to Issues page?
        </NavLink>{" "}
      </p>
    </div>
  );
};

export default NotFound;
