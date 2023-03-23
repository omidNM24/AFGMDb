import React, { useEffect, useState } from "react";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { changeTheme } from "./../../initialState";
import Search from "../../components/Search/Search";
import Logo from "../../components/Logo/Logo";
import Aux from "../../hoc/Aux";
import SlideMenu from "../../components/SlideMenu/SlideMenu";

const navigation = (props) => {
  const darkThemeState = useSelector((state) => state.mainState.darkTheme);
  const [showControlsOnNav, setShowControlsOnNav] = useState(
    window.innerWidth <= 753 ? false : true
  );
  const dispatch = useDispatch();

  const navLinkClasses = [
    "nav-link",
    darkThemeState ? "nav-link-dark" : "nav-link-light",
  ];

  const changeThemeLocal = (darkTheme = true) => {
    localStorage.setItem("darkTheme", darkTheme);
    const theme = localStorage.getItem("darkTheme");
    dispatch(changeTheme({ darkTheme: theme }));
  };

  let hidden = true;

  const slideMenuManage = () => {
    hidden = !hidden;
    document.querySelector(".slideMenu-container").style.display = hidden
      ? "none"
      : "block";
  };

  // window.innerWidth <= 753
  //   ? setShowControlsOnNav(false)
  //   : setShowControlsOnNav(true);

  window.addEventListener("resize", () => {
    window.innerWidth <= 753
      ? setShowControlsOnNav(false)
      : setShowControlsOnNav(true);
  });

  return (
    <div className={`nav ${darkThemeState ? "nav-dark" : "nav-light"}`}>
      <div className="left-side-con">
        <BiMenu className="menu-icon" onClick={slideMenuManage} />
        <div className="left-side-con">
          <Logo />
          {showControlsOnNav ? (
            <Aux>
              <Link className={navLinkClasses.join(" ")} to="/">
                Home
              </Link>
              <Link className={navLinkClasses.join(" ")} to="/">
                Newest
              </Link>
            </Aux>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="right-side-con">
        {showControlsOnNav ? <Search /> : ""}

        {darkThemeState ? (
          <BsFillSunFill
            className="nav-icon light"
            onClick={() => changeThemeLocal(false)}
          />
        ) : (
          <BsFillMoonFill
            className="nav-icon dark"
            onClick={() => changeThemeLocal(true)}
          />
        )}
      </div>
    </div>
  );
};

export default navigation;
