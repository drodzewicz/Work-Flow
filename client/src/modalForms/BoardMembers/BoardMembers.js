import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";
import PropTypes from "prop-types";
import fetchData from "helper/fetchData";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";

const BoardMembers = ({ boardId }) => {
	const USER_LIMIT = 5;
	const [members, setMembers] = useState([]);
	const [page, setPage] = useState({ currentPage: 1, amountOfPages: 1 });
	const [isPageLoading, setPageLoading] = useState(true);
	const [searchRes, setSearchRes] = useState([]);
	const [{ currentBoard }] = useContext(UserContext);

	useEffect(() => {
		let _isMounted = true;

		const fetchBoardMembers = async () => {
			const { data } = await fetchData({
				method: "GET",
				url: `/board/${boardId}/members?limit=${USER_LIMIT}&page=${page.currentPage}`,
				token: true,
			});
			if (_isMounted) setPageLoading(false);
			if (!!data && _isMounted) {
				const { totalPageCount, items } = data;
				setPage((pages) => ({ ...pages, amountOfPages: totalPageCount }));
				setMembers(items);
			}
		};
		fetchBoardMembers();
		return () => {
			_isMounted = false;
		};
	}, [boardId, page.currentPage]);

	const dynamicSearchHandler = async (username) => {
		const { data } = await fetchData({
			method: "GET",
			url: `/user/find_user?username=${username}`,
			token: true,
		});
		if (!!data) {
			const parsedResult = data.map((user) => ({
				...user,
				text: user.username,
			}));
			setSearchRes(parsedResult);
		}
	};
	const changePageHandler = (pageNumber) => {
		setPage((pages) => ({ ...pages, currentPage: pageNumber }));
	};
	const removeUserFromBoard = async (memberId) => {
		const { data } = await fetchData({
			method: "DELETE",
			url: `/board/${boardId}/members/${memberId}`,
			token: true,
		});
		if (!!data) {
			setMembers((members) => {
				const tempMembers = [...members];
				const indexOfFoundMember = tempMembers.findIndex(({ id }) => id === memberId);
				tempMembers.splice(indexOfFoundMember, 1);
				return tempMembers;
			});
		}
	};
	const addUserToBoardHandler = async (user) => {
		setSearchRes([]);
		const { data } = await fetchData({
			method: "PATCH",
			url: `/board/${boardId}/members?userId=${user._id}`,
			token: true,
		});
		if (!!data && members.length < USER_LIMIT) {
			setMembers((members) => {
				const tempUsers = [...members];
				tempUsers.push({ user, role: "regular" });
				return tempUsers;
			});
		}
	};
	const clearSearchResults = () => {
		setSearchRes([]);
	};
	const changeUserRole = async (userId, newRole) => {
		const foundUserIndex = members.findIndex(({ user }) => user._id === userId);
		const { status } = await fetchData({
			method: "PATCH",
			url: `/board/${boardId}/members/${userId}?newRole=${newRole}`,
			token: true,
		});
		if (status === 200) {
			setMembers((members) => {
				const newMembers = [...members];
				newMembers[foundUserIndex].role = newRole;
				return newMembers;
			});
		}

	};

	const isAuthorized = () => {
		const { role } = currentBoard;
		return role === "owner" || role === "admin";
	};

	return (
		<div className="board-members-modal">
			{isAuthorized() && (
				<AutoCompleteInput
					execMethod={dynamicSearchHandler}
					timeout={500}
					searchResult={searchRes.filter(
						({ _id }) => members.findIndex(({ user }) => user._id === _id) < 0
					)}
					clickResult={addUserToBoardHandler}
					clearResults={clearSearchResults}
				/>
			)}
			<LoadingOverlay show={isPageLoading} opacity={0}>
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
			</LoadingOverlay>

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
