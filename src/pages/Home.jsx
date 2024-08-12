import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Header } from "@components/Header/Header";
import { Loader } from "@components/Loader/Loader";
import { Search } from "@components/Search";
import { MoviesList } from "@modules/MoviesList";
import { moviesApi } from "@store/moviesApi";
import { TrendingMovies } from "./TrendingMovies";

export const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();

    const onSearchChange = e => {
        setSearchValue(e.target.value);
    };

    const onSearchSubmit = async e => {
        e.preventDefault();
        if (searchValue) {
            const promise = dispatch(
                moviesApi.endpoints.searchMovies.initiate({
                    query: searchValue,
                    page: 1,
                })
            );
            const {
                data: { results: movies = [] },
                isLoading,
                isError,
            } = await promise;
            setMovies(movies);
            setIsError(isError);
            setIsLoading(isLoading);
            setSearchValue("");
        }
    };

    return (
        <>
            <Header />
            {isLoading && <Loader />}
            {isError && <h2>Error fetching data..</h2>}
            <Search
                value={searchValue}
                onChange={onSearchChange}
                onSearch={onSearchSubmit}
            />
            {movies.length ? (
                <MoviesList movies={movies} />
            ) : (
                <>
                    <TrendingMovies />
                </>
            )}
        </>
    );
};
