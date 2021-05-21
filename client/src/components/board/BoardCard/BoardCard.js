import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as Pin } from "assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import "./BoardCard.scss";
import BoardOptions from "./BoardOptions";

const BoardCard = ({ boardInfo, boardId, isPinned, pinBoard, removeBoard, isAuthor }) => {
	const history = useHistory();


	const togglePinBoard = (e) => {
		e.stopPropagation();
		pinBoard();
	};


	const goToBoard = () => {
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
				<h1 onClick={goToBoard} className="board-title">
					{boardInfo.name}
				</h1>
				<div className="board-menu">
					{isPinned ? (
						<Pined className="pin-icon" onClick={togglePinBoard} />
					) : (
							<Pin className="pin-icon" onClick={togglePinBoard} />
						)}
					<BoardOptions
						boardId={boardId}
						removeBoardCallback={removeBoard}
						isAuthor={isAuthor}
					/>
				</div>
			</div>
		</div>
	);
};

BoardCard.propTypes = {
	isPinned: false,
	isAuthor: false,
};
BoardCard.propTypes = {
	boardInfo: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
		members: PropTypes.array,
	}).isRequired,
	isPinned: PropTypes.bool,
	pinBoard: PropTypes.func.isRequired,
	removeBoard: PropTypes.func.isRequired,
	boardId: PropTypes.string.isRequired,
	isAuthor: PropTypes.bool,
};

export default BoardCard;
