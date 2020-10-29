import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as Pin } from "assets/images/pin-full.svg";
import "./DashboardPage.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Button from "components/Button/Button";
import BoardEditor from "modalForms/BoardEditor/BoardEditor";
import ContainerBox from "components/ContainerBox/ContainerBox";
import { ModalContext } from "context/ModalContext";
import fetchData from "helper/fetchData";

import MyBoardContainer from "./MyBoardContainer";


function DashboardPage() {
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: 1 });
	const [pinnedBoards, setPinnedBoards] = useState({items: [], isLoading: false});
	const [boards, setBoards] = useState({items: [], isLoading: false});
	const [, modalDispatch] = useContext(ModalContext);

	const boardLoadingHandler = (setState, loadingState) => {
		setState(prevState => ({...prevState, isLoading: loadingState}))
	}

	useEffect(() => {
		const getPinnedBoards = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: "/board/user/pined_boards",
				token: true,
				setLoading: (loadingState) => boardLoadingHandler(setPinnedBoards, loadingState),
			});
			if (!!data) setPinnedBoards(prevState => ({...prevState, items: data}));
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
				setLoading: (loadingState) => boardLoadingHandler(setBoards, loadingState),
			});
			if (!!data) {
				setPage((prevState) => ({ ...prevState, amountOfPages: data.totalPageCount }));
				setBoards(prevState => ({...prevState, items: data.items}));
			}
		};
		getMyBoards();
		return () => {};
	}, [page.currentPage]);

	const openCreateNewBoardModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: {
				render: <BoardEditor submitType="Create" />,
				title: "New Board",
			},
		});
	};

	const removeBoard = (boardId) => {
		const indexOfBoardInBoardList = boards.items.findIndex(({ _id }) => _id === boardId);
		const indexOfBoardInPinnedBoardList = pinnedBoards.items.findIndex(({ _id }) => _id === boardId);

		if (indexOfBoardInBoardList > -1) {
			setBoards((boards) => {
				const newBoards = [...boards.items];
				newBoards.splice(indexOfBoardInBoardList, 1);
				return ({...boards, items: newBoards});
			});
		}

		if (indexOfBoardInPinnedBoardList > -1) {
			setPinnedBoards((boards) => {
				const newBoards = [...boards.items];
				newBoards.splice(indexOfBoardInPinnedBoardList, 1);
				return ({...boards, items: newBoards });
			});
		}
	};

	const togglePinBoard = async (boardIndex, pinnedBoardIndex) => {
		const foundPinnedBoardIndex =
			pinnedBoardIndex > -1
				? pinnedBoardIndex
				: pinnedBoards.items.findIndex((board) => board._id === boards.items[boardIndex]._id);
		const foundBoardIndex =
			boardIndex > -1
				? boardIndex
				: boards.items.findIndex((board) => board._id === pinnedBoards.items[pinnedBoardIndex]._id);
		const { data } = await fetchData({
			method: "PATCH",
			url: `/board/user/pined_boards?boardId=${boards.items[foundBoardIndex]._id}`,
			token: true,
		});
		if (!!data) {
			setPinnedBoards((pinnedBoards) => {
				const tempPinnedBoards = [...pinnedBoards.items];

				if (boards.items[foundBoardIndex].pinned) {
					tempPinnedBoards.splice(foundPinnedBoardIndex, 1);
				} else {
					tempPinnedBoards.push({ ...boards.items[foundBoardIndex], pinned: true });
				}
				return ({...pinnedBoards, items: tempPinnedBoards});
			});

			setBoards((boards) => {
				const modifiedBoards = [...boards.items];
				modifiedBoards[foundBoardIndex].pinned = !modifiedBoards[foundBoardIndex].pinned;
				return ({...boards, items: modifiedBoards});
			});
		}
	};

	const changePage = (pageNumber) => {
		setPage((pageState) => ({ ...pageState, currentPage: pageNumber }));
	};

	return (
		<ContainerBox classes={["dashboard-container"]}>
			<MyBoardContainer
				classes={["pinned-boards"]}
				title={"Pinned"}
				renderIcon={<Pin className="pin-icon" />}
				boardList={pinnedBoards.items}
				isLoading={pinnedBoards.isLoading}
				removeBoard={removeBoard}
				togglePinBoard={(index) => togglePinBoard(-1, index)}
				emptyMessage={"you have no pinned boards"}
			/>
			<Button clicked={openCreateNewBoardModal} classes={["new-board-btn"]}>
				<AddBoxIcon />
				New Board
			</Button>
			<MyBoardContainer
				classes={["main-boards"]}
				title={"Boards"}
				renderIcon={<DashboardIcon className="board-icon" />}
				boardList={boards.items}
				isLoading={boards.isLoading}
				removeBoard={removeBoard}
				changePage={changePage}
				page={page}
				togglePinBoard={(index) => togglePinBoard(index, -1)}
				emptyMessage={"you are not a part of any board"}
			/>
		</ContainerBox>
	);
}

export default DashboardPage;
