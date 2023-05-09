const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { getAllDogs } = require('../controllers/controllers');

const router = Router();

//Endpoint para obtener todos los perros
router.get("/", async (req, res) => {
    try {
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
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  

module.exports = router;
