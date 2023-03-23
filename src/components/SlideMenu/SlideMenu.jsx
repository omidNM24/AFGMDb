import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./SlideMenu.css";
import { useSelector } from "react-redux";

const slideMenu = () => {
  const darkThemeState = useSelector((state) => state.mainState.darkTheme);
  return (
    <div className="slideMenu-container ">
      <div
        className={`slideMenu-left ${
          darkThemeState ? "slideMenu-left-dark" : "slideMenu-left-light"
        } slideInMenu`}
      >
        <Link
          className={`nav-link ${
            darkThemeState ? "nav-link-dark" : "nav-link-light"
          } `}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`nav-link ${
            darkThemeState ? "nav-link-dark" : "nav-link-light"
          }`}
          to="/"
        >
          Latest
        </Link>
        <Search />
      </div>
    </div>
  );
};

export default slideMenu;
