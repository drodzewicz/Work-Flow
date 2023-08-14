import React from "react";

import { BoardPageProps } from "./types";

import { useParams } from "react-router-dom";

import { TaskProvider } from "@/context/TaskContext";

import useGetBoard from "@/service/useGetBoard";

import "./BoardPage.scss";

import BoardColumns from "./BoardColumns";
import BoardHeader from "./BoardHeader";

const BoardPage: React.FC<BoardPageProps> = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const { data: board } = useGetBoard({ boardId });

  return (
    <div className="board-page">
      <BoardHeader
        boardId={boardId}
        name={board?.name ?? ""}
        description={board?.description ?? ""}
      />
      <TaskProvider>
        <BoardColumns boardId={boardId} />
      </TaskProvider>
    </div>
  );
};

export default BoardPage;
