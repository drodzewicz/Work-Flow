import React, { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./BoardPage.scss";
import "./BoardPage-dark.scss";
import ExpandText from "components/general/ExpandText/ExpandText";
import Button from "components/general/Button/Button";
import TaskBoard from "./TaskBoard";
import PeopleIcon from "@material-ui/icons/People";
import BoardOptions from "components/board/BoardCard/BoardOptions";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { UserContext, UserActionType } from "context/UserContext";
import { BoardMembers, Tags, TaskDisplay } from "components/modalForms";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { getLoggedInUserBoardRole, getBoard } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { onDragEnd } from "./dragHelper";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { BoardPageProps } from ".";

import { ws } from "config/socket.conf";

const BoardPage: React.FC<BoardPageProps> = ({ match, location }) => {
  const boardId: string = match.params.id;
  const query = queryString.parse(location.search);

  const [boardInfo, setBoardInfo] = useState<{
    name: string;
    description: string;
  }>({
    name: "",
    description: "",
  });
  const { tasksState, tasksDispatch } = useContext(TaskContext);
  const [isTaskLoading, setTaskLoading] = useState<boolean>(false);
  const { modalDispatch } = useContext(ModalContext);
  const {
    userState: { user, currentBoard },
    userDispatch,
  } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    let _isMounted = true;
    let waitingTimout: ReturnType<typeof setTimeout> | null = null;

    const updateTaskHandler = () => {};
    const openTask = () => {
      modalDispatch({
        type: ModalActionType.OPEN,
        payload: {
          render: <TaskDisplay taskId={query.task as string} updateTask={updateTaskHandler} />,
          title: "Task Details",
        },
      });
    };
    if (!!query && !!query.task) {
      waitingTimout = setTimeout(openTask, 1000);
    }

    const getLoggedInUserRole = async () => {
      const { data, status } = await getLoggedInUserBoardRole({ boardId, userId: user._id });
      if (_isMounted && status === 200) {
        ws.emit("joinBoardRoom", { room: boardId });
        userDispatch({ type: UserActionType.ROLE, payload: { role: data.member.role, boardId } });
      }
    };

    const getBoardTaskss = async () => {
      const { data, status } = await getBoard({ boardId, setLoading: setTaskLoading });
      if (status === 200) {
        tasksDispatch({ type: TasksActionType.SET_TASKS, payload: { columns: data.columns } });
        setBoardInfo({ name: data.name, description: data.description });
      } else {
        history.replace(`/error/${status}`);
      }
    };
    getBoardTaskss();
    !!user && getLoggedInUserRole();

    return () => {
      if (waitingTimout) clearTimeout(waitingTimout);
      ws.emit("leaveBoardRoom", { room: boardId });
      _isMounted = false;
    };
  }, [user, boardId, userDispatch, history, modalDispatch, tasksDispatch]);

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
          <div>{boardInfo.description}</div>
        </ExpandText>
        <div className="board-page__controlls">
          <Button onClick={openBoardMembersModal}>
            <PeopleIcon />
            <span>Peolpe</span>
          </Button>
          <Button onClick={openBoardTagsModal}>
            <LocalOfferIcon />
            <span>Tags</span>
          </Button>
          <BoardOptions
            boardId={boardId}
            removeBoardCallback={redirectToDashboard}
            isAuthor={currentBoard.role === "owner"}
          />
        </div>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(boardId, result, tasksState, tasksDispatch)}>
          <TaskBoard boardId={boardId} />
        </DragDropContext>
      </div>
    </LoadingOverlay>
  );
};

export default BoardPage;
