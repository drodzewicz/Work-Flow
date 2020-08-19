import React, { useContext, useRef } from "react";
import "./Task.scss";
import Image from "components/Image/Image";
import { TaskDisplay } from "modalForms";
import { ModalContext } from "context/ModalContext";
import Tooltip from "components/Tooltip/Tooltip";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "utils/items";

const Task = ({ taskId, name, index, columnIndex, tags, moveItem, people, removeTask, move2 }) => {
	const [, modalDispatch] = useContext(ModalContext);

	const poepleAnchorElement = useRef();
	const tagsAnchorElement = useRef();
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: ItemTypes.TASK_CARD,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.taskIndex;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoveredRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
			const mousePosition = monitor.getClientOffset();
			const hoverClientY = mousePosition.y - hoveredRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// console.log(`dragIndex: ${dragIndex}, hoverIndex: ${hoverIndex}`)
			// move2({ col: columnIndex, task: dragIndex }, { col: columnIndex, task: hoverIndex });
			// console.log(`hovering over [${name.substring(0, 6)}]`)
			moveItem(taskId, item.id);
			item.taskIndex = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item: {
			type: ItemTypes.TASK_CARD,
			id: taskId,
			taskIndex: index,
			columnIndex,
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	const openTaskDetailsModal = (event) => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <TaskDisplay taskId={taskId} removeTask={removeTask} />,
				title: "Task Details",
			},
		});
	};

	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className="task-card"
			onClick={openTaskDetailsModal}
		>
			<h3 className="task-title">{name}</h3>
			<div className="card-bottom">
				<div className="task-tags">
					<div className="tags" ref={tagsAnchorElement}>
						{tags &&
							tags.map(({ color, id, name }) => (
								<div key={id} className={`tag-mini ${color}`}></div>
							))}
					</div>
				</div>
				<Tooltip anchorEl={tagsAnchorElement}>
					{tags && tags.map(({ id, name }) => <span key={id}>{name}</span>)}
				</Tooltip>
				<div className="task-people" ref={poepleAnchorElement}>
					{people &&
						people.map(({ id, imageURL }) => (
							<Image key={id} classes={["avatar"]} imageURL={imageURL} />
						))}
				</div>
				<Tooltip anchorEl={poepleAnchorElement}>
					{people && people.map(({ id, username }) => <span key={id}>{username}</span>)}
				</Tooltip>
			</div>
		</div>
	);
};

export default Task;
