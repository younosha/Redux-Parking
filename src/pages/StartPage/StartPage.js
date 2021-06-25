import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Styles from "./StartPage.module.css";
import { numberPlaces, createParking } from "../../redux/actions";
import { useHistory } from 'react-router-dom';

export const StartPage = () => {
    const [places, setPlaces] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();

    const submitFunc = () => {
        dispatch(numberPlaces(places))
        const arr = Array.from(Array(Number(places)), (_, i) => {
            return { place: i + 1, state: "Свободно", car: { number: "", color: "" } }
        })
        dispatch(createParking(arr))
        setPlaces("")
        history.push("/main")
    }
    return (
        <div className={Styles.container}>
            <div className={Styles.modalWindow}>
                <h3>Введите число парковочных мест:</h3>
                <input
                    className={Styles.modalWindowInput}
                    value={places}
                    onChange={(e) => setPlaces(e.target.value)}
                />
                <button className={Styles.modalWindowButton} onClick={submitFunc}>OK</button>
            </div>
        </div>
    );
};
