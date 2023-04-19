import React, { useState } from "react";

import "./NewGoal.css";

function NewGoal(props) {
  const [enteredText, setEnteredText] = useState("");

  function addGoalHandler(event) {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };

    setEnteredText("");

    props.onCreate(newGoal);
  }

  function inputChangeHandler(event) {
    setEnteredText(event.target.value);
  }

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={inputChangeHandler} />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default NewGoal;
