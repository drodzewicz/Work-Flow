import React from "react";

import { BoardPageProps } from "./types";

import { TaskProvider } from "@/context/TaskContext/TaskContext";

import BoardPage from "./BoardPage";

const BoardPageWrapper: React.FC<BoardPageProps> = (props) => {
  return (
    <TaskProvider>
      <BoardPage {...props} />
    </TaskProvider>
  );
};

export default BoardPageWrapper;
