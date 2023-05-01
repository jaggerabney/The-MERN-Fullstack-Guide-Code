import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader/MainHeader";
import NavLinks from "../NavLinks/NavLinks";

import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  return (
    <MainHeader>
      <button className={classes["main-navigation__menu-btn"]}>
        <span />
        <span />
        <span />
      </button>
      <h1 className={classes["main-navigation__title"]}>
        <Link>YourPlaces</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
}

export default MainNavigation;
