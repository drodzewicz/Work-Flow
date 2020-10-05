import React, { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import "./BoardPage.scss";
import ExpandText from "components/ExpandText/ExpandText";
import Button from "components/Button/Button";
import TaskBoard from "./TaskBoard";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import { BoardMembers, Tags } from "modalForms";
import { TaskProvider } from "context/TaskContext";
import fetchData from "helper/fetchData";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";
import { onDragEnd } from "./dragHelper";
import { useHistory } from "react-router-dom";

import { ws } from "socket";

const BoardPage = ({ boardId }) => {
	const [boardInfo, setBoardInfo] = useState({
		name: "",
		description: "",
	});
	const [tasks, setTasks] = useState([]);
	const [isTaskLoading, setTaskLoading] = useState(false);
	const [, modalDispatch] = useContext(ModalContext);
	const [{ user }, userDispatch] = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		let _isMounted = true;
		const getLoggedInUserRole = async () => {
			const { data, status } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/members/${user._id}`,
				token: true,
			});
			if (_isMounted && status === 200) {
				ws.emit("joinBoardRoom", { room: boardId });
				userDispatch({ type: "SET_ROLE", payload: { role: data.member.role, boardId } });
			}
		};

		const getBoardTasks = async () => {
			const { data, status } = await fetchData({
				method: "GET",
				url: `/board/${boardId}`,
				token: true,
				setLoading: setTaskLoading,
			});
			if (status === 200) {
				setTasks(data.columns);
				setBoardInfo({ name: data.name, description: data.description });
			} else {
				history.replace(`/error/${status}`);
			}
		};
		getBoardTasks();
		!!user && getLoggedInUserRole();

		return () => {
			ws.emit("leaveBoardRoom", { room: boardId });
			_isMounted = false;
		};
	}, [user, boardId, userDispatch, history]);

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

	return (
		<div className="board-page-wrapper">
			<LoadingOverlay show={isTaskLoading} opacity={0} classes={["task-loading"]}>
				<div className="board-page">
					<ExpandText classes={["board-title"]} text={boardInfo.name}>
						<div>{boardInfo.description}</div>
					</ExpandText>
					<div className="board-button-group">
						<Button clicked={openBoardMembersModal}>
							<PeopleIcon />
							<span>Peolpe</span>
						</Button>
						<Button clicked={openBoardTagsModal}>
							<LocalOfferIcon />
							<span>Tags</span>
						</Button>
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

BoardPage.propTypes = {
	boardId: PropTypes.string.isRequired,
};

export default BoardPage;
