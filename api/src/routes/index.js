const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogsRouter = require("./dogs");
const temperamentRouter = require("./temperament");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/dogs/name", dogsRouter);
router.use("/temperament", temperamentRouter);

//Exportamos el router configurado

module.exports = router;
