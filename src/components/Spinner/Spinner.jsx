import React from "react";
import "./Spinner.css";

import { useSelector } from "react-redux";

const spinner = () => {
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  return (
    <div
      className={`spinner-container ${
        darkTheme ? "main-all-container-dark" : "main-all-container-light"
      }`}
    >
      <div className="circle">
        <div className="child-circle"></div>
      </div>
    </div>
  );
};

export default spinner;
