import React from "react";
import { ClipLoader } from "react-spinners";
import classes from "../index.css";

const LoadingSpinner = () => (
  <div className={classes.spinnerContainer}>
    <ClipLoader
      cssOverride={{ display: "block", margin: "0 auto" }}
      color="#000000"
      size={49}
    />
  </div>
);

export default LoadingSpinner;
