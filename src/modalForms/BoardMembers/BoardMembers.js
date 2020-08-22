import React, { useState, useEffect } from "react";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";
import { boardMembers_DATA, userList_DATA } from "data";

const BoardMembers = () => {
	const AMOUNT_OF_PAGES = 10;
	const MAX_USERS_PER_PAGE = 5;

	const [members, setMembers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const [dislpayMembers, setDisplayMembers] = useState([]);
	const [searchRes, setSearchRes] = useState([]);

	useEffect(() => {
		console.log("fethcing users");

		setTimeout(() => {
			setMembers(boardMembers_DATA);
		}, 2000);

		return () => {};
	}, []);

	useEffect(() => {
		const tempMembers = members.slice(
			currentPage * MAX_USERS_PER_PAGE - MAX_USERS_PER_PAGE,
			currentPage * MAX_USERS_PER_PAGE
		);
		setDisplayMembers(tempMembers);
		return () => {};
	}, [members, currentPage]);

	const dynamicSearchHandler = (data) => {
		// if (data === "") setDisplayMembers(members);
		// setDisplayMembers(members.filter((user) => user.username.includes(data)));

		console.log(`fethcing string ${data}`);
		// ... fetch to API
		const parsedResult = userList_DATA
			.filter((dbUsers) => members.findIndex((user) => user.id === dbUsers.id) < 0)
			.map((user) => ({
				...user,
				id: user.id,
				text: user.username,
			}));
		setSearchRes(parsedResult);
	};
	const changePageHandler = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const removeUserFromBoard = (memberId) => {
		setMembers((members) => {
			const tempMembers = [...members];
			const indexOfFoundMember = tempMembers.findIndex(({ id }) => id === memberId);
			tempMembers.splice(indexOfFoundMember, 1);
			return tempMembers;
		});
	};
	const addUserToBoardHandler = (user) => {
		setSearchRes([]);
		const tempUsers = [...members];
		tempUsers.push({...user, userType: "regular"});
		// ..
		setMembers(tempUsers);
	};
	const clearSearchResults = () => {
		setSearchRes([]);
	};

	const changeUserRole = (userId, newRole) => {
		const foundUserIndex = members.findIndex(({ id }) => id === userId);
		setMembers((members) => {
			const newMembers = [...members];
			newMembers[foundUserIndex].userType = newRole;
			return newMembers;
		});
	};

	return (
		<div className="board-members-modal">
			<AutoCompleteInput
				execMethod={dynamicSearchHandler}
				timeout={500}
				searchResult={searchRes}
				clickResult={addUserToBoardHandler}
				clearResults={clearSearchResults}
			/>
			<div className="user-container">
				{dislpayMembers.map(({ id, username, imageURL, userType }) => (
					<BoardMemberUser
						key={id}
						removeUser={() => removeUserFromBoard(id)}
						userId={id}
						username={username}
						imageURL={imageURL}
						userType={userType}
						ownerAuth={true}
						adminAuth={true}
						changeUserRole={changeUserRole}
					/>
				))}
			</div>
			<Pagination
				amountOfPages={AMOUNT_OF_PAGES}
				currentPage={currentPage}
				handleChange={changePageHandler}
			/>
		</div>
	);
};

export default BoardMembers;
