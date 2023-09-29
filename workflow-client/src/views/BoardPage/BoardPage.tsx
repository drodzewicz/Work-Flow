import React from "react";

import useBoardId from "@/hooks/useBoardId";

import { useGetBoard } from "@/service/board";

import "./BoardPage.scss";

import BoardColumns from "./BoardColumns";
import BoardHeader from "./BoardHeader";

const BoardPage: React.FC = () => {
  const boardId = useBoardId();
  const { data: board } = useGetBoard({ boardId });

  return (
    <div className="board-page">
      <BoardHeader name={board?.name ?? ""} description={board?.description ?? ""} />
      <BoardColumns />
    </div>
  );
};

export default BoardPage;
