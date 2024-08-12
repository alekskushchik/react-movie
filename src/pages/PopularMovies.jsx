import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MoviesList } from "@modules/MoviesList";
import { useGetMoviesQuery, selectorMoviesResults } from "@store/moviesApi";
import { Loader } from "@components/Loader/Loader";
import { Header } from "@components/Header/Header";
import classes from "./styles.module.scss";

export const PopularMovies = () => {
    const [page, setPage] = useState(1);
    const movies = useSelector(selectorMoviesResults);
    const { isError, isLoading } = useGetMoviesQuery({ type: "popular", page });

    const handleShowMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className={classes.wrapper}>
            <Header />
            {isLoading && <Loader />}
            {isError && <h2>Error fetching data..</h2>}
            <h2>Popular Movies</h2>
            <MoviesList movies={movies} />
            <div className={classes.btnWrapper}>
                {!isLoading && (
                    <button onClick={handleShowMore}>Show more</button>
                )}
            </div>
        </div>
    );
};
