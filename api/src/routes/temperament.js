const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const temperamentApi = await axios.get(
    "https://api.thedogapi.com/v1/breeds"
  );
  const temperament = temperamentApi.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
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
});

module.exports = router;
