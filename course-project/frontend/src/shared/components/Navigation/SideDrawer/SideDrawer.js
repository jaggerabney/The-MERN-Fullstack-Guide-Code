import React from "react";
import ReactDOM from "react-dom";

import classes from "./SideDrawer.module.css";

function SideDrawer(props) {
  const content = (
    <aside className={classes["side-drawer"]}>{props.children}</aside>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}

export default SideDrawer;
