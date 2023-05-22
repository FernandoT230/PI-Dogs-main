import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperamentsList } from "../../redux/actions.js";
import { useHistory } from "react-router-dom";
import style from "./createdog.module.css";

export default function DogCrate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    lifeSpan: "",
    selectedTemperaments: [],
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  let history = useHistory();
  const handleClickss = () => {
    history.push("/Home/");
  };

  const handleTemperamentChange = (event) => {
    const selectedOptions = event.target.options;
    const selectedTemperaments = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].selected) {
        selectedTemperaments.push(selectedOptions[i].value);
      }
    }
    setFormData({
      ...formData,
      selectedTemperaments: selectedTemperaments,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.image.trim()) {
      errors.image = "Image URL is required";
      isValid = false;
    }

    if (!formData.minWeight.trim() || !formData.maxWeight.trim()) {
      errors.weight = "Weight is required";
      isValid = false;
    } else if (
      parseInt(formData.minWeight) > parseInt(formData.maxWeight) ||
      parseInt(formData.maxWeight) < parseInt(formData.minWeight)
    ) {
      errors.weight = "Invalid weight range";
      isValid = false;
    }

    if (!formData.minHeight.trim() || !formData.maxHeight.trim()) {
      errors.height = "Height is required";
      isValid = false;
    } else if (
      parseInt(formData.minHeight) > parseInt(formData.maxHeight) ||
      parseInt(formData.maxHeight) < parseInt(formData.minHeight)
    ) {
      errors.height = "Invalid height range";
      isValid = false;
    }

    if (!formData.lifeSpan.trim()) {
      errors.lifeSpan = "Life span is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const newDog = {
        name: formData.name,
        image: formData.image,
        weight: `${formData.minWeight} - ${formData.maxWeight}`,
        height: `${formData.minHeight} - ${formData.maxHeight}`,
        life_span: formData.lifeSpan,
        temperament: formData.selectedTemperaments.join(", "),
        createdInDb: true,
      };

      dispatch(postDog(newDog))
        .then(() => {
          // Reset form fields on successful submission
          setFormData({
            name: "",
            image: "",
            minWeight: "",
            maxWeight: "",
            minHeight: "",
            maxHeight: "",
            lifeSpan: "",
            selectedTemperaments: [],
          });
          setErrors({});
        })
        .catch((error) => {
          console.log(error);
          // Handle error during form submission
        });
    }
  };

  // Fetch temperaments on component mount
  React.useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);

  return (
    <div className={style.formContainer}>
      <h2>New Breed</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={style.input}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className={style.input}
          />
          {errors.image && <span>{errors.image}</span>}
        </div>
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="minWeight"
            value={formData.minWeight}
            onChange={handleInputChange}
            className={style.input}
          />
          {" - "}
          <input
            type="number"
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleInputChange}
            className={style.input}
          />
          {errors.weight && <span>{errors.weight}</span>}
        </div>
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            name="minHeight"
            value={formData.minHeight}
            onChange={handleInputChange}
            className={style.input}
          />
          {" - "}
          <input
            type="number"
            name="maxHeight"
            value={formData.maxHeight}
            onChange={handleInputChange}
            className={style.input}
          />
          {errors.height && <span>{errors.height}</span>}
        </div>
        <div>
          <label>Life Span:</label>
          <input
            type="text"
            name="lifeSpan"
            value={formData.lifeSpan}
            onChange={handleInputChange}
            className={style.input}
          />
          {errors.lifeSpan && <span>{errors.lifeSpan}</span>}
        </div>
        <div>
          <label>Temperaments:</label>
          <select
            multiple
            name="selectedTemperaments"
            value={formData.selectedTemperaments}
            onChange={handleTemperamentChange}
            className={style.input}
          >
            {temperaments.map((temperament) => (
              <option key={temperament} value={temperament}>
                {temperament}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={style.button}>
          Create Breed
        </button>
        <button onClick={handleClickss} className={style.button}>
          Home Page
        </button>
      </form>
    </div>
  );
}
