import React, { useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import "./BoardPage.scss";
import ExpandText from "components/ExpandText/ExpandText";
import Button from "components/Button/Button";
import TaskBoard from "./TaskBoard";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext } from "context/ModalContext";
import { BoardMembers, Tags } from "modalForms";
import { TaskProvider } from "context/TaskContext";

import { boardInfo_DATA, boardTasks_2_DATA } from "data";

const onDragEnd = (result, tasks, setTasks) => {
	if (!result.destination) return;
	const { source, destination, type } = result;

	if (type === "droppableTaskToColumn") {
		const indexOfSourceColumn = tasks.findIndex(({ id }) => id === source.droppableId);
		const indexOfDestinationColumn = tasks.findIndex(({ id }) => id === destination.droppableId);

		setTasks((tasks) => {
			const tempTasks = [...tasks];
			const movingTask = tempTasks[indexOfSourceColumn].tasks.splice(source.index, 1)[0];
			tempTasks[indexOfDestinationColumn].tasks.splice(destination.index, 0, movingTask);
			return tempTasks;
		});
	} else if (type === "droppableColumn") {
		const indexOfSourceColum = source.index;
		const indexOfDestinationColumn = destination.index;

		setTasks((tasks) => {
			const tempTasks = [...tasks];
			const movingColumn = tempTasks.splice(indexOfSourceColum, 1)[0];
			tempTasks.splice(indexOfDestinationColumn, 0, movingColumn);
			return tempTasks;
		});
	}
};

const BoardPage = ({ boardId }) => {
	const [boardInfo] = useState({
		name: boardInfo_DATA.name,
		description: boardInfo_DATA.description,
	});
	const [tasks, setTasks] = useState(boardTasks_2_DATA);

	const [, modalDispatch] = useContext(ModalContext);

	const openBoardMembersModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <BoardMembers />, title: "Board Members" },
		});
	};
	const openBoardTagsModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <Tags />, title: "Board Tags" },
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
			<DragDropContext onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
				<TaskProvider values={[tasks, setTasks]}>
					<TaskBoard />
				</TaskProvider>
			</DragDropContext>
		</div>
	);
};

BoardPage.propTypes = {
	boardId: PropTypes.string.isRequired
}

export default BoardPage;
