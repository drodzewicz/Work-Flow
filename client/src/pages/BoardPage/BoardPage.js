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

import { boardInfo_DATA } from "data";

const handleMoveColumn = async (boardId, setTasks, sourceIndex, destinationIndex) => {
	if (sourceIndex !== destinationIndex) {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			const movingColumn = tempTasks.splice(sourceIndex, 1)[0];
			tempTasks.splice(destinationIndex, 0, movingColumn);
			return tempTasks;
		});
		const { data, error } = await fetchData({
			method: "PATCH",
			url: `/board/${boardId}/column`,
			token: true,
			payload: {
				sourceIndex,
				destinationIndex,
			},
		});
		console.log(data, error);
	}
};

const handleMoveTask = async (boardId, setTasks, tasks, source, destination) => {
	const indexOfSourceColumn = tasks.findIndex(({ _id }) => _id === source.droppableId);
	const indexOfDestinationColumn = tasks.findIndex(({ _id }) => _id === destination.droppableId);
	setTasks((taskColumns) => {
		const tempTasks = [...taskColumns];
		const movingTask = tempTasks[indexOfSourceColumn].tasks.splice(source.index, 1)[0];
		tempTasks[indexOfDestinationColumn].tasks.splice(destination.index, 0, movingTask);
		return tempTasks;
	});
	const { data, error } = await fetchData({
			method: "PATCH",
			url: `/board/${boardId}/task`,
			token: true,
			payload: {
				source: { columnIndex: indexOfSourceColumn, taskIndex: source.index },
				destination: { columnIndex: indexOfDestinationColumn, taskIndex: destination.index },
			},
		});
		console.log(data)
};

const onDragEnd = (boardId, result, tasks, setTasks) => {
	if (!result.destination) return;
	const { source, destination, type } = result;
	if (type === "droppableTaskToColumn") handleMoveTask(boardId, setTasks, tasks, source, destination);
	else if (type === "droppableColumn") handleMoveColumn(boardId, setTasks, source.index, destination.index);
};

const BoardPage = ({ boardId }) => {
	const [boardInfo, setBoardInfo] = useState({
		name: "",
		description: "",
	});
	const [tasks, setTasks] = useState([]);

	const [, modalDispatch] = useContext(ModalContext);
	const [{ user }, userDispatch] = useContext(UserContext);

	useEffect(() => {
		const getLoggedInUserRole = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/members/${user._id}`,
				token: true,
			});
			if (!!data) userDispatch({ type: "SET_ROLE", payload: { role: data.member.role } });
		};

		!!user && getLoggedInUserRole();
		return () => {};
	}, [user, boardId, userDispatch]);

	useEffect(() => {
		const getBoardTasks = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}`,
				token: true,
			});
			console.log(data);
			if (!!data) {
				setTasks(data.columns);
				setBoardInfo({ name: data.name, description: data.description });
			}
		};
		getBoardTasks();
		return () => {};
	}, [boardId]);

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
	);
};

BoardPage.propTypes = {
	boardId: PropTypes.string.isRequired,
};

export default BoardPage;
