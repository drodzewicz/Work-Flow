import React, { useState, useContext } from "react";
import BoardCard from "components/BoardCard/BoardCard";
import "./DashboardPage.scss";
import { ReactComponent as Pin } from "assets/images/pin-full.svg";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Pagination from "components/Pagination/Pagination";
import Button from "components/Button/Button";
import { ModalContext } from "context/ModalContext";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { NewBoard } from "modalForms";
import ContainerBox from "components/ContainerBox/ContainerBox";
import { boards_DATA, pinnedBoards_DATA } from "data";

function DashboardPage() {
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: boards_DATA.length });

	const [pinnedBoards, setPinnedBoards] = useState(pinnedBoards_DATA);

	const [boards, setBoards] = useState(boards_DATA[0]);

	const [, modalDispatch] = useContext(ModalContext);

	const openCreateNewBoardModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <NewBoard />, title: "New Board" },
		});
	};

	const leaveBoard = (boardId) => {
		const indexOfBoardInBoardList = boards.findIndex(({ id }) => id === boardId);
		const indexOfBoardInPinnedBoardList = pinnedBoards.findIndex(({ id }) => id === boardId);

		setBoards((boards) => {
			const newBoards = [...boards];
			newBoards.splice(indexOfBoardInBoardList, 1);
			return newBoards;
		});

		if(indexOfBoardInPinnedBoardList > -1) {
			setPinnedBoards((boards) => {
				const newBoards = [...boards];
				newBoards.splice(indexOfBoardInPinnedBoardList, 1);
				return newBoards;
			});
		}
	};

	const togglePinBoard = (boardIndex, pinnedBoardIndex) => {
		const foundPinnedBoardIndex =
			pinnedBoardIndex > -1
				? pinnedBoardIndex
				: pinnedBoards.findIndex((board) => board.id === boards[boardIndex].id);
		const foundBoardIndex =
			boardIndex > -1
				? boardIndex
				: boards.findIndex((board) => board.id === pinnedBoards[pinnedBoardIndex].id);

		setPinnedBoards((pinnedBoards) => {
			const tempPinnedBoards = [...pinnedBoards];

			if (boards[foundBoardIndex].pinned) {
				tempPinnedBoards.splice(foundPinnedBoardIndex, 1);
			} else {
				tempPinnedBoards.push({ ...boards[foundBoardIndex], pinned: true });
			}
			return tempPinnedBoards;
		});

		setBoards((boards) => {
			const modifiedBoards = [...boards];
			modifiedBoards[foundBoardIndex].pinned = !modifiedBoards[foundBoardIndex].pinned;
			return modifiedBoards;
		});
	};

	const changePage = (pageNumber) => {
		console.log(`fetching page [${pageNumber}]`);
		setBoards(boards_DATA[pageNumber - 1]);
		setPage((pageState) => ({ ...pageState, currentPage: pageNumber }));
	};

	return (
		<ContainerBox classes={["dashboard-container"]}>
			<div className="pinned-boards-container">
				<h1 className="board-container-title">
					<Pin />
					<span>Pinned</span>
				</h1>
				{pinnedBoards.map(({ id, owner, title }, index) => (
					<BoardCard
						key={id}
						boardId={id}
						isPinned={true}
						pinBoard={() => togglePinBoard(-1, index)}
						boardTitle={title}
						owner={owner}
					/>
				))}
			</div>
			<div className="board-container">
				<h1 className="board-container-title">
					<DashboardIcon />
					<span>Boards</span>
					<Button clicked={openCreateNewBoardModal} classes={["new-board-btn"]}>
						<AddBoxIcon />
						Create Board
					</Button>
				</h1>
				{boards.map(({ id, owner, title, pinned }, index) => (
					<BoardCard
						key={id}
						boardId={id}
						isPinned={pinned}
						pinBoard={() => togglePinBoard(index, -1)}
						leaveBoard={leaveBoard}
						boardTitle={title}
						owner={owner}
					/>
				))}
				{page.amountOfPages > 1 && (
					<Pagination
						amountOfPages={page.amountOfPages}
						currentPage={page.currentPage}
						handleChange={changePage}
					/>
				)}
			</div>
		</ContainerBox>
	);
}

export default DashboardPage;
