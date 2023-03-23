import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import SlideMenu from "../SlideMenu/SlideMenu";
import "./ErrorPage.css";
import Aux from "../../hoc/Aux";
import Navigation from "../../containers/Navigation/Navigation";

const errorPage = (props) => {
  const error = useRouteError();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Aux>
      <Navigation />
      <SlideMenu />
      <div className="errorPage-con-container">
        <h1 className="bg-code">{error.status}</h1>
        <div className="errorPage-con">
          <h1 className="errorPage-title">Something went wrong!</h1>
          <p className="errorPage-instruction">Try going back!</p>
          <button className="goBack-btn" onClick={goBack}>
            Go Back
          </button>
        </div>
      </div>
    </Aux>
  );
};

export default errorPage;
