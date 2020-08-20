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
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: 3 });

	const [pinnedBoards, setPinnedBoards] = useState(pinnedBoards_DATA);

	const [boards, setBoards] = useState(boards_DATA[0]);

	const [, modalDispatch] = useContext(ModalContext);

	const openCreateNewBoardModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <NewBoard />, title: "New Board" },
		});
	};

	const pinBoard = (boardId) => {
		const foundBoardIndex = boards.findIndex((board) => board.id === boardId);
		setPinnedBoards((pinnedBoards) => {
			const tempBoards = [...pinnedBoards];
			pinnedBoards.push(boards[foundBoardIndex]);
			return tempBoards;
		});
		setBoards((boards) => {
			const tempBoards = [...boards];
			tempBoards.splice(foundBoardIndex, 1);
			return tempBoards;
		});
	};

	const unPinBoard = (boardId) => {
		const foundBoardIndex = pinnedBoards.findIndex((board) => board.id === boardId);
		setPinnedBoards((boards) => {
			const tempBoards = [...boards];
			tempBoards.splice(foundBoardIndex, 1);
			return tempBoards;
		});
	};
	const changePage = (pageNumber) => {
		console.log(`fetching page [${pageNumber}]`);
		setPage((pageState) => ({ ...pageState, currentPage: pageNumber }));
	};

	return (
		<ContainerBox classes={["dashboard-container"]}>
			<div className="pinned-boards-container">
				<h1 className="board-container-title">
					<Pin />
					<span>Pinned</span>
				</h1>
				{pinnedBoards.map(({ id, owner, title }) => (
					<BoardCard
						key={id}
						boardId={id}
						isPinned={true}
						pinBoard={() => unPinBoard(id)}
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
				{boards.map(({ id, owner, title }) => (
					<BoardCard
						key={id}
						boardId={id}
						isPinned={false}
						pinBoard={() => pinBoard(id)}
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
