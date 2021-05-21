import React from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import Pagination from "components/general/Pagination/Pagination";
import BoardCard from "components/board/BoardCard/BoardCard";
import "./MyBoardContainer.scss";

const MyBoardContainer = ({
	title,
	renderIcon,
	boardList,
	isLoading,
	togglePinBoard,
	removeBoard,
	page,
	changePage,
	classes,
	emptyMessage,
}) => {
	return (
		<div className={`board-container-wrapper ${classes.join(" ")}`}>
			<h1 className="board-container-title">
				{renderIcon}
				<span>{title}</span>
			</h1>
			<LoadingOverlay show={isLoading} opacity={0}>
				<div className="board-container">
					{boardList.map(({ _id, pinned, name, description, members, isAuthor }, index) => (
						<BoardCard
							key={_id}
							boardId={_id}
							isPinned={pinned}
							pinBoard={() => togglePinBoard(index)}
							removeBoard={removeBoard}
							boardInfo={{ name, description, members }}
							isAuthor={isAuthor}
						/>
					))}
					{boardList.length < 1 && <div className="empty-board">{emptyMessage}</div>}
				</div>
			</LoadingOverlay>
			{!!page && (
				<Pagination
					amountOfPages={page.amountOfPages}
					currentPage={page.currentPage}
					handleChange={changePage}
				/>
			)}
		</div>
	);
};

MyBoardContainer.defaultProps = {
	isLoading: false,
	changePage: undefined,
	page: undefined,
	classes: [""],
	emptyMessage: "empty",
};

MyBoardContainer.propTypes = {
	title: PropTypes.string.isRequired,
	renderIcon: PropTypes.object.isRequired,
	boardList: PropTypes.array.isRequired,
	isLoading: PropTypes.bool,
	togglePinBoard: PropTypes.func.isRequired,
	removeBoard: PropTypes.func.isRequired,
	changePage: PropTypes.func,
	classes: PropTypes.arrayOf(PropTypes.string),
	emptyMessage: PropTypes.string,
	page: PropTypes.shape({ amountOfPages: PropTypes.number, currentPage: PropTypes.number }),
};

export default MyBoardContainer;
