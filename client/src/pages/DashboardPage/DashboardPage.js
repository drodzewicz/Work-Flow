import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as Pin } from "assets/images/pin-full.svg";
import "./DashboardPage.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Pagination from "components/Pagination/Pagination";
import BoardCard from "components/BoardCard/BoardCard";
import Button from "components/Button/Button";
import BoardEditor from "modalForms/BoardEditor/BoardEditor";
import ContainerBox from "components/ContainerBox/ContainerBox";
import { ModalContext } from "context/ModalContext";
import fetchData from "helper/fetchData";

import { boards_DATA, pinnedBoards_DATA } from "data";

function DashboardPage() {
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: boards_DATA.length });

	const [pinnedBoards, setPinnedBoards] = useState(pinnedBoards_DATA);

	const [boards, setBoards] = useState(boards_DATA[0]);

	const [, modalDispatch] = useContext(ModalContext);

	useEffect(() => {
		const getMyBoards = async () => {
			const { data, error } = await fetchData({
				method: "GET",
				url: "/board/user/my_boards",
				token: true,
			});
			console.log(data, error);
		};
		getMyBoards();
		return () => {};
	}, []);

	const openCreateNewBoardModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: (
					<BoardEditor addBoard={addBoardToList} buttonName="Create" submitDataURL="board/post" />
				),
				title: "New Board",
			},
		});
	};

	const addBoardToList = (newBoard) => {
		setBoards((boards) => {
			const newBoardList = [...boards];
			newBoardList.splice(0, newBoard, 0);
			return newBoardList;
		});
	};

	const leaveBoard = (boardId) => {
		const indexOfBoardInBoardList = boards.findIndex(({ id }) => id === boardId);
		const indexOfBoardInPinnedBoardList = pinnedBoards.findIndex(({ id }) => id === boardId);

		if (indexOfBoardInBoardList > -1) {
			setBoards((boards) => {
				const newBoards = [...boards];
				newBoards.splice(indexOfBoardInBoardList, 1);
				return newBoards;
			});
		}

		if (indexOfBoardInPinnedBoardList > -1) {
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
					<Pin className="pin-icon" />
					<span>Pinned</span>
				</h1>
				{pinnedBoards.map(({ id, owner, title }, index) => (
					<BoardCard
						key={id}
						boardId={id}
						isPinned={true}
						pinBoard={() => togglePinBoard(-1, index)}
						leaveBoard={leaveBoard}
						boardTitle={title}
						ownerId={owner.id}
					/>
				))}
			</div>
			<div className="board-container">
				<h1 className="board-container-title">
					<DashboardIcon className="board-icon" />
					<span>Boards</span>
					<Button clicked={openCreateNewBoardModal} classes={["new-board-btn"]}>
						<AddBoxIcon />
						New Board
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
						ownerId={owner.id}
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
