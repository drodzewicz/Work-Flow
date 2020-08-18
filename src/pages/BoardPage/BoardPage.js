import React, { useState, useContext } from "react";
import TaskColumn from "components/Task/TaskColumn";
import "./BoardPage.scss";
import ExpandText from "components/ExpandText/ExpandText";
import Button from "components/Button/Button";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ModalContext } from "context/ModalContext";
import { BoardMembers, TagForm } from "modalForms";

const BoardPage = ({ boardId }) => {
	const [newColumn, setNewColumn] = useState("");

	const [boardInfo] = useState({
		name: "testing new reat features",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore cum odit, reprehenderit exercitationem tempora perspiciatis nemo cumque ",
	});
	const [columns, setColumns] = useState([
		{
			id: "COL1",
			columnName: "test 1",
			listOfTasks: [
				{
					id: "TSK1",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK2",
					name: "task2",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK3",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
			],
		},
		{
			id: "COL2",
			columnName: "test 2",
			listOfTasks: [
				{
					id: "TSK1",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK2",
					name: "task2",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK3",
					name: "task2",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK4",
					name: "task2",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK5",
					name: "task2",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK6",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK7",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK8",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK9",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
			],
		},
		{
			id: "COL3",
			columnName: "test 3",
			listOfTasks: [
				{
					id: "TSK1",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK2",
					name: "task2",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
				{
					id: "TSK3",
					name: "task1",
					dueDate: "2020-11-20",
					tags: ["#D74530", "#25D68F"],
					people: [
						{ id: "use1", username: "user1", imageLink: "kke" },
						{ id: "use2", username: "user2", imageLink: "kke" },
					],
				},
			],
		},
	]);

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
			console.log("creating new column");
			setNewColumn("");
			const submittedColumn = {
				id: newColumn,
				columnName: newColumn,
				listOfTasks: [],
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
	const removeTask = (columnIndex, taskIndex) => {
		setColumns((columns) => {
			const tempColumns = [...columns];
			tempColumns[columnIndex].listOfTasks.splice(taskIndex, 1);
			return tempColumns;
		});
		modalDispatch({ type: "CLOSE" });
	};

	return (
		<div className="board-page">
			{/* <h1 className="board-title">{boardInfo.name}</h1> */}
			<ExpandText classes={["board-title"]} text={boardInfo.name}>
				<div>
					hallo Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum rem tempore ex numquam
					expedita. Blanditiis error eum officia unde, velit adipisci provident, doloribus, id
					quisquam harum reprehenderit ipsa! Earum reprehenderit accusamus ipsum ipsa voluptate
					voluptatum corrupti ratione, doloribus, doloremque amet magni adipisci? Recusandae
					nesciunt laborum assumenda saepe quo facere dolor!
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
			<div className="board-page-container">
				{columns.map(({ id, listOfTasks, columnName }, index) => (
					<span key={id}>
						<TaskColumn
							columnIndex={index}
							removeTask={removeTask}
							removeColumn={() => removeColum(index)}
							columnName={columnName}
							listOfTasks={listOfTasks}
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
		</div>
	);
};

export default BoardPage;
