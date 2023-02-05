import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div className="">
    <ClipLoader
      cssOverride={{ display: "block", margin: "0 auto" }}
      color="#000000"
      size={49}
    />
  </div>
);

export default LoadingSpinner;
