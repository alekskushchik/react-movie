import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import {
    useGetSingleMovieQuery,
    usePostLikeMovieMutation,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation,
} from "@store/singleMovieApi";
import { useGetFavoriteQuery } from "@store/moviesApi";
import { convertToHoursMinutes, getUser } from "@helpers/index";
import { Loader } from "@components/Loader/Loader";
import { Header } from "@components/Header/Header";
import classes from "./SingleMovie.module.scss";

export const SingleMovie = () => {
    const { movieId } = useParams();
    const { id: accountId } = getUser();

    const {
        data: {
            title,
            overview,
            backdrop_path,
            poster_path,
            budget,
            release_date,
            genres,
            production_companies,
            runtime,
            vote_average,
            vote_count,
        } = {},
        isLoading,
        refetch,
    } = useGetSingleMovieQuery(movieId);
    const [
        rateMovie, // This is the mutation trigger
    ] = usePostLikeMovieMutation();

    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFromFavoritesMutation();
    const { data: favouriteMovies } = useGetFavoriteQuery({ accountId });

    const { hours, remainingMinutes } = convertToHoursMinutes(runtime);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!favouriteMovies?.results || !favouriteMovies?.results.length)
            return;
        const isFavourite = favouriteMovies?.results.some(
            movie => movie.id === +movieId
        );
        setIsFavorite(isFavourite);
    }, [favouriteMovies, movieId]);

    const handleRateMovie = async () => {
        await rateMovie({ movieId, rating: 7 });
        refetch();
    };

    const handleAddToFavorites = async ({ accountId, movieId }) => {
        await addToFavorites({ accountId, movieId });
        setIsFavorite(true);
    };

    const handleRemoveFromFavorites = async ({ accountId, movieId }) => {
        await removeFromFavorites({ accountId, movieId });
        setIsFavorite(false);
    };

    return (
        <>
            <Header />

            <div
                className={classes.movieContainer}
                style={{
                    backgroundImage: `linear-gradient(rgb(0 0 0 / 0%) 0%, rgb(26 26 29 / 63.5%) 63.5%, rgb(26 26 29) 100%), url(https://image.tmdb.org/t/p/original${backdrop_path})`,
                }}
            >
                {isLoading && <Loader />}
                <div className={classes.movieContent}>
                    <div className={classes.moviePoster}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt="poster"
                        />
                    </div>
                    <div>
                        <p className={classes.title}>{title}</p>
                        <button
                            onClick={() =>
                                !isFavorite
                                    ? handleAddToFavorites({
                                          accountId,
                                          movieId,
                                      })
                                    : handleRemoveFromFavorites({
                                          accountId,
                                          movieId,
                                      })
                            }
                        >
                            <FaRegHeart color={isFavorite ? "red" : "white"} />
                            {"  "}
                            <span>
                                {!isFavorite
                                    ? "Add to favourites"
                                    : "Remove from favourites"}
                            </span>
                        </button>
                        <span onClick={handleRateMovie}>Rate movie</span>||
                        <span>{vote_average}</span>||
                        <span>{vote_count}</span>
                        <p>
                            <span className={classes.description}>
                                <strong>Overview: </strong>
                                {overview}
                            </span>
                        </p>
                        <p>${budget?.toLocaleString()}</p>
                        <p>{release_date}</p>
                        <div className={classes.genres}>
                            <p className={classes.genresHeading}>Genres</p>
                            <div className={classes.genresList}>
                                {genres?.map(genre => (
                                    <span
                                        key={genre.id}
                                        className={classes.genreItem}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={classes.productionCompanies}>
                            {production_companies?.map(company => (
                                <img
                                    key={company.id}
                                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                    className={classes.companyLogo}
                                    alt="company-logo"
                                />
                            ))}
                        </div>
                        <div>
                            <BsClock /> {hours && <span>{hours}h</span>}{" "}
                            {remainingMinutes && (
                                <span>{remainingMinutes}m</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
