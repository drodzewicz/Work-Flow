import React, { useState, useContext } from "react";
import TaskColumn from "components/Task/TaskColumn";
import TaskColumnDraggable from "components/Task/DraggableColumn";
import "./BoardPage.scss";
import ExpandText from "components/ExpandText/ExpandText";
import Button from "components/Button/Button";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext } from "context/ModalContext";
import { BoardMembers, TagForm } from "modalForms";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { boardTasks_DATA, taskColumns_DATA, boardInfo_DATA, boardTasks_2_DATA } from "data";

const onDragEnd = (result, tasks, setTasks) => {
	if (!result.destination) return;
	console.log(result);
	const { source, destination, type } = result;

	console.log(result);

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
	const [newColumn, setNewColumn] = useState("");

	const [boardInfo] = useState({
		name: boardInfo_DATA.name,
		description: boardInfo_DATA.description,
	});
	const [tasks, setTasks] = useState(boardTasks_2_DATA);

	const [columns, setColumns] = useState(taskColumns_DATA);

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
			payload: { render: <TagForm />, title: "Board Tags" },
		});
	};
	const handleNewColumnChange = (event) => {
		setNewColumn(event.target.value);
	};
	const createNewColumn = (event) => {
		if (event.key === "Enter" && newColumn !== "") {
			setNewColumn("");
			const submittedColumn = {
				id: newColumn,
				name: newColumn,
				tasks: [],
			};
			setTasks((tasks) => {
				const tempTasks = [...tasks];
				tempTasks.push(submittedColumn);
				return tempTasks;
			});
		}
	};
	const removeColum = (columnIndex) => {
		setColumns((columns) => {
			const tempColumns = [...columns];
			tempColumns.splice(columnIndex, 1);
			return tempColumns;
		});
	};
	const removeTask = (taskId) => {
		setTasks((tasks) => {
			const tempTasks = [...tasks];
			const foundIndexOfTask = tempTasks.findIndex(({ id }) => id === taskId);
			tempTasks.splice(foundIndexOfTask, 1);
			return tempTasks;
		});
		modalDispatch({ type: "CLOSE" });
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
				<Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
					{(provided, snapshot) => {
						return (
							<div className="board-page-container" ref={provided.innerRef}>
								{tasks.map(({ id, name, tasks }, index) => (
									<span key={id}>
										<TaskColumnDraggable
											columnId={id}
											columnIndex={index}
											removeTask={removeTask}
											removeColumn={() => removeColum(index)}
											columnName={name}
											listOfTasks={tasks}
										/>
									</span>
								))}
								{provided.placeholder}
							</div>
						);
					}}
				</Droppable>
				<div>
					<div className="add-new-column">
						<input
							onKeyDown={createNewColumn}
							value={newColumn}
							onChange={handleNewColumnChange}
							type="text"
							placeholder="+ new column"
						/>
					</div>
				</div>
			</DragDropContext>
		</div>
	);
};

export default BoardPage;
