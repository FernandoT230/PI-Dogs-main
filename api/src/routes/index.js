const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const { getAllDogs } = require("../controllers/controllers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRouter = require("./dogs");
const temperamentRouter = require("./temperament");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/dogs/name", dogsRouter); //http://localhost:3001/dogs/name?name=""
router.use("/temperament", temperamentRouter);

//ruta para modularizar en el futuro (se me dificulta)
router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const allDogs = await getAllDogs();
  if (id) {
    let dogId = await allDogs.filter((dog) => dog.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Perrito con ese id no existe");
  }
});

router.get("/dog/", async (req, res) => {
  const temperament = req.query.temperament;
  const allDogs = await getAllDogs();

  const dogSearchResult = allDogs.filter((dog) => {
    if (temperament === "all") return allDogs;
    else if (dog.temperament) {
      return dog.temperament.toLowerCase().includes(temperament.toLowerCase());
    }
  });
  res.status(200).json(dogSearchResult);
});
//Exportamos el router configurado
module.exports = router;
