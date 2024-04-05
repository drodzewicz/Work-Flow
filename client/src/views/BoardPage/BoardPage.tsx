import React, { useCallback } from "react";

import { debounce } from "lodash";
import { useErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "react-query";
import { Outlet } from "react-router-dom";

import useBoardId from "@/hooks/useBoardId";
import { useWebSocketListener } from "@/hooks/useWebSocketListener";
import { useWebSocketRoom } from "@/hooks/useWebSocketRoom";

import { useGetBoard } from "@/service/board";
import { taskQueryKeys } from "@/service/task";

import "./BoardPage.scss";

import BoardColumns from "./BoardColumns";
import BoardHeader from "./BoardHeader";

const BoardPage: React.FC = () => {
    const boardId = useBoardId();
    const queryClient = useQueryClient();

    useWebSocketRoom(boardId);

    const debounceInvalidateTasks = useCallback(
        debounce(() => {
            queryClient.invalidateQueries(taskQueryKeys.all);
        }, 2000),
        []
    );

    useWebSocketListener("task-alert", debounceInvalidateTasks);

    useWebSocketListener("column-alert", debounceInvalidateTasks);

    const { showBoundary } = useErrorBoundary();
    const { data: board } = useGetBoard({
        boardId,
        onError: showBoundary,
    });

    return (
        <div className="board-page">
            <BoardHeader
                name={board?.name ?? "loading..."}
                description={board?.description ?? "loading..."}
            />
            <BoardColumns />
            <Outlet />
        </div>
    );
};

export default BoardPage;
