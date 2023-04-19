import React from "react";

import "./GoalList.css";

function GoalList(props) {
  console.log(props.goals);

  return <ul className="goal-list"></ul>;
}

export default GoalList;
