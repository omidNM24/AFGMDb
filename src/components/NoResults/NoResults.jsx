import React from "react";
import "./NoResults.css";

const noResults = (props) => {
  return (
    <div className="no-results-con">
      <h1 className="oops-title">Ooops!</h1>
      <h1 className="no-results-title">
        We couldn't find any matches for "{props.search}"
      </h1>
      {props.showQuality ? (
        <h1 className="no-results-title">
          With quality of "{props.paramsData.quality}"
        </h1>
      ) : (
        ""
      )}

      {props.paramsData.genres !== [] ? (
        <h1 className="no-results-title">
          And with genres of "{props.paramsData.genres.join(" ")}"
        </h1>
      ) : (
        ""
      )}

      <p className="no-results-paragraph">Check your search for typos</p>
    </div>
  );
};

export default noResults;
