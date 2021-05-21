import React, { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import "./BoardPage.scss";
import ExpandText from "components/general/ExpandText/ExpandText";
import Button from "components/general/Button/Button";
import TaskBoard from "./TaskBoard";
import PeopleIcon from "@material-ui/icons/People";
import BoardOptions from "components/board/BoardCard/BoardOptions";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import { BoardMembers, Tags, TaskDisplay } from "components/modalForms";
import { TaskProvider } from "context/TaskContext";
import { getLoggedInUserBoardRole, getBoard } from "service";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import { onDragEnd } from "./dragHelper";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import { ws } from "config/socket.conf";

const BoardPage = ({ match, location }) => {
	const boardId = match.params.id;
	const query = queryString.parse(location.search);
	const [boardInfo, setBoardInfo] = useState({
		name: "",
		description: "",
	});
	const [tasks, setTasks] = useState([]);
	const [isTaskLoading, setTaskLoading] = useState(false);
	const [, modalDispatch] = useContext(ModalContext);
	const [{ user, currentBoard }, userDispatch] = useContext(UserContext);

	const history = useHistory();

	useEffect(() => {
		let _isMounted = true;
		const updateTaskHandler = () => {};
		const openTask = () => {
			modalDispatch({
				type: "OPEN",
				payload: {
					render: <TaskDisplay taskId={query.task} updateTask={updateTaskHandler} />,
					title: "Task Details",
				},
			})
		}
		if (!!query && !!query.task) {
			setTimeout(openTask, 1000);
		}

		const getLoggedInUserRole = async () => {
			const { data, status } = await getLoggedInUserBoardRole({ boardId, userId: user._id });
			if (_isMounted && status === 200) {
				ws.emit("joinBoardRoom", { room: boardId });
				userDispatch({ type: "SET_ROLE", payload: { role: data.member.role, boardId } });
			}
		};

		const getBoardTaskss = async () => {
			const { data, status } = await getBoard({ boardId, setLoading: setTaskLoading });
			if (status === 200) {
				setTasks(data.columns);
				setBoardInfo({ name: data.name, description: data.description });
			} else {
				history.replace(`/error/${status}`);
			}
		};
		getBoardTaskss();
		!!user && getLoggedInUserRole();

		return () => {
			clearTimeout(openTask);
			ws.emit("leaveBoardRoom", { room: boardId });
			_isMounted = false;
		};
	}, [user, boardId, userDispatch, history, modalDispatch]);

	const openBoardMembersModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <BoardMembers boardId={boardId} />, title: "Board Members" },
		});
	};
	const openBoardTagsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <Tags boardId={boardId} />, title: "Board Tags" },
		});
	};
	const redirectToDashboard = () => {
		history.replace("/")
	}

	return (
    <div className="board-page-wrapper">
      <LoadingOverlay show={isTaskLoading} opacity={0} classes={["task-loading"]}>
        <div className="board-page">
          <ExpandText classes={["board-title"]} text={boardInfo.name}>
            <div>{boardInfo.description}</div>
          </ExpandText>
          <div className="board-button-group">
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
          <DragDropContext onDragEnd={(result) => onDragEnd(boardId, result, tasks, setTasks)}>
            <TaskProvider values={[tasks, setTasks]}>
              <TaskBoard boardId={boardId} />
            </TaskProvider>
          </DragDropContext>
        </div>
      </LoadingOverlay>
    </div>
  );
};

BoardPage.defaultProps = {
	query: undefined
}

BoardPage.propTypes = {
	query: PropTypes.object,
	boardId: PropTypes.string.isRequired,
};

export default BoardPage;
