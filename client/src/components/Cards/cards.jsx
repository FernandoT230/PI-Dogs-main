import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperamentsList,
  filterDogsByTemperament,
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

  const [sortWeight, setSortWeight] = useState(""); // Nuevo estado para el filtrado por peso
  const [filteredDogs, setFilteredDogs] = useState([]); // Nuevo estado para almacenar los perros filtrados

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

  const handleFilterWeight = (ele) => {
    const weight = ele.target.value;
    setSortWeight(weight);
    setCurrentPage(1);
    if (weight === "") {
      setFilteredDogs([]); // Si no se selecciona un peso, se muestra la lista completa de perros
    } else {
      const filtered = allDogs.filter((dog) => {
        // Filtrar los perros según el peso
        if (weight === "light") {
          return dog.weight.metric < 10;
        } else if (weight === "medium") {
          return dog.weight.metric >= 10 && dog.weight.metric < 20;
        } else if (weight === "heavy") {
          return dog.weight.metric >= 20;
        }
      });
      setFilteredDogs(filtered);
    }
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperamentsList());
  }, [dispatch]);

  // Si hay perros filtrados, se utiliza la lista filtrada; de lo contrario, se utiliza la lista completa de perros
  const dogsToDisplay = filteredDogs.length > 0 ? filteredDogs : currentDogs;

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
        <select className={style.select} onChange={handleFilterWeight}>
          <option value="">Filter by Weight</option>
          <option value="light">Light (Less than 10 kg)</option>
          <option value="medium">Medium (10-20 kg)</option>
          <option value="heavy">Heavy (More than 20 kg)</option>
        </select>
      </div>
      <div className={style.cardsContainer}>
        {dogsToDisplay.map((dog) => (
          <Card key={dog.id} dog={dog} />
        ))}
      </div>
      <div className={style.pagination}>
        {currentPage > 1 && (
          <button className={style.button} onClick={() => paginate(currentPage - 1)}>Prev</button>
        )}
        {currentPage < Math.ceil(allDogs.length / dogsPerPage) && (
          <button className={style.button} onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}
