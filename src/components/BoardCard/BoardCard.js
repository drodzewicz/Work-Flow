import React, { useState, useRef } from "react";
import "./BoardCard.scss";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ReactComponent as Pin } from "assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";

const BoardCard = ({ boardTitle, isPinned, pinBoard, boardId, owner }) => {
	const history = useHistory();

	const anchorElement = useRef();

	const togglePinBoard = (e) => {
		e.stopPropagation();
		pinBoard();
	};
	const editEventModal = (e) => {
		e.stopPropagation();
		console.log("editing event");
	};
	const deleteBoardHandler = (e) => {
		e.stopPropagation();
		console.log("deleteing event");
	};
	const leavingEvent = (e) => {
		e.stopPropagation();
		console.log("leave event");
	};
	const gToBoard = () => {
		history.push(`/board/${boardId}`);
	};

	return (
		<div className="board-card">
			<div className="bg-columns">
				<div className="column"></div>
				<div className="column"></div>
				<div className="column"></div>
				<div className="column"></div>
			</div>
			<div className="board-card-body" >
				<h1 onClick={gToBoard} className="board-title">{boardTitle}</h1>
				<div className="board-menu">
					{isPinned ? <Pined onClick={togglePinBoard} /> : <Pin onClick={togglePinBoard} />}
					<MoreVertIcon ref={anchorElement} />
				</div>
			</div>
			<DropdownMenu anchorEl={anchorElement}>
				{owner === "currentUser" ? (
					<>
						<span onClick={editEventModal}>edit</span>
						<span onClick={deleteBoardHandler}>delete</span>
					</>
				) : (
					<span onClick={leavingEvent}>leave</span>
				)}
			</DropdownMenu>
		</div>
	);
};

export default BoardCard;
