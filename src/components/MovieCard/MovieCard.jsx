import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "@components/MovieCard/MovieCard.module.scss";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/movie/${movie.id}`);

  return (
    <div className={classes.moviecard} onClick={handleClick}>
      <p className={classes.moviecard__title}>{movie.title}</p>
      <div className={classes.moviecard__poster}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" />
      </div>
      <p>
        <strong>Overview:</strong>
        <span>{movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}</span>
      </p>
    </div>
  );
};
