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

const tempBoards = [
	[
		{
			id: "1bdwd",
			title: "Jeden liczmy po kolei",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "dwdwd2",
			title: "klitarok eta rok grupa",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "gt4dw2",
			title: "cos nowego ej ej",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "fegg35",
			title: "piecdziesait",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "fef3367ff",
			title: "solevita sok jablkowy",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "346bdfefwd",
			title: "mnogoznal ne budet doszsc",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "fef577",
			title: "budu smejatsa wsem na zlo",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "fef224a4r",
			title: "koko xDDDD",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
	],
	[
		{
			id: "gfgf567bg",
			title: "mnogoznal ne budet doszsc",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "fefggrrg6775g77",
			title: "budu smejatsa wsem na zlo",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "fef224grrjkk00a4r",
			title: "koko xDDDD",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "dwdwd",
			title: "Jeden po kolei",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "dddd355",
			title: "klitarok eta rok grupa",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "34gggr7",
			title: "cos nowego ej ej",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "4535cdfdg7",
			title: "piecdziesait",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "454535ggfg",
			title: "solevita sok jablkowy",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
	],
	[
		{
			id: "gggttuu6888",
			title: "klitarok eta rok grupa",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "346bdfrrgrgefwd",
			title: "mnogoznal ne budet doszsc",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "rgrg6886",
			title: "budu smejatsa wsem na zlo",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "fegdgdg5775f224a4r",
			title: "Lekko",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
		{
			id: "1bhttjjjjujjdwd",
			title: "Jeden liczmy po kolei",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "gt455dhh134w2",
			title: "cos nowego ej ej",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "fe444gg3ff5",
			title: "piecdziesait",
			owner: { id: "kek123", username: "user1" },
			pinned: true,
		},
		{
			id: "fef33ggjk67ff",
			title: "solevita sok jablkowy",
			owner: { id: "kek123", username: "user1" },
			pinned: false,
		},
	],
];

function DashboardPage() {
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: 3 });

	const [pinnedBoards, setPinnedBoards] = useState([
		{
			id: "1bdwd",
			title: "Jeden liczmy po kolei",
			owner: { id: "kek123", username: "user1" },
		},
		{
			id: "dwdwd2",
			title: "klitarok eta rok grupa",
			owner: { id: "kek123", username: "user1" },
		},
		{
			id: "gt4dw2",
			title: "cos nowego ej ej",
			owner: { id: "kek123", username: "user1" },
		},
		{
			id: "fegg35",
			title: "piecdziesait",
			owner: { id: "kek123", username: "user1" },
		},
	]);

	const [boards, setBoards] = useState(tempBoards[0]);

	const [, modalDispatch] = useContext(ModalContext);

	const openCreateNewBoardModal = () => {
		modalDispatch({
			type: "OPEN",
			payload: { render: <NewBoard />, title: "New Board" },
		});
	};

	const pinBoard = (boardId) => {
    const foundBoardIndex = boards.findIndex((board) => board.id === boardId);
    setPinnedBoards( pinnedBoards => {
      const tempBoards = [...pinnedBoards];
      pinnedBoards.push(boards[foundBoardIndex]);
      return tempBoards;
    });
    setBoards( boards => {
      const tempBoards = [...boards];
      tempBoards.splice(foundBoardIndex, 1);
      return tempBoards;
    });
  };
  
  const unPinBoard = (boardId) => {
    const foundBoardIndex = pinnedBoards.findIndex((board) => board.id === boardId);
    setPinnedBoards( boards => {
      const tempBoards = [...boards];
      tempBoards.splice(foundBoardIndex, 1);
      return tempBoards;
    });
  }
	const changePage = (pageNumber) => {
		console.log(`fetching page [${pageNumber}]`);
		setPage((pageState) => ({ ...pageState, currentPage: pageNumber }));
	};

	return (
		<div className="dashboard-container">
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
		</div>
	);
}

export default DashboardPage;
