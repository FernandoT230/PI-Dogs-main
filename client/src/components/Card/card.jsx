import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

const Card = ({ dog }) => {
  if (dog.created_in_db) {
    return (
      <div className={style.card}>
        <Link to={`/Home/${dog.id}`}>
          <img src={dog.image} alt={dog.name} className={style.image} />
          <h3>{dog.name}</h3>
        </Link>
        <p>Temperaments: {dog.temperaments.map(temp => temp.name).join(", ")}</p>
        <p>Weight: {dog.weight} kg</p>
      </div>
    );
  }

  return (
    <div className={style.card}>
      <Link to={`/Home/${dog.id}`}>
        <img src={dog.image} alt={dog.name} className={style.image} />
        <h3>{dog.name}</h3>
      </Link>
      <p>Temperaments: {dog.temperament}</p>
      <p>Weight: {dog.weight.metric} kg</p>
    </div>
  );
};

export default Card;
