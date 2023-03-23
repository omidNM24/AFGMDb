import React from "react";
import "./Footer.css";
import Logo from "../../components/Logo/Logo";
import { useSelector } from "react-redux";

const footer = () => {
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  const year = new Date().getFullYear();
  return (
    <div
      className={`footer-container ${
        darkTheme ? "footer-container-dark" : "footer-container-light"
      }`}
    >
      <div className="logo-and-copyright-con">
        <Logo />
        <p className="copyright">
          &copy; copyright {year} all rights reserved by{" "}
          <span className="bold">Omid Nomani</span>.
        </p>
      </div>
      <div className="contact-container">
        <h2 className="contact-title">Contact me:</h2>
        <a
          className={`contact ${darkTheme ? "contact-dark" : "contact-light"}`}
          href="https://github.com/omidNM24"
          target="_blank"
        >
          Github
        </a>
        <a
          className={`contact ${darkTheme ? "contact-dark" : "contact-light"}`}
          href="mailto:omidnomani24@gmail.com"
          type="email"
        >
          Gmail
        </a>
      </div>
    </div>
  );
};

export default footer;
