// React imports
import React, { useState } from "react";

// Project imports
import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";

import "./App.css";

// Dummy goals for initializing the "goals" state
const DUMMY_GOALS = [
  { id: "cg1", text: "Finish the course!" },
  { id: "cg2", text: "Learn all about course topics" },
  { id: "cg3", text: "Help other students in the course Q&A" },
];

const App = () => {
  // Goals state for rendering the list of user goals
  const [goals, setGoals] = useState(DUMMY_GOALS);

  // New goal handler that appends the new goal to the end of the goals array
  function newGoalHandler(newGoal) {
    setGoals((prevGoals) => prevGoals.concat(newGoal));
  }

  // JSX code
  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onCreate={newGoalHandler} />
      <GoalList goals={goals} />
    </div>
  );
};

export default App;
