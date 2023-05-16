const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const filteredTemperaments = await Temperament.findAll({
        where: {
          name: name,
        },
      });
      res.send(filteredTemperaments);
    } else {
      const temperamentApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`
      );
      const temperament = temperamentApi.data
        .map((dog) => (dog.temperament ? dog.temperament : "No hay info"))
        .map((dog) => dog.split(", "));
      let eachTemperament = [...new Set(temperament.flat())];
      eachTemperament.forEach(async (el) => {
        if (el) {
          await Temperament.findOrCreate({
            where: { name: el },
          });
        }
      });
      const allTemperaments = await Temperament.findAll();
      res.send(allTemperaments);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
