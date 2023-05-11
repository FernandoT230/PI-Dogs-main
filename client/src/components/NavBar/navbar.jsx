import React from "react";
import { Link } from "react-router-dom";
//import SearchBar from '../SearchBar/searchbar'
import style from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav>
      <div className={style.navbar}>
        <Link to="/Home">
          <img
            src="https://i0.wp.com/piziadas.com/wp-content/uploads/2012/12/noche.gif?resize=300%2C240"
            alt="word"
            width="150px"
            height="70px"
          />
        </Link>
        <div className={style.navbar__options}>
          
          <Link className={style.navbar__link} to="/">
            Create Activity
          </Link>
          <Link className={style.navbar__link} to="/">
            Activities List
          </Link>
        </div>
      </div>
    </nav>
  );
}