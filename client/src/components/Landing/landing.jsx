import React from "react";
import { Link } from "react-router-dom";
import style from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={style.landingPage}>
      <img
       src="https://media.tenor.com/WMc9vqv7KNkAAAAd/cheems-doge.gif"
       alt="dog" 
       className={style.gif}/>
      <div className={style.landing__box}>
      <h1 className={style.landing__title}>
          Welcome <br /> to my <br /> <span className={style.dogsText}>Dogs</span> Page
        </h1>
      </div>
      <Link className={style.link} to="/Home">
        <button className={style.landing__button}>Start</button>
      </Link>
    </div>
  );
}
