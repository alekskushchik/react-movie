import React, { useMemo } from "react";
import { getRandomColor } from "@helpers/index";
import classes from "@components/Avatar/Avatar.module.scss";

export const Avatar = ({ name, path }) => {
    const backgroundColor = useMemo(() => getRandomColor(), []);
    return (
        <div className={classes.avatarWrapper}>
            <div
                className={classes.avatar}
                style={{ backgroundColor }}
            >
                {path ? (
                    <img src={path} alt="" />
                ) : (
                    <span className={classes.username}>
                        {name ? name[0].toUpperCase() : ""}
                    </span>
                )}
            </div>
        </div>
    );
};
