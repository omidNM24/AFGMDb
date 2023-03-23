import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import { ImSearch } from "react-icons/im";
import { useDispatch } from "react-redux";
import { clearSearchParams } from "../../initialState";
import Aux from "../../hoc/Aux";

const search = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  // const validLetters = [
  //   1,
  //   2,
  //   3,
  //   4,
  //   5,
  //   6,
  //   7,
  //   8,
  //   9,
  //   "a",
  //   "b",
  //   "c",
  //   "d",
  //   "e",
  //   "f",
  //   "g",
  //   "h",
  //   "i",
  //   "j",
  //   "k",
  //   "l",
  //   "m",
  //   "n",
  //   "o",
  //   "p",
  //   "q",
  //   "r",
  //   "s",
  //   "t",
  //   "u",
  //   "v",
  //   "w",
  //   "x",
  //   "y",
  //   "z",
  // ];

  const clearParams = () => {
    dispatch(clearSearchParams());
  };

  const searchResponsiveConrtol = () => {
    document.querySelector(".search-container").style.display = "block";
    document.querySelector(".search-icon-control").style.display = "none";
  };

  return (
    <Aux>
      <ImSearch
        className="search-icon-control"
        onClick={searchResponsiveConrtol}
      />
      <div className="search-container">
        {data != "" ? (
          <Link
            className="search-btn-icon-con"
            to={data !== "" ? `/search/${data.toLowerCase()}/1` : "#"}
            onClick={() => clearParams()}
          >
            <button className="search-btn">
              <ImSearch className="search-icon" />
            </button>
          </Link>
        ) : null}
        <input
          className="search"
          type="text"
          onChange={(e) => {
            setData(e.target.value);
          }}
          onKeyDown={(key) => {
            if (key.key == "Enter") {
              const link = document.querySelector(".search-btn-icon-con");
              link ? link.click() : null;
              clearParams();
            }
          }}
          placeholder="Search Here..."
        />
      </div>
    </Aux>
  );
};

export default search;
