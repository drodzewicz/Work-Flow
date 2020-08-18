import React, { useState, useEffect } from "react";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";

const BoardMembers = () => {
	const AMOUNT_OF_PAGES = 10;
	const MAX_USERS_PER_PAGE = 5;

	const [members, setMembers] = useState([
		{
			id: "1j2j3",
			username: "morowiecki",
			imageLink: "link1",
			userType: "owner",
		},
		{
			id: "1j3d43",
			username: "morowka",
			imageLink: "link1",
			userType: "admin",
		},
		{
			id: "1576j3",
			username: "user3",
			imageLink: "link1",
			userType: "regular",
		},
		{
			id: "675343",
			username: "kieliszek",
			imageLink: "link1",
			userType: "admin",
		},
		{ id: "433j3", username: "user5", imageLink: "link1", userType: "regular" },
		{
			id: "1j3rrr",
			username: "user6",
			imageLink: "link1",
			userType: "regular",
		},
		{
			id: "15tttj3",
			username: "siema",
			imageLink: "link1",
			userType: "regular",
		},
		{
			id: "67eredr3",
			username: "asystka",
			imageLink: "link1",
			userType: "guest",
		},
	]);
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
				{dislpayMembers.map(({ id, username, imageLink, userType }) => (
					<BoardMemberUser
						key={id}
						removeUser={() => removeUserFromBoard(id)}
						username={username}
						imageLink={imageLink}
						userType={userType}
					/>
				))}
			</div>
			<Pagination amountOfPages={AMOUNT_OF_PAGES} currentPage={currentPage} handleChange={changePageHandler} />
		</div>
	);
};

export default BoardMembers;
