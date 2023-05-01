import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader/MainHeader";
import SideDrawer from "../SideDrawer/SideDrawer";
import NavLinks from "../NavLinks/NavLinks";

import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  return (
    <>
      <SideDrawer>
        <nav className={classes["main-navigation__drawer-nav"]}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={classes["main-navigation__menu-btn"]}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes["main-navigation__title"]}>
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className={classes["main-navigation__header-nav"]}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
