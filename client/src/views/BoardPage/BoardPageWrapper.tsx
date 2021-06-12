import React from "react";
import BoardPage from "./BoardPage";
import { TaskProvider } from "context/TaskContext/TaskContext";
import { BoardPageProps } from ".";

const BoardPageWrapper: React.FC<BoardPageProps> = (props) => {
  return (
    <TaskProvider>
      <BoardPage {...props} />
    </TaskProvider>
  );
};

export default BoardPageWrapper;
