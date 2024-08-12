import React, { useState } from "react";
import { Loader } from "@components/Loader/Loader";
import { MoviesList } from "@modules/MoviesList";
import { useGetTrendingMoviesQuery } from "@store/moviesApi";
import classes from "./styles.module.scss";

export const TrendingMovies = () => {
    const {
        data: { results: movies } = {},
        isError,
        isLoading,
    } = useGetTrendingMoviesQuery();
    const [page, setPage] = useState(1);

    return (
        <div className={classes.wrapper}>
            {isLoading && <Loader />}
            {isError && <h2>Error fetching data..</h2>}
            <h2>Trending movies</h2>
            <MoviesList movies={movies} />
        </div>
    );
};
