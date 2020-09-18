import React, { useRef, useContext } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ReactComponent as Admin } from "assets/images/Admin.svg";
import { ReactComponent as Crown } from "assets/images/crown.svg";
import { ReactComponent as Visitor } from "assets/images/visitor.svg";
import { ReactComponent as RegularUser } from "assets/images/regular-user.svg";
import User from "components/User/User";
import { UserContext } from "context/UserContext";
import "./BoardMemberUser.scss";

const BoardMemberUser = ({
	username,
	userId,
	imageURL,
	userType,
	removeUser,
	changeUserRole,
}) => {
	const userRoleAnchorElement = useRef();
	const optionsAnchorElement = useRef();
	const [{role}] = useContext(UserContext);

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
		if(role === "owner") return true;
		if(role === "admin" && userType !== "owner" && userType !== "admin") return true;
	}

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
						{userType !== "admin" && (
							<div onClick={() => changeUserRole(userId, "admin")}>
								<Admin />
								<span>Admin</span>
							</div>
						)}
						{userType !== "regular" && (
							<div onClick={() => changeUserRole(userId, "regular")}>
								<RegularUser />
								<span>Regular</span>
							</div>
						)}
						{userType !== "guest" && (
							<div onClick={() => changeUserRole(userId, "guest")}>
								<Visitor />
								<span>Guest</span>
							</div>
						)}
					</DropdownMenu>
				)}
				{userType !== "owner" && isAuthorized() && (
					<DropdownMenu onClickClose={true} classes={["user-option-menu"]} anchorEl={optionsAnchorElement}>
						<span onClick={removeUser}>remove</span>
					</DropdownMenu>
				)}
			</User>
		</div>
	);
};

export default BoardMemberUser;
