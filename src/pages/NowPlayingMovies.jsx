import React, { useState } from "react";
import { MoviesList } from "@modules/MoviesList";
import { useGetMoviesQuery } from "@store/moviesApi";
import { Loader } from "@components/Loader/Loader";
import { Header } from "@components/Header/Header";
import classes from "./styles.module.scss";

export const NowPlayingMovies = () => {
    const [page, setPage] = useState(1);

    const {
        data: { results: movies } = {},
        isError,
        isLoading,
    } = useGetMoviesQuery({ type: "now_playing", page });

    return (
        <div className={classes.wrapper}>
            <Header />
            {isLoading && <Loader />}
            {isError && <h2>Error fetching data..</h2>}
            <h2>Now Playing Movies</h2>
            <MoviesList movies={movies} />
        </div>
    );
};
