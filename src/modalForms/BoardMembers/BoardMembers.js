import React, { useState, useEffect } from "react";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";

const BoardMembers = () => {
	const [members] = useState([
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
	const [page, setPage] = useState({
		currentPage: 1,
		amountOfPages: 10,
		maxUsers: 5,
	});

	const [dislpayMembers, setDislpayMembers] = useState([]);

	useEffect(() => {
		const tempMembers = members.slice(
			page.currentPage * page.maxUsers - page.maxUsers,
			page.currentPage * page.maxUsers
		);
		setDislpayMembers((displayMembers) => [...tempMembers]);
		return () => {};
	}, []);

	const dynamicSearchHandler = (data) => {
		if (data === "") setDislpayMembers(members);
		setDislpayMembers(members.filter((user) => user.username.includes(data)));
	};
	const changePage = (pageNumber) => {
		const tempMembers = members.slice(
			pageNumber * page.maxUsers - page.maxUsers,
			pageNumber * page.maxUsers
		);
		setDislpayMembers(tempMembers);
		console.log(`fetching page [${pageNumber}]`);
		setPage({ ...page, currentPage: pageNumber });
	};

	return (
		<div className="board-members-modal">
			<AutoCompleteInput execMethod={dynamicSearchHandler} timeout={500} searchResult={[]} />
			<div className="user-container">
				{dislpayMembers.map(({ id, username, imageLink, userType }) => (
					<BoardMemberUser key={id} username={username} imageLink={imageLink} userType={userType} />
				))}
			</div>
			<Pagination
				amountOfPages={page.amountOfPages}
				currentPage={page.currentPage}
				handleChange={changePage}
			/>
		</div>
	);
};

export default BoardMembers;
