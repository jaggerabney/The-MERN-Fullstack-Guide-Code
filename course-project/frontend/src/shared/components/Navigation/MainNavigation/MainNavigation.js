import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader/MainHeader";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavLinks from "../NavLinks/NavLinks";

import classes from "./MainNavigation.module.css";

function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function toggleDrawer() {
    setDrawerIsOpen(!drawerIsOpen);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={toggleDrawer} />}
      {drawerIsOpen && (
        <SideDrawer>
          <nav className={classes["main-navigation__drawer-nav"]}>
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button
          className={classes["main-navigation__menu-btn"]}
          onClick={toggleDrawer}
        >
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
