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
    if (detail.find((dog) => dog.created === true)) {
      return (
        <div className={styles.dogDetail}>
          <h1>{detail[0].name}</h1>
          <img src={detail[0].image} alt="" />
          <h2>Life Span {detail[0].life_span}</h2>
          <h2>Temperaments</h2>
          <h2>{detail[0].temperament}</h2>
          <h2>weight</h2>
          <h2>Min{detail[0].weight.min}</h2>
          <h2> Max{detail[0].weight.max}</h2>
          <button onClick={handleClickss}>Home Page</button>
        </div>
      );
    } else {
      return (
        <div className={styles.dogDetail}>
          <h1>{detail[0].name}</h1>
          <img src={detail[0].image} alt="" />
          <h2>Life Span {detail[0].life_span}</h2>
          <h2>Temperaments</h2>
          <h2>{detail[0].temperament}</h2>
          <h2>weights</h2>
          <h2>{detail[0].weight.metric} Kg</h2>
          <button onClick={handleClickss}>Home Page</button>
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
