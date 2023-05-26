import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  orderByName,
  filterCreated,
  filterDogsByMAXWeight,
  filterDogsByMINWeight,
  orderByWeight,
} from "../../redux/actions.js";
import style from "./cards.module.css";
import Card from "../Card/card";

// Declaración de variables y estados
export default function Cards() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments).sort((a, b) =>
    a < b ? -1 : 1
  );

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastDog = currentPage * dogsPerPage;
  const firstDog = lastDog - dogsPerPage;
  const currentDogs = allDogs.slice(firstDog, lastDog);
  const [, setOrden] = useState("");

  const [showAllDogs, setShowAllDogs] = useState(true);


  // Funciones y efectos
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const reloadButton = (ele) => {
    ele.preventDefault();
    dispatch(getAllDogs());
  };

  const handleFilterTemperament = (ele) => {
    dispatch(filterDogsByTemperament(ele.target.value));
    setCurrentPage(1);
  };

  const handleSort = (ele) => {
    ele.preventDefault();
    dispatch(orderByName(ele.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${ele.target.value}`);
  };

  const handleClickOrderWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
  };

  const handleFilterCreated = (value) => {
    dispatch(filterCreated(value));
    setShowAllDogs(value === "all");
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperamentsList());
  }, [dispatch]);

// Renderizado de elementos

  const dogsToDisplay = showAllDogs
    ? currentDogs
    : allDogs.filter((dog) => dog.created_in_db);

  return (
    <div className={style.background}>
      <div>
        <button className={style.button} onClick={reloadButton}>
          Reload
        </button>
        <select className={style.select} onChange={handleFilterTemperament}>
          <option value="">All Temperaments</option>
          {temperaments.map((temperament) => (
            <option key={temperament} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
        <select className={style.select} onChange={handleSort}>
          <option value="">Sort by</option>
          <option value="asc">Alphabetical (A-Z)</option>
          <option value="desc">Alphabetical (Z-A)</option>
        </select>
        <select
          className={style.select}
          onChange={(e) => handleClickOrderWeight(e)}
        >
          <option defaultValue value="all" hidden>
            Order
          </option>
          <option value="asc">Heaviest 1º</option>
          <option value="desc">Lightest 1º</option>
        </select>
        <button className={style.button} onClick={() => handleFilterCreated("all")}>
          Show All Dogs
        </button>
        <button className={style.button} onClick={() => handleFilterCreated("created")}>
          Show Only Created Dogs
        </button>
      </div>
      <div className={style.cardsContainer}>
        {dogsToDisplay.map((dog) => (
          <Card key={dog.id} dog={dog} />
        ))}
      </div>
      <div className={style.pagination}>
        {currentPage > 1 && (
          <button
            className={style.button}
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>
        )}
        {currentPage < Math.ceil(allDogs.length / dogsPerPage) && (
          <button
            className={style.button}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
