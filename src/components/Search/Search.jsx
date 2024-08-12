import React from "react";
import { IoIosSearch } from "react-icons/io";
import classes from "@components/Search/Search.module.scss";

export const Search = ({ value, onChange, onSearch }) => {
    return (
        <form className={classes.searchContainer} onSubmit={onSearch}>
            <IoIosSearch size={26} className={classes.searchIcon} />
            <input type="text" value={value} onChange={onChange} />
        </form>
    );
};
