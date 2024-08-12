import React from "react";
import { MovieCard } from "@components/MovieCard/MovieCard";
import classes from "@modules/MoviesList/MoviesList.module.scss";

export const MoviesList = ({ movies }) => {
    return (
        <div className={classes.moviesList}>
            {movies?.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};
