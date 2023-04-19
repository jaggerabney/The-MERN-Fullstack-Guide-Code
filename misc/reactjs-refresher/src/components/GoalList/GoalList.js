// React imports
import React from "react";

// Project imports
import "./GoalList.css";

function GoalList(props) {
  // JSX code. The map function takes the goals prop and creates a dynamic list of li's
  return (
    <ul className="goal-list">
      {props.goals.map((goal) => (
        <li key={goal.id}>{goal.text}</li>
      ))}
    </ul>
  );
}

export default GoalList;
