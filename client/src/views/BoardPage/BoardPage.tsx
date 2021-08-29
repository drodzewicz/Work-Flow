import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./BoardPage.scss";
import "./BoardPage-dark.scss";
import ExpandText from "components/general/ExpandText";
import Button from "components/general/Button";
import TaskBoard from "./TaskBoard";
import BoardOptions from "components/board/BoardCard/BoardOptions";
import { FaUsers, FaTags } from "react-icons/fa";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { UserContext, UserActionType } from "context/UserContext";
import Tags from "dialogs/Tags/Tags";
import TaskDisplay from "dialogs/TaskDisplay";
import BoardMembers from "dialogs/BoardMembers/BoardMembers";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { getLoggedInUserBoardRole, getBoard } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { onDragEnd } from "./dragHelper";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { BoardPageProps } from ".";
import { UserBoardRoles } from "types/general";
import axios, { CancelTokenSource } from "axios";
import { ws } from "config/socket.conf";

const BoardPage: React.FC<BoardPageProps> = ({ match, location }) => {
  const boardId: string = match.params.id;

  const [boardInfo, setBoardInfo] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const { tasksState, tasksDispatch } = useContext(TaskContext);
  const [isTaskLoading, setTaskLoading] = useState<boolean>(false);
  const watingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const source = useRef<CancelTokenSource | null>(null);
  const { modalDispatch } = useContext(ModalContext);
  const {
    userState: { user, currentBoard },
    userDispatch,
  } = useContext(UserContext);

  const history = useHistory();
  const query = queryString.parse(location.search);

  const getLoggedInUserRole = useCallback(async () => {
    const { data, status } = await getLoggedInUserBoardRole({
      boardId,
      userId: user._id,
      cancelToken: source.current?.token,
    });
    if (status === 200) {
      ws.emit("joinBoardRoom", { room: boardId });
      if (!!data) {
        const { member } = data;
        userDispatch({
          type: UserActionType.ROLE,
          payload: { role: member.role, boardId },
        });
      }
    }
  }, [boardId, user, userDispatch]);

  const getBoardTasks = useCallback(async () => {
    const { data, status } = await getBoard({
      boardId,
      setLoading: setTaskLoading,
      cancelToken: source.current?.token,
    });
    if (!!data) {
      const { columns, name, description } = data;
      tasksDispatch({ type: TasksActionType.SET_TASKS, payload: { columns } });
      setBoardInfo({ name, description });
    } else if (!!status) {
      history.replace(`/error/${status}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, tasksDispatch]);

  useEffect(() => {
    source.current = axios.CancelToken.source();

    const openTaskOnInit = () => {
      modalDispatch({
        type: ModalActionType.OPEN,
        payload: {
          render: <TaskDisplay taskId={query.task as string} />,
          title: "Task Details",
          size: "l",
        },
      });
    };

    if (!!query && !!query.task) {
      watingTimeout.current = setTimeout(openTaskOnInit, 1000);
    }

    getBoardTasks();
    !!user && getLoggedInUserRole();

    return () => {
      if (watingTimeout.current) clearTimeout(watingTimeout.current);
      ws.emit("leaveBoardRoom", { room: boardId });
      source.current?.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, user, getLoggedInUserRole, getBoardTasks, modalDispatch]);

  const openBoardMembersModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <BoardMembers boardId={boardId} />, title: "Board Members" },
    });
  };
  const openBoardTagsModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Tags boardId={boardId} />, title: "Board Tags" },
    });
  };
  const redirectToDashboard = () => {
    history.replace("/");
  };

  return (
    <LoadingOverlay show={isTaskLoading} opacity={0} className="task-loading">
      <div className="board-page">
        <ExpandText className="board-page__title" title={boardInfo.name}>
          <p>{boardInfo.description}</p>
        </ExpandText>
        <div className="board-page__controlls">
          <Button onClick={openBoardMembersModal}>
            <FaUsers />
            <span>Peolpe</span>
          </Button>
          <Button onClick={openBoardTagsModal}>
            <FaTags />
            <span>Tags</span>
          </Button>
          <BoardOptions
            boardId={boardId}
            removeBoardCallback={redirectToDashboard}
            isAuthor={currentBoard.role === UserBoardRoles.OWNER}
          />
        </div>
        <hr className="break-line" style={{ width: "100%" }} />
        <DragDropContext
          onDragEnd={(result) => onDragEnd(boardId, result, tasksState, tasksDispatch)}>
          <TaskBoard boardId={boardId} />
        </DragDropContext>
      </div>
    </LoadingOverlay>
  );
};

export default BoardPage;
