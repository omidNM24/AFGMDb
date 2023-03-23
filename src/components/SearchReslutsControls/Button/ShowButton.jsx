import React from "react";
import "./ShowButton.css";

const showButton = (props) => {
  return (
    <div
      className={`search-controls-child-container ${
        props.show ? "search-controls-child-container-active" : ""
      }`}
    >
      <button
        className={`show-button ${props.show ? "show-btn-active" : ""}`}
        onClick={() => {
          props.set(!props.show);
        }}
      >
        {props.children}
      </button>
      <div
        className={`search-controls-details-container ${
          props.show ? "search-controls-details-container-active" : ""
        } ${props.show ? "slideIn" : ""}`}
      >
        {props.show ? props.content : null}
      </div>
    </div>
  );
};

export default showButton;
