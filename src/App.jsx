import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { notification } from "antd";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { PopularMovies } from "./pages/PopularMovies";
import { FavoriteMovies } from "./pages/FavoriteMovies";
import { NowPlayingMovies } from "./pages/NowPlayingMovies";
import { TopRatedMovies } from "./pages/TopRatedMovies";
import { UpcomingMovies } from "./pages/UpcomingMovies";
import { SingleMovie } from "./pages/SingleMovie";
import { ProtectedRoute } from "@components/ProtectedRoute/ProtectedRoute";
import "./App.css";

const createRouter = (user) => {
    return createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            ),
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/popular",
            element: (
                <ProtectedRoute>
                    <PopularMovies />
                </ProtectedRoute>
            ),
        },
        {
            path: "/favorite",
            element: (
                <ProtectedRoute>
                    <FavoriteMovies />
                </ProtectedRoute>
            ),
        },
        {
            path: "/now_playing",
            element: (
                <ProtectedRoute>
                    <NowPlayingMovies />
                </ProtectedRoute>
            ),
        },
        {
            path: "/top_rated",
            element: (
                <ProtectedRoute>
                    <TopRatedMovies />
                </ProtectedRoute>
            ),
        },
        {
            path: "/upcoming",
            element: (
                <ProtectedRoute>
                    <UpcomingMovies />
                </ProtectedRoute>
            ),
        },
        {
            path: "/movie/:movieId",
            element: (
                <ProtectedRoute>
                    <SingleMovie />
                </ProtectedRoute>
            ),
        },
    ]);
};

export const NotificationContext = React.createContext();

function App() {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = ({
        position = "topRight",
        type = "success",
        heading = `Hello, user!`,
        message,
    } = {}) => {
        api[type]({
            message: heading,
            description: message,
            placement: position,
        });
    };

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {contextHolder}

            <main className="container">
                <RouterProvider router={createRouter()} />
            </main>
        </NotificationContext.Provider>
    );
}

export default App;
