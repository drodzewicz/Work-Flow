import React, { useState, useEffect } from "react";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";
import { boardMembers_DATA } from "data";

const BoardMembers = () => {
	const AMOUNT_OF_PAGES = 10;
	const MAX_USERS_PER_PAGE = 5;

	const [members, setMembers] = useState(boardMembers_DATA);
	const [currentPage, setCurrentPage] = useState(1);

	const [dislpayMembers, setDisplayMembers] = useState([]);

	useEffect(() => {
		const tempMembers = members.slice(
			currentPage * MAX_USERS_PER_PAGE - MAX_USERS_PER_PAGE,
			currentPage * MAX_USERS_PER_PAGE
		);
		setDisplayMembers(tempMembers);
		console.log(`fetching page [${currentPage}]`);
		return () => {};
	}, [members, currentPage]);

	const dynamicSearchHandler = (data) => {
		if (data === "") setDisplayMembers(members);
		setDisplayMembers(members.filter((user) => user.username.includes(data)));
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

	return (
		<div className="board-members-modal">
			<AutoCompleteInput execMethod={dynamicSearchHandler} timeout={500} searchResult={[]} />
			<div className="user-container">
				{dislpayMembers.map(({ id, username, imageURL, userType }) => (
					<BoardMemberUser
						key={id}
						removeUser={() => removeUserFromBoard(id)}
						username={username}
						imageURL={imageURL}
						userType={userType}
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
