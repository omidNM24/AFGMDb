import React from "react";
import "./YtVideo.css";
import { CgClose } from "react-icons/cg";

const ytVideo = (props) => {
  return (
    <div className="yt-video-container">
      <div className="close-icon-con">
        <CgClose className="close-icon" onClick={props.clicked} />
      </div>
      <iframe
        className="yt-video"
        src={`https://www.youtube.com/embed/${props.code}`}
      ></iframe>
    </div>
  );
};

export default ytVideo;
