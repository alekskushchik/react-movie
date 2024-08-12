import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";
import { logIn } from "@helpers/index";
import { NotificationContext } from "../App";
import {
    useCreateAuthenticationTokenMutation,
    useAuthenticateMutation,
    useGetAccountInfoMutation,
} from "@store/authorizationApi";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { openNotification } = useContext(NotificationContext);

    const navigate = useNavigate();
    const [createAuthenticationToken] = useCreateAuthenticationTokenMutation();
    const [authenticate] = useAuthenticateMutation();
    const [getAccountInfo] = useGetAccountInfoMutation();

    const handleCreateAuthenticationToken = async () => {
        // Create a new authentication token
        const authenticationToken = await createAuthenticationToken();
        // Check if there is an error in the response
        if (
            authenticationToken?.error?.status &&
            authenticationToken?.error?.status !== 200
        ) {
            openNotification({
                type: "error",
                heading: "Error authenticate!",
                message: authenticationToken?.error?.data?.status_message,
            });
            return;
        }
        // Get the request token from the response
        const { request_token: requestToken } = authenticationToken.data;
        // Authenticate the user
        const res = await authenticate({ requestToken, username, password });

        // Check if there is an error in the response
        if (res?.error?.status && res?.error?.status !== 200) {
            openNotification({
                type: "error",
                heading: "Error authenticate!",
                message: res?.error?.data?.status_message,
            });
            return;
        }

        // Get the session id from the response
        const responseAccountInfo = await getAccountInfo();

        // Check if there is an error in the response
        if (
            responseAccountInfo?.error?.status &&
            responseAccountInfo?.error?.status !== 200
        ) {
            openNotification({
                type: "error",
                heading: "Error authenticate!",
                message: responseAccountInfo?.error?.data?.status_message,
            });
            return;
        }

        // Log in the user
        logIn(responseAccountInfo.data);

        openNotification({
            heading: `Hello, ${responseAccountInfo?.data?.username}!`,
        });
        setTimeout(() => {
            // Redirect the user to the popular page after successful login
            navigate("/popular");
        }, 0);
    };

    return (
        <div className="register-form-wrapper">
            Have not registered yet?{" "}
            <a href="https://www.themoviedb.org/signup">Sign Up</a>
            <h1>Log In</h1>
            <form action="submit">
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <FaUser />
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        inputMode="numeric"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FaKey />
                </div>
                <button
                    onClick={e => {
                        e.preventDefault();
                        handleCreateAuthenticationToken();
                    }}
                    disabled={!username || !password}
                >
                    Log In
                </button>
            </form>
        </div>
    );
};
