import React from "react";
import Styles from "./ListItem.module.css";

export const ListItem = ({ place, state, number, color }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.cell}>{place}</div>
      <div className={Styles.cell}>{state}</div>
      <div className={Styles.cell}>{color ? color : "-"}</div>
      <div className={Styles.cell}>{number ? number.toUpperCase() : "-"}</div>
    </div>
  );
};
