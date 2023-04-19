import React, { useState } from "react";

import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";

import "./App.css";

const DUMMY_GOALS = [
  { id: "cg1", text: "Finish the course!" },
  { id: "cg2", text: "Learn all about course topics" },
  { id: "cg3", text: "Help other students in the course Q&A" },
];

const App = () => {
  const [goals, setGoals] = useState(DUMMY_GOALS);

  function newGoalHandler(newGoal) {
    setGoals((prevGoals) => prevGoals.concat(newGoal));
  }

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onCreate={newGoalHandler} />
      <GoalList goals={goals} />
    </div>
  );
};

export default App;
