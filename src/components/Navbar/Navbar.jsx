import React from "react";
import { Link } from "react-router-dom";
import classes from "@components/Navbar/Navbar.module.scss";

export const Navbar = ({ menuItems }) => {

    return (
        <ul className={classes.menu}>
            {menuItems.map(menuItem => (
                <li  key={menuItem.id} className={classes.menuItem}>
                    <Link to={menuItem.link} className={classes.menuItem__link} >
                        {menuItem.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
