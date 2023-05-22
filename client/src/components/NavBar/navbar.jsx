import React from "react";
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/searchbar'
import style from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav>
      <div className={style.navbar}>
        <Link to="/Home">
          <img
            src="https://storage.needpix.com/rsynced_images/dog-41431_1280.png"
            alt="word"
            width="150px"
            height="70px"
          />
        </Link>
        <div className={style.navbar__options}>
          <SearchBar />
          <Link className={style.navbar__link} to="/Form">
            Create Dog
          </Link>
        </div>
      </div>
    </nav>
  );
}
