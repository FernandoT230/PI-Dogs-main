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
            src="https://media.tenor.com/ANkkU3PfWuQAAAAd/dog.gif"
            alt="word"
            width="150px"
            height="70px"
          />
        </Link>
        <div className={style.navbar__options}>
          <SearchBar />
          <Link className={style.navbar__link} to="/">
            Create Dog
          </Link>
          <Link className={style.navbar__link} to="/">
            Dogs List
          </Link>
        </div>
      </div>
    </nav>
  );
}
