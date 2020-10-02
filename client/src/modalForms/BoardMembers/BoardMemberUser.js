import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ReactComponent as Admin } from "assets/images/Admin.svg";
import { ReactComponent as Crown } from "assets/images/crown.svg";
import { ReactComponent as Visitor } from "assets/images/visitor.svg";
import { ReactComponent as RegularUser } from "assets/images/regular-user.svg";
import User from "components/User/User";
import { UserContext } from "context/UserContext";
import "./BoardMemberUser.scss";

const BoardMemberUser = ({ username, userId, imageURL, userType, removeUser, changeUserRole }) => {
	const userRoleAnchorElement = useRef();
	const optionsAnchorElement = useRef();
	const [{ currentBoard }] = useContext(UserContext);

	const userTypeIcon = (type) => {
		switch (type) {
			case "owner":
				return <Crown className="owner-icon" />;
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

	const isAuthorized = () => {
		if (currentBoard.role === "owner") return true;
		if (currentBoard.role === "admin" && userType !== "owner" && userType !== "admin") return true;
	};

	const roleList = [
		{ roleName: "Admin", role: "admin", icon: <Admin /> },
		{ roleName: "Regular", role: "regular", icon: <RegularUser /> },
		{ roleName: "Guest", role: "guest", icon: <Visitor /> },
	];

	return (
		<div className="board-user">
			<User username={username} imageURL={imageURL}>
				<div className="user-type" ref={userRoleAnchorElement}>
					{userTypeIcon(userType)}
				</div>
				{userType !== "owner" && isAuthorized() && (
					<MoreVertIcon className="option-more" ref={optionsAnchorElement} />
				)}

				{userType !== "owner" && isAuthorized() && (
					<DropdownMenu classes={["user-roles"]} anchorEl={userRoleAnchorElement}>
						{roleList
							.filter(({ role }) => role !== userType)
							.map(({ roleName, role, icon }) => (
								<div key={role} onClick={() => changeUserRole(userId, role)}>
									{icon}
									<span>{roleName}</span>
								</div>
							))}
					</DropdownMenu>
				)}
				{userType !== "owner" && isAuthorized() && (
					<DropdownMenu
						onClickClose={true}
						classes={["user-option-menu"]}
						anchorEl={optionsAnchorElement}
					>
						<span onClick={removeUser}>remove</span>
					</DropdownMenu>
				)}
			</User>
		</div>
	);
};

BoardMemberUser.defaultProps = {
	imageURL: ""
}

BoardMemberUser.propTypes = {
	username: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	imageURL: PropTypes.string,
	userType: PropTypes.string.isRequired,
	removeUser: PropTypes.func.isRequired,
	changeUserRole: PropTypes.func.isRequired,
};

export default BoardMemberUser;
