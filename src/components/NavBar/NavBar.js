import React from "react";
import { Link } from "react-router-dom";
import Styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.navWrapper}>
        <Link
          className={Styles.link}
          to={{
            pathname: "/main",
          }}
        >
          Главная
        </Link>
        <Link
          className={Styles.link}
          to={{
            pathname: "/list",
          }}
        >
          Список
        </Link>
      </div>
    </div>
  );
};
