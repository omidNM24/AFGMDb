import React, { useEffect } from "react";
import axios from "axios";
import { BsCaretDownFill } from "react-icons/bs";
import "./Comments.css";
import { useSelector } from "react-redux";

const comments = () => {
  const selectedMovie = useSelector((state) => state.mainState.selectedMovie);

  useEffect(() => {
    console.log(selectedMovie.id);
    axios
      .get(
        `https://yts.mx/api/v2/movie_comments.json?movie_id=${selectedMovie.id}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [selectedMovie.id]);

  const comment = <div>comment</div>;
  return (
    <div className="comments-con">
      {comment}
      <div className="comments-con-bar">
        <p className="show-comments-title">
          Show Comments <BsCaretDownFill className="comments-down-icon" />
        </p>
      </div>
    </div>
  );
};

export default comments;
