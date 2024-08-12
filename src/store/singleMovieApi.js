import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiConfig } from "@helpers";

export const singleMovieApi = createApi({
    reducerPath: "singleMovieApi",
    baseQuery: fetchBaseQuery(getApiConfig()),
    tagTypes: ["SingleMovie"],
    endpoints: builder => ({
        getSingleMovie: builder.query({
            query: movieId => `movie/${movieId}`,
            keepUnusedDataFor: 0.001,
        }),
        postLikeMovie: builder.mutation({
            query: ({ movieId, rating }) => ({
                url: `movie/${movieId}/rating`,
                method: "POST",
                body: {
                    value: rating,
                },
            }),
        }),
        addToFavorites: builder.mutation({
            query: ({ accountId, movieId }) => ({
                url: `account/${accountId}/favorite`,
                method: "POST",
                body: {
                    media_type: "movie",
                    media_id: movieId,
                    favorite: true,
                },
            }),
        }),
        removeFromFavorites: builder.mutation({
            query: ({ accountId, movieId }) => ({
                url: `account/${accountId}/favorite`,
                method: "POST",
                body: {
                    media_type: "movie",
                    media_id: movieId,
                    favorite: false,
                },
            }),
        }),
    }),
});

export const {
    useGetSingleMovieQuery,
    usePostLikeMovieMutation,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation,
} = singleMovieApi;
