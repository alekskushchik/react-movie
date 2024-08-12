import React, { useEffect } from "react";
import { useGetFavoriteQuery } from "@store/moviesApi";
import { MoviesList } from "@modules/MoviesList";
import { Loader } from "@components/Loader/Loader";
import { Header } from "@components/Header/Header";
import { getUser } from "@helpers/index";
import classes from "./styles.module.scss";

export const FavoriteMovies = () => {
    const { id: accountId } = getUser();
    const {
        data: movies,
        isLoading,
        isError,
        refetch,
    } = useGetFavoriteQuery({ accountId });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className={classes.wrapper}>
            <Header />
            {isLoading && <Loader />}
            {isError && <h2>Error fetching data..</h2>}
            <h2>My Favorite Movies</h2>
            <MoviesList movies={movies?.results || []} />
        </div>
    );
};
