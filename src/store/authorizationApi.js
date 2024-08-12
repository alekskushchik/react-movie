import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiConfig } from "@helpers";

const REQUEST_TOKEN_URL = "/authentication/token/new";
const LOGIN_URL = "/authentication/token/validate_with_login";
const ACCOUNT_INFO_URL = "/account";

export const authorizationApi = createApi({
    reducerPath: "authorizationApi",
    baseQuery: fetchBaseQuery(getApiConfig()),
    endpoints: builder => ({
        createAuthenticationToken: builder.mutation({
            query: () => REQUEST_TOKEN_URL,
            method: "GET",
        }),
        authenticate: builder.mutation({
            query: ({ requestToken, username, password }) => ({
                url: LOGIN_URL,
                method: "POST",
                body: { request_token: requestToken, username, password },
            }),
        }),
        getAccountInfo: builder.mutation({
            query: () => ({
                url: `${ACCOUNT_INFO_URL}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCreateAuthenticationTokenMutation,
    useAuthenticateMutation,
    useGetAccountInfoMutation,
} = authorizationApi;
