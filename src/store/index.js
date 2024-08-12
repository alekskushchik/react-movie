import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesApi } from "./moviesApi";
import { singleMovieApi } from "./singleMovieApi";
import { authorizationApi } from "./authorizationApi";

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [singleMovieApi.reducerPath]: singleMovieApi.reducer,
        [authorizationApi.reducerPath]: authorizationApi.reducer,
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware(),
        moviesApi.middleware,
        singleMovieApi.middleware,
        authorizationApi.middleware,
    ],
    devTools: true,
});

setupListeners(store.dispatch);
