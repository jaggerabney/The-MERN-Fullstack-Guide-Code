import React from "react";

import "./NewGoal.css";

function NewGoal(props) {
  function addGoalHandler(event) {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: "My new goal!",
    };

    props.onCreate(newGoal);
  }

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default NewGoal;
