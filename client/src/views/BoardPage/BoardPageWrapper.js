import React from "react";
import BoardPage from "./BoardPage";
import { TaskProvider } from "context/TaskContext/TaskContext";

const BoardPageWrapper = (props) => {
  return (
    <div>
      <TaskProvider>
        <BoardPage {...props} />
      </TaskProvider>
    </div>
  );
};

export default BoardPageWrapper;
