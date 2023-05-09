const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
    try { //Aqui le hago una peticion get a la api y luego me quedo solo con la data
      const temperamentApi = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
      );
      const temperament = temperamentApi.data // agarro la de la respuesta y me quedo la lista de todos los temperamentos unicos.
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
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;
