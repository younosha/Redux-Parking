import React from "react";
import Styles from "./Place.module.css";

export const Place = ({ place, state }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.car}>
        {state === "Занято" && (
          <img
            src="images/car.png"
            style={{ width: "100%", height: "100%" }}
            alt=""
          />
        )}
      </div>
      <div>{place}</div>
      <div className={state === "Занято" ? Styles.close : Styles.open}>
        {state}
      </div>
    </div>
  );
};
