import React, { useEffect, useState } from "react";
import Styles from "./ListPage.module.css";
import { useSelector } from "react-redux";
import { ListItem } from "../../components/ListItem/ListItem";

export const ListPage = () => {
  const { parking } = useSelector((state) => state);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [filteredDataValue1, setFilteredDataValue1] = useState([]);
  const [filteredDataValue2, setFilteredDataValue2] = useState([]);
  const [filteredDataValue3, setFilteredDataValue3] = useState([]);
  const [filteredDataValue4, setFilteredDataValue4] = useState([]);

  const deleteValues = () => {
    setFilteredDataValue1([]);
    setFilteredDataValue2([]);
    setFilteredDataValue3([]);
    setFilteredDataValue4([]);
  };
  const filterFunc = () => {
    const result = [];
    switch (selectedFilter) {
      case "value0":
        deleteValues();
        break;
      case "value1":
        deleteValues();
        parking.places.forEach((el) => {
          if (
            inputFilter &&
            el.car.color.toLowerCase().includes(inputFilter.toLowerCase())
          ) {
            result.push(el);
          }
        });
        setFilteredDataValue1(result);
        break;
      case "value2":
        deleteValues();
        parking.places.forEach((el) => {
          if (
            inputFilter.length > 2 &&
            String(el.car.number).includes(inputFilter)
          ) {
            result.push(el);
          }
        });
        setFilteredDataValue2(result);
        break;
      case "value3":
        deleteValues();
        parking.places.forEach((el) => {
          if (
            inputFilter &&
            el.car.color.toLowerCase().includes(inputFilter.toLowerCase())
          ) {
            result.push(el);
          }
        });
        setFilteredDataValue3(result);
        break;
      case "value4":
        deleteValues();
        parking.places.forEach((el) => {
          if (el.state === "Свободно") {
            result.push(el);
          }
        });
        setFilteredDataValue4(result);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    filterFunc();
  }, [inputFilter, selectedFilter]);

  return (
    <div className={Styles.container}>
      <div className={Styles.filter}>
        <select
          name="select"
          style={{ padding: "10px" }}
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="value0"></option>
          <option value="value1">Номер авто по цвету</option>
          <option value="value2">Номер места по номеру авто</option>
          <option value="value3">Место по цвету</option>
          <option value="value4">Свободные места</option>
        </select>
        <input
          className={Styles.filterInput}
          value={inputFilter}
          onChange={(e) => setInputFilter(e.target.value)}
        />
      </div>

      {filteredDataValue1.length > 0 && (
        <div>
          <h3>Номера автомоболей:</h3>
          {filteredDataValue1.map((el) => `${el.car.number} `)}
        </div>
      )}
      {filteredDataValue2.length > 0 && (
        <div>
          <h3>Номер места:</h3>
          {filteredDataValue2.map((el) => `${el.place} `)}
        </div>
      )}
      {filteredDataValue3.length > 0 && (
        <div>
          <h3>Номер места:</h3>
          {filteredDataValue3.map((el) => `${el.place} `)}
        </div>
      )}
      {filteredDataValue4.length > 0 && (
        <div>
          <h3>Свободные места:</h3>
          {filteredDataValue4.map((el) => `${el.place} `)}
        </div>
      )}
      <dic className={Styles.tableHeader}>
        <h3 className={Styles.headerItem}>Место</h3>
        <h3 className={Styles.headerItem}>Состояние</h3>
        <h3 className={Styles.headerItem}>Цвет</h3>
        <h3 className={Styles.headerItem}>Номер</h3>
      </dic>
      <div className={Styles.table}>
        {parking.places.map((el) => {
          return (
            <ListItem
              place={el.place}
              state={el.state}
              color={el.car.color}
              number={el.car.number}
            />
          );
        })}
      </div>
    </div>
  );
};
