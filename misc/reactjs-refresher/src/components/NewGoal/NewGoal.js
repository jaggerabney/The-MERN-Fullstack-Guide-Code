// React imports
import React, { useState } from "react";

// Project imports
import "./NewGoal.css";

function NewGoal(props) {
  // State for managing the text entered into the goal input component
  const [enteredText, setEnteredText] = useState("");

  // Handler called when the "Add Goal" button is clicked
  function addGoalHandler(event) {
    // Prevents page reload
    event.preventDefault();

    // Creates a new goal - goals only consist of an id and text
    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };

    // Clears goal input component
    setEnteredText("");

    // Passes the new goal up to the App component
    props.onCreate(newGoal);
  }

  // Handler that's called when the user types into the goal input component
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
