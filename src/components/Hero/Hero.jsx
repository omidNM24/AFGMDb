import React, { useEffect, useState } from "react";
import Navigation from "../../containers/Navigation/Navigation";
import { Link } from "react-router-dom";
import Aux from "../../hoc/Aux";
import axios from "axios";
import "./Hero.css";
import { useSelector } from "react-redux";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import ShowButton from "../SearchReslutsControls/Button/ShowButton";
import YtVideo from "../YtVideo/YtVideo";

const hero = (props) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [torrentUrlG, setTorrentUrlG] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const selectedMovie = useSelector((state) => state.mainState.selectedMovie);
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  const [quality, setQuality] = useState("");
  const [showYtVideo, setShowYtVideo] = useState(false);

  useEffect(() => {
    if (selectedMovie) {
      setTorrentUrlG(selectedMovie.torrents[0].url);
      setQuality(selectedMovie.torrents[0].quality);
    }
  }, []);

  const descriptionManage =
    selectedMovie !== "" ? (
      selectedMovie.description_full.toString().length >= 300 ? (
        <Aux>
          <p
            className={`hero-desc ${
              darkTheme ? "hero-desc-dark" : "hero-desc-light"
            }`}
          >
            {showFullDesc
              ? selectedMovie.description_full
              : selectedMovie.description_full.slice(0, 200) + "..."}
            <button
              className={`show-toggle-btn ${
                darkTheme ? "show-toggle-btn-dark" : "show-toggle-btn-light"
              }`}
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? "Show less" : "Show more"}
            </button>
          </p>
        </Aux>
      ) : (
        <p className="hero-desc">{selectedMovie.description_full}</p>
      )
    ) : (
      ""
    );

  let torrentUrls = [];

  if (selectedMovie.torrents !== undefined) {
    for (let i = 0; i <= selectedMovie.torrents.length; i++) {
      selectedMovie.torrents[i] !== undefined
        ? torrentUrls.push(selectedMovie.torrents[i])
        : null;
    }
  }

  const torrentQualityData = selectedMovie.torrents
    ? torrentUrls.map((torrentUrl, i) => {
        return (
          <div
            className={`dropdown-quality-con  ${
              torrentUrlG == torrentUrl.url ? "dropdown-quality-con-active" : ""
            }`}
            onClick={() => {
              setQuality(torrentUrl.quality);
              setTorrentUrlG(torrentUrl.url);
            }}
            key={torrentUrl.quality + i}
          >
            <li className="dropdown-child">{torrentUrl.quality}</li>
            <div className="download-data-con">
              <p className="download-data">Size: {torrentUrl.size}</p>
              <p className="download-data">
                Se: {torrentUrl.seeds} | Le: {torrentUrl.peers}
              </p>
            </div>
          </div>
        );
      })
    : null;

  const runtimeHourManage =
    selectedMovie !== ""
      ? String(selectedMovie.runtime / 60).slice(0, 1)
      : null;
  const runtimeMinuteManage =
    selectedMovie !== ""
      ? Math.round(String(selectedMovie.runtime / 60).slice(1, 4) * 60)
      : null;
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
  return selectedMovie ? (
    <div
      className={`hero-main-container ${darkTheme ? "con-dark" : "con-light"}`}
      style={
        screenWidth > 600
          ? {
              backgroundImage: `url('${selectedMovie.background_image}')`,
              backgroundSize: "cover",
            }
          : {
              backgroundImage: "none",
            }
      }
    >
      {showYtVideo ? (
        <YtVideo
          code={selectedMovie.yt_trailer_code}
          clicked={() => setShowYtVideo(false)}
        />
      ) : null}
      <div
        className={`hero-container ${
          darkTheme ? "hero-container-dark" : "hero-container-light"
        }`}
        style={
          screenWidth < 600
            ? {
                backgroundImage: `url('${selectedMovie.large_cover_image}')`,
                backgroundSize: "cover",
              }
            : { backgroundImage: "none" }
        }
      >
        <div className="details-side">
          <div
            className={`details-side-child ${
              darkTheme ? "details-side-child-dark" : "details-side-child-light"
            }`}
          >
            <div className="details-container">
              <div className="title-con">
                <h1 className="hero-title">
                  {selectedMovie.title_english}
                  {selectedMovie.mpa_rating ? (
                    <span
                      className={`age-rate-hero ${
                        darkTheme ? "age-rate-hero-dark" : "age-rate-hero-light"
                      }`}
                    >
                      {selectedMovie.mpa_rating}
                    </span>
                  ) : null}
                </h1>
              </div>
              {descriptionManage}
              <p className="hero-detail-paragraph">
                <BsSuitHeartFill className="icon heart" /> Rating:{" "}
                {selectedMovie.rating}
              </p>
              <p className="hero-detail-paragraph">
                <BsFillClockFill className="icon clock" /> Year:{" "}
                {selectedMovie.year}
              </p>
              <p className="hero-detail-paragraph">
                <FaTheaterMasks className="icon genres" /> Genres:{" "}
                {selectedMovie.genres.join(" | ")}
              </p>
              <p className="hero-detail-paragraph">
                <FaHourglassHalf className="icon duration" /> Duration:{" "}
                {`${runtimeHourManage} hr ${runtimeMinuteManage} min`}
              </p>
              <div className="download-btn-all-main-con">
                <div className="download-btn-all-con">
                  <div className="download-btn-con">
                    <Link className="download-btn-link" to={torrentUrlG}>
                      <button className="download-btn">Download Torrent</button>
                    </Link>
                  </div>
                  <div
                    className="dropdown-container"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div className="dropdown-select">{quality}</div>
                    {showDropdown ? (
                      <div className="dropdown-children-container">
                        <ul className="dropdown-children slideIn">
                          {torrentQualityData}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {selectedMovie.yt_trailer_code !== "" ? (
                  <p
                    className={`trailer-btn-link ${
                      darkTheme
                        ? "trailer-btn-link-dark"
                        : "trailer-btn-link-light"
                    }`}
                    onClick={() => {
                      setShowYtVideo(!showYtVideo);
                      scroll(0, 0);
                    }}
                  >
                    Watch Trailer
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="image-side">
          <img
            className="hero-movie-image"
            src={selectedMovie.large_cover_image}
            alt="The movie image"
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default hero;
