import React from "react";

import { useParams } from "react-router-dom";

import { TaskProvider } from "@/context/TaskContext";

import { useGetBoard } from "@/service/board";

import "./BoardPage.scss";

import BoardColumns from "./BoardColumns";
import BoardHeader from "./BoardHeader";

const BoardPage: React.FC = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const {
    data: board,
    error,
    status,
  } = useGetBoard({
    boardId,
    onError: () => {
      throw new Response("UPS", { status: 403 });
    },
  });

  // if (status === "error") {
  //   throw new Response((error as any)?.response?.data?.message, {
  //     status: (error as any)?.response.status,
  //   });
  // }

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
