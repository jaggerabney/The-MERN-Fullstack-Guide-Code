import React from "react";

import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";

import "./App.css";

const App = () => {
  const DUMMY_GOALS = [
    { id: "cg1", text: "Finish the course!" },
    { id: "cg2", text: "Learn all about course topics" },
    { id: "cg3", text: "Help other students in the course Q&A" },
  ];

  function newGoalHandler(newGoal) {
    DUMMY_GOALS.push(newGoal);

    console.log(DUMMY_GOALS);
  }

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onCreate={newGoalHandler} />
      <GoalList goals={DUMMY_GOALS} />
    </div>
  );
};

export default App;
