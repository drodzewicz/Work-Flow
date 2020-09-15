import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ReactComponent as Pin } from "assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import "./BoardCard.scss";
import { ModalContext } from "context/ModalContext";
import fetchData from "helper/fetchData";
import BoardEditor from "modalForms/BoardEditor/BoardEditor";

const BoardCard = ({ boardInfo, boardId, isPinned, pinBoard, removeBoard, isAuthor }) => {
	const history = useHistory();

	const [, modalDispatch] = useContext(ModalContext);

	const anchorElement = useRef();

	const togglePinBoard = (e) => {
		e.stopPropagation();
		pinBoard();
	};

	const editEventModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: (
					<BoardEditor
						buttonName="Update"
						submitDataURL={`/board/${boardId}`}
						initialValues={{
							id: boardId,
							name: boardInfo.name,
							description: boardInfo.description,
							members: boardInfo.members
								.filter(({ role }) => role !== "owner")
								.map(({ user }) => user),
						}}
					/>
				),
				title: "Edit Board",
			},
		});
	};

	const deleteBoardHandler = async () => {
		const { error } = await fetchData({
			method: "DELETE",
			url: `/board/${boardId}`,
			token: true,
		});
		if (!error) removeBoard(boardId);
	};
	const leavingEvent = async () => {
		const { error } = await fetchData({
			method: "DELETE",
			url: `/board/${boardId}/leave_board`,
			token: true,
		});
		if (!error) removeBoard(boardId);
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
					{boardInfo.name}
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
				{isAuthor && <span onClick={editEventModal}>edit</span>}
				{isAuthor && <span onClick={deleteBoardHandler}>delete</span>}
				{!isAuthor && <span onClick={leavingEvent}>leave</span>}
			</DropdownMenu>
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
