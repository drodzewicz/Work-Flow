import React, { useState, useEffect } from "react";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";
import {  userList_DATA } from "data";
import PropTypes from "prop-types";
import fetchData from "helper/fetchData";

const BoardMembers = ({ boardId }) => {

	const [members, setMembers] = useState([]);
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: 1 });

	const [searchRes, setSearchRes] = useState([]);

	useEffect(() => {
		const fetchBoardMembers = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/members?limit=5&page=${page.currentPage}`,
				token: true,
			});
			console.log(data);
			if (!!data) {
				const {totalPageCount, items} = data; 
				setPage( pages => ({ ...pages, amountOfPages: totalPageCount}));
				setMembers(items);
			}
			// if (!!data) setMembers(data);
		};
		fetchBoardMembers();
		return () => {};
	}, [boardId, page.currentPage]);


	const dynamicSearchHandler = (data) => {
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
		setPage( pages => ({ ...pages, currentPage: pageNumber}));
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
		tempUsers.push({ ...user, userType: "regular" });
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
				{members.map(({ user, role }) => (
					<BoardMemberUser
						key={user._id}
						removeUser={() => removeUserFromBoard(user._id)}
						userId={user._id}
						username={user.username}
						imageURL={user.avatarImageURL}
						userType={role}
						changeUserRole={changeUserRole}
					/>
				))}
			</div>
			<Pagination
				amountOfPages={page.amountOfPages}
				currentPage={page.currentPage}
				handleChange={changePageHandler}
			/>
		</div>
	);
};

BoardMembers.propTypes = {
	boardId: PropTypes.string.isRequired,
};

export default BoardMembers;
