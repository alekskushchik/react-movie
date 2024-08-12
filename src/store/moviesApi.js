import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiConfig } from "@helpers";

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery(getApiConfig()),
    tagTypes: ["Movies"],
    endpoints: builder => ({
        getMovies: builder.query({
            query: ({ type, page }) => `movie/${type}?page=${page}`,
        }),
        getTrendingMovies: builder.query({
            query: () => `trending/movie/day`,
        }),
        searchMovies: builder.query({
            query: ({ query, page }) =>
                `search/movie?query=${query}&page=${page}`,
        }),
        getFavorite: builder.query({
            query: ({ accountId }) => `account/${accountId}/favorite/movies`,
        }),
    }),
});

export const selectorMoviesResults = state => {
    const arr = Object.entries(state.moviesApi.queries);
    const results = arr?.reduce((acc, [key, value]) => {
        if (key.includes("getMovies") && value?.data?.results) {
            acc = [...acc, ...value?.data?.results];
        }

        return acc;
    }, []);

    return results;
};

export const {
    useGetMoviesQuery,
    useGetTrendingMoviesQuery,
    useSearchMoviesQuery,
    useGetFavoriteQuery,
} = moviesApi;
