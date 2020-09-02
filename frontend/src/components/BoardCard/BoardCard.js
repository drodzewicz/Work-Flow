import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ReactComponent as Pin } from "assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import "./BoardCard.scss";

const BoardCard = ({ boardTitle, isPinned, pinBoard, leaveBoard, boardId, ownerId }) => {
	const history = useHistory();

	const anchorElement = useRef();

	const togglePinBoard = (e) => {
		e.stopPropagation();
		pinBoard();
	};
	const editEventModal = (e) => {
		e.stopPropagation();
	};
	const deleteBoardHandler = (e) => {
		e.stopPropagation();
	};
	const leavingEvent = (e) => {
		e.stopPropagation();
		leaveBoard(boardId);
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
			<div className="board-card-body">
				<h1 onClick={gToBoard} className="board-title">
					{boardTitle}
				</h1>
				<div className="board-menu">
					{isPinned ? (
						<Pined className="pin-icon" onClick={togglePinBoard} />
					) : (
						<Pin className="pin-icon" onClick={togglePinBoard} />
					)}
					<MoreVertIcon ref={anchorElement} />
				</div>
			</div>
			<DropdownMenu anchorEl={anchorElement}>
				{ownerId === "currentUser" ? (
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

BoardCard.propTypes = {
	isPinned: false,
};
BoardCard.propTypes = {
	boardTitle: PropTypes.string.isRequired,
	isPinned: PropTypes.bool,
	pinBoard: PropTypes.func.isRequired,
	leaveBoard: PropTypes.func.isRequired,
	boardId: PropTypes.string.isRequired,
	ownerId: PropTypes.string.isRequired
};

export default BoardCard;
