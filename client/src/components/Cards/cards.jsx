import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  //getDogsByName,
  //filterCreated,
  orderByName,
} from "../../redux/actions.js";
import style from "./cards.module.css";
import Card from "../Card/card";

export default function Cards() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const lastDog = currentPage * dogsPerPage;
  const firstDog = lastDog - dogsPerPage;
  const currentDogs = allDogs.slice(firstDog, lastDog);
  const [, setOrden] = useState("");

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

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperamentsList());
  }, [dispatch]);

  return (
    <div>
      <div>
        <button onClick={reloadButton}>Reload</button>
        <select onChange={handleFilterTemperament}>
          <option value="">All Temperaments</option>
          {temperaments.map((temperament) => (
            <option key={temperament} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
        <select onChange={handleSort}>
          <option value="">Sort by</option>
          <option value="asc">Alphabetical (A-Z)</option>
          <option value="desc">Alphabetical (Z-A)</option>
        </select>
      </div>
      <div className={style.cardsContainer}>
        {currentDogs.map((dog) => (
          <Card key={dog.id} dog={dog} />
        ))}
      </div>
      <div className={style.pagination}>
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Prev</button>
        )}
        {currentPage < Math.ceil(allDogs.length / dogsPerPage) && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
