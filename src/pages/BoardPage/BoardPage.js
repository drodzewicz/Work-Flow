import React, { useState, useContext } from "react";
import TaskColumn from "components/Task/TaskColumn";
import "./BoardPage.scss";
import ExpandText from "components/ExpandText/ExpandText";
import Button from "components/Button/Button";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext } from "context/ModalContext";
import { BoardMembers, TagForm } from "modalForms";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { boardTasks_DATA, taskColumns_DATA, boardInfo_DATA } from "data";

const BoardPage = ({ boardId }) => {
	const [newColumn, setNewColumn] = useState("");

	const [boardInfo] = useState({
		name: boardInfo_DATA.name,
		description: boardInfo_DATA.description,
	});
	const [tasks, setTasks] = useState(boardTasks_DATA);

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
			};
			setColumns((columns) => {
				const tempColumns = [...columns];
				tempColumns.push(submittedColumn);
				return tempColumns;
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

	// const moveItem = (originColumnIndex, originTaskIndex, toColumnIndex, toTaskIndex) => {
	// 	console.log(
	// 		`moving task [${originColumnIndex}|${originTaskIndex}] => [${toColumnIndex}|${toTaskIndex}]`
	// 	);
	// };

	// const moveItem2 = (prevIndex, hoverIndex) => {
	// 	console.log(prevIndex, hoverIndex);
	// 	setColumns((columns) => {
	// 		const tempColumns = [...columns];
	// 		const draggableTask = tempColumns[prevIndex.col].listOfTasks[prevIndex.task];
	// 		tempColumns[prevIndex.col].listOfTasks.splice(prevIndex.task, 1);
	// 		tempColumns[hoverIndex.col].listOfTasks.splice(hoverIndex.task, 0, draggableTask);
	// 		return tempColumns;
	// 	});
	// };

	return (
		<div className="board-page">
			<ExpandText classes={["board-title"]} text={boardInfo.name}>
				<div>
				{boardInfo.description}
				</div>
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
			<DndProvider backend={HTML5Backend}>
				<div className="board-page-container">
					{columns.map(({ id, name }, index) => (
						<span key={id}>
							<TaskColumn
								columnIndex={index}
								removeTask={removeTask}
								removeColumn={() => removeColum(index)}
								columnName={name}
								listOfTasks={tasks.filter(({ column }) => column.id === id)}
							/>
						</span>
					))}
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
				</div>
			</DndProvider>
		</div>
	);
};

export default BoardPage;
