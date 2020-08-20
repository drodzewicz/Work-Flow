import React, { useRef } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ReactComponent as Admin } from "assets/images/Admin.svg";
import { ReactComponent as Crown } from "assets/images/crown.svg";
import { ReactComponent as Visitor } from "assets/images/visitor.svg";
import { ReactComponent as RegularUser } from "assets/images/regular-user.svg";
import User from "components/User/User";
import "./BoardMemberUser.scss";

const BoardMemberUser = ({ username, imageURL, userType, removeUser }) => {
	const userRoleAnchorElement = useRef();
	const optionsAnchorElement = useRef();

	const userTypeIcon = (type) => {
		switch (type) {
			case "owner":
				return <Crown />;
			case "admin":
				return <Admin />;
			case "regular":
				return <RegularUser />;
			case "guest":
				return <Visitor />;
			default:
				return null;
		}
	};
	return (
		<div className="board-user">
			<User username={username} imageURL={imageURL}>
				<div className="user-type" ref={userRoleAnchorElement}>
					{userTypeIcon(userType)}
				</div>
				<MoreVertIcon ref={optionsAnchorElement} />
				{userType !== "owner" && (
					<DropdownMenu classes={["user-roles"]} anchorEl={userRoleAnchorElement}>
						{userType !== "admin" && (
							<>
								<Admin />
								<span>Admin</span>{" "}
							</>
						)}
						{userType !== "regular" && (
							<>
								<RegularUser />
								<span>Regular</span>
							</>
						)}
						{userType !== "guest" && (
							<>
								<Visitor />
								<span>Guest</span>
							</>
						)}
					</DropdownMenu>
				)}
				<DropdownMenu classes={["user-option-menu"]} anchorEl={optionsAnchorElement}>
					<span onClick={removeUser}>remove</span>
				</DropdownMenu>
			</User>
		</div>
	);
};

export default BoardMemberUser;
