import React from "react";

import classes from "./MainHeader.module.css";

function MainHeader(props) {
  return <header className={classes["main-header"]}>{props.children}</header>;
}

export default MainHeader;
