import React, { useState } from "react";
import Styles from "./MainPage.module.css";
import { Place } from "../../components/Place/Place";
import { useSelector } from "react-redux";
import { ChangeParkingPopup } from "../../components/ChangeParkingPopup/ChangeParkingPopup";

export const MainPage = () => {
  const { parking } = useSelector((state) => state);
  const [changeParkingPopup, setChangeParkingPopup] = useState(false);
  const [actionForDispatch, setActionForDispatch] = useState("");

  const changeParkingData = (action) => {
    setChangeParkingPopup((prevState) => !prevState);
    setActionForDispatch(action);
  };

  const closePopup = () => {
    setChangeParkingPopup((prevState) => !prevState);
    setActionForDispatch("");
  };

  return (
    <div className={Styles.container}>
      {changeParkingPopup && (
        <ChangeParkingPopup
          close={closePopup}
          action={actionForDispatch}
          parking={parking.places}
        />
      )}
      <div className={Styles.buttonsWrapper}>
        <button
          onClick={() => changeParkingData("arrived")}
          className={Styles.actionButton}
        >
          Приехала
        </button>
        <button
          onClick={() => changeParkingData("left")}
          className={Styles.actionButton}
        >
          Уехала
        </button>
      </div>
      <div className={Styles.placesWrapper}>
        {parking &&
          parking.places.map((el) => (
            <Place place={el.place} state={el.state} />
          ))}
      </div>
    </div>
  );
};
