const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require("dotenv").config();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiDogs = await apiURL.data.map((dog) => {
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      temperament: dog.temperament,
      weight: dog.weight,
      life_span: dog.life_span,
      temperamentCC: dog.temperament,
    };
  });
  return apiDogs;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

//Ahora los GET y POST

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllDogs();
  if (name) {
    let dogName = await dogsTotal.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res
          .status(404)
          .send("Cann't find the dog with the name you are looking for");
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/temperament", async (req, res) => {
  const temperamentApi = await axios.get(
    "https://api.thedogapi.com/v1/breeds"
  );
  const temperament = temperamentApi.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog.split(", "));
  let eachTemperament = [...new Set(temperament.flat())];
  eachTemperament.forEach((el) => {
    if (el) {
      Temperament.findOrCreate({
        where: { name: el },
      });
    }
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});

module.exports = router;
