import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail } from "../../redux/actions.js";
import { useHistory } from "react-router-dom";
import styles from "./detail.module.css";

function Detail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    return () => {
      dispatch(resetDetail());
    };
  }, []);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  let history = useHistory();
  const handleClickss = () => {
    history.push("/Home/");
  };
  console.log(detail);

  if (detail.length) {
    if (detail.find((dog) => dog.created_in_db)) {
      const createdDog = detail[0];
      return (
        <div className={styles.dogDetail}>
          <h1>{createdDog.name}</h1>
          <img src={createdDog.image} alt="" />
          <h2>Life Span: {createdDog.life_span}</h2>
          <h2>Temperaments:</h2>
          <p>{createdDog.temperaments.map((temp) => temp.name).join(", ")}</p>
          <h2>Weight:</h2>
          <p>Min: {createdDog.weight.min} kg</p>
          <p>Max: {createdDog.weight.max} kg</p>
          <button onClick={handleClickss}>Home Page</button>
        </div>
      );
    } else {
      const dog = detail[0];
      return (
        <div className={styles.background}>
          <div className={styles.dogDetail}>
            <h1>{dog.name}</h1>
            <img src={dog.image} alt="" />
            <h2>Life Span: {dog.life_span}</h2>
            <h2>Temperaments:</h2>
            <p>{dog.temperament}</p>
            <h2>Weight:</h2>
            <p>{dog.weight.metric} kg</p>
            <h2>Height:</h2>
            <p>{dog.height.metric} cm</p>
            <button onClick={handleClickss}>Home Page</button>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.loading}>
        <h1>Loading</h1>
      </div>
    );
  }
}

export default Detail;
