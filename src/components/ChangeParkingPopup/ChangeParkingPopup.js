import React, { useEffect, useState } from "react";
import Styles from "./ChangeParkingPopup.module.css";
import { useDispatch } from "react-redux";
import { arrivedCar, leftCar, arrivedBus } from "../../redux/actions";
import { useSelector } from "react-redux";

export const ChangeParkingPopup = ({ close, action, parking }) => {
  const dispatchState = useSelector((state) => state);
  const [car, setCar] = useState({ place: "", number: "", color: "" });
  const dispatch = useDispatch();
  // const limit = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96,]
  const checkMax = () => {
    const arr = car.place.split(" ")
    const numbers = arr.map((el) => Number(el))
    const max = Math.max(...numbers)
    return String(max)
  }
  const setCarAction = () => {
    if (action === "arrived") {
      if (car.place.indexOf(" ") > -1) {
        const places = car.place.split(" ")
        const numbers = places.map((el) => Number(el))
        let count = 0
        const numberBus = car.number
        const colorBus = car.color
        const newArr = dispatchState.parking.places.map((el) => {
          if (el.place === numbers[0] && el.state === "Свободно") {
            count++
            return {
              ...el, state: "Занято", car: { number: numberBus, color: colorBus }
            }
          }
          else {
            return el
          }
        })
        const newArr2 = newArr.map((el) => {
          if (el.place === numbers[1] && el.state === "Свободно") {
            count++
            return {
              ...el, state: "Занято", car: { number: numberBus, color: colorBus }
            }
          }
          else {
            return el
          }
        })
        const newArr3 = newArr2.map((el) => {
          if (el.place === numbers[2] && el.state === "Свободно") {
            count++
            return {
              ...el, state: "Занято", car: { number: numberBus, color: colorBus }
            }
          }
          else {
            return el
          }
        })
        if (count === 3) {
          if (numbers[0] + 1 === numbers[1] && numbers[1] + 1 === numbers[2] && checkMax() <= Number(dispatchState.parking.number) && numbers[0] % 8 !== 0 && numbers[1] % 8 !== 0) {
            dispatch(arrivedBus(newArr3))
            close();
          } else if (numbers[0] + 8 === numbers[1] && numbers[1] + 8 === numbers[2] && checkMax() <= Number(dispatchState.parking.number)) {
            dispatch(arrivedBus(newArr3))
            close();
          }
        }
      } else {
        let isEmpty = true;
        parking.forEach((el) => {
          if (el.place === Number(car.place) && el.state === "Занято") {
            isEmpty = false;
          }
        });
        isEmpty ? dispatch(arrivedCar(car)) : alert("Место занято!");
        close();
      }
    }
    else {
      dispatch(leftCar(car));
      close();
    }
  };

  const checkDisabled = () => {
    if (action === "arrived") {
      // console.log(car.color.length > 2);
      // console.log(car.number.length > 8);
      // console.log(String(car.places.length) > 0);
      // console.log(checkMax() <= dispatchState.parking.number);
      if (
        car.color.length > 2 &&
        car.number.length > 8 &&
        car.place.length > 0 &&
        checkMax() <= Number(dispatchState.parking.number)
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    checkMax()
  }, [car.place])
  return (
    <div className={Styles.backgroundPopup} onClick={close} on>
      <div
        className={Styles.container}
        onClick={(event) => event.stopPropagation()}
      >
        {action === "arrived" ? (
          <div style={{ width: "100%" }}>
            <div className={Styles.inputContainer}>
              <h3>Номер</h3>
              <input
                className={Styles.inputArrived}
                onChange={(e) => {
                  setCar({ ...car, number: `${e.target.value}` });
                }}
              />
            </div>
            <div className={Styles.inputContainer}>
              <h3>Цвет</h3>
              <input
                className={Styles.inputArrived}
                onChange={(e) => {
                  setCar({ ...car, color: `${e.target.value}` });
                }}
              />
            </div>
            <div className={Styles.inputContainer}>
              <h3>Парковочное место</h3>
              <p>*Для автобуса введите три номера парковочных мест через пробел.</p>
              <input
                className={Styles.inputArrived}
                onChange={(e) => {
                  setCar({ ...car, place: `${e.target.value}` });
                }}
              />
            </div>
          </div>
        ) : (
          <div className={Styles.inputContainer}>
            <h3>Номер автомобиля</h3>
            <input
              className={Styles.inputArrived}
              onChange={(e) => {
                setCar({ ...car, number: `${e.target.value}` });
              }}
            />
          </div>
        )}

        <div className={Styles.buttonsWrapper}>
          <button
            className={
              checkDisabled() ? Styles.buttonOkDisabled : Styles.buttonOk
            }
            onClick={setCarAction}
            disabled={checkDisabled()}
          >
            OK
          </button>
          <button className={Styles.buttonCancel} onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
