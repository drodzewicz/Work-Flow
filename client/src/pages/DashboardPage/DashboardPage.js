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
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";

// import { pinnedBoards_DATA } from "data";

function DashboardPage() {
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: 1 });
	const [pinnedBoards, setPinnedBoards] = useState([]);
	const [boards, setBoards] = useState([]);
	const [isLoadingBoards, setLoadingBoards] = useState(false);
	const [, modalDispatch] = useContext(ModalContext);

	useEffect(() => {
		const getPinnedBoards = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: "/board/user/pined_boards",
				token: true,
			});
			if (!!data) setPinnedBoards(data);
		};
		getPinnedBoards();
		return () => {};
	}, []);

	useEffect(() => {
		const getMyBoards = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/user/my_boards?page=${page.currentPage}&limit=8`,
				token: true,
				setLoading: setLoadingBoards,
			});
			if (!!data) {
				setPage((prevState) => ({ ...prevState, amountOfPages: data.totalPageCount }));
				setBoards(data.items);
			}
		};
		getMyBoards();
		return () => {};
	}, [page.currentPage]);

	const openCreateNewBoardModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: (
					<BoardEditor submitDataURL="/board" buttonName="Create" />
				),
				title: "New Board",
			},
		});
	};

	const removeBoard = (boardId) => {
		const indexOfBoardInBoardList = boards.findIndex(({ _id }) => _id === boardId);
		const indexOfBoardInPinnedBoardList = pinnedBoards.findIndex(({ _id }) => _id === boardId);

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

	const togglePinBoard = async (boardIndex, pinnedBoardIndex) => {
		const foundPinnedBoardIndex =
			pinnedBoardIndex > -1
				? pinnedBoardIndex
				: pinnedBoards.findIndex((board) => board._id === boards[boardIndex]._id);
		const foundBoardIndex =
			boardIndex > -1
				? boardIndex
				: boards.findIndex((board) => board._id === pinnedBoards[pinnedBoardIndex]._id);

		const { data, error } = await fetchData({
			method: "PATCH",
			url: `/board/user/pined_boards?boardId=${boards[foundBoardIndex]._id}`,
			token: true,
		});

		console.log(data, error);

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
		setPage((pageState) => ({ ...pageState, currentPage: pageNumber }));
	};

	return (
		<ContainerBox classes={["dashboard-container"]}>
			<div className="pinned-boards-container">
				<h1 className="board-container-title">
					<Pin className="pin-icon" />
					<span>Pinned</span>
				</h1>
				{pinnedBoards.map(({ _id, author, name, description, members }, index) => (
					<BoardCard
						key={_id}
						boardId={_id}
						isPinned={true}
						pinBoard={() => togglePinBoard(-1, index)}
						removeBoard={removeBoard}
						boardInfo={{ name, description, members }}
						ownerId={author}
					/>
				))}
			</div>
			<div className="board-container-wrapper">
				<h1 className="board-container-title">
					<DashboardIcon className="board-icon" />
					<span>Boards</span>
					<Button clicked={openCreateNewBoardModal} classes={["new-board-btn"]}>
						<AddBoxIcon />
						New Board
					</Button>
				</h1>
				<LoadingOverlay show={isLoadingBoards} />
				{!isLoadingBoards && (
					<div className="board-container">
						{boards.map(({ _id, author, pinned, name, description, members }, index) => (
							<BoardCard
								key={_id}
								boardId={_id}
								isPinned={pinned}
								pinBoard={() => togglePinBoard(index, -1)}
								removeBoard={removeBoard}
								boardInfo={{ name, description, members }}
								ownerId={author}
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
				)}
			</div>
		</ContainerBox>
	);
}

export default DashboardPage;
