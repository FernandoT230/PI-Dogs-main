const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const router = Router();

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

module.exports = {
    getAllDogs,
    getApiInfo,
    getDbInfo
}