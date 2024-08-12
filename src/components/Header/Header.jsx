import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/icons/logo.svg?react";
import { Navbar } from "@components/Navbar";
import { Avatar } from "@components/Avatar/Avatar";
import { getUser, logOut } from "@helpers/index";
import classes from "@components/Header/Header.module.scss";

const menu = [
    { id: 0, name: "Popular", link: "/popular" },
    { id: 1, name: "Now Playing", link: "/now_playing" },
    { id: 2, name: "Top Rated", link: "/top_rated" },
    { id: 3, name: "Upcoming", link: "/upcoming" },
    { id: 4, name: "Favorite", link: "/favorite" },
];

export const Header = () => {
    const user = getUser();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut();
        navigate("/login");
    };

    return (
        <header className={classes.headerWrapper}>
            <div className={classes.contentWrapper}>
                <div className={classes.logo}>
                    <Link to="/">
                        <Logo width={150} />
                    </Link>
                </div>
                <div className={classes.contentRight}>
                    <Navbar menuItems={menu} />
                    <Avatar
                        name={user?.name}
                        path={user?.avatar?.tmdb?.avatar_path}
                    />
                    <button onClick={handleLogOut}>Log out</button>
                </div>
            </div>
        </header>
    );
};
