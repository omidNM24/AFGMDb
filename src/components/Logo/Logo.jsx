import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

const logo = () => {
  return (
    <Link className="link-basic-styles" to="/">
      <div className="logo">
        <div className="squares-container">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="logo-text-container">
          <h2 className="logo-text">
            <span className="logo-afg-con">AFG</span>
            <span className="logo-mdb-con">MDb</span>
          </h2>
        </div>
        <div className="squares-container">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
      </div>
    </Link>
  );
};

export default logo;
