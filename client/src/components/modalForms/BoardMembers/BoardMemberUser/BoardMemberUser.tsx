import React, { useRef, useContext } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import { ReactComponent as Admin } from "assets/images/Admin.svg";
import { ReactComponent as Crown } from "assets/images/crown.svg";
import { ReactComponent as Visitor } from "assets/images/visitor.svg";
import { ReactComponent as RegularUser } from "assets/images/regular-user.svg";
import User from "components/board/User";
import { UserContext } from "context/UserContext";
import "./BoardMemberUser.scss";
import { BoardMembersUserProps } from "./";
import { UserBoardRoles } from "types";

const BoardMemberUser: React.FC<BoardMembersUserProps> = ({
  member,
  removeUser,
  changeUserRole,
}) => {
  const userRoleAnchorElement = useRef<HTMLDivElement | null>(null);
  const optionsAnchorElement = useRef<HTMLElement | null>(null);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  const userTypeIcon = (type: string) => {
    switch (type) {
      case UserBoardRoles.OWNER:
        return <Crown className="owner-icon" />;
      case UserBoardRoles.ADMIN:
        return <Admin />;
      case UserBoardRoles.REGULAR:
        return <RegularUser />;
      case UserBoardRoles.GUEST:
        return <Visitor />;
      default:
        return null;
    }
  };

  const isAuthorized = () => {
    if (currentBoard.role === UserBoardRoles.OWNER) return true;
    if (
      currentBoard.role === UserBoardRoles.ADMIN &&
      member.role !== UserBoardRoles.OWNER &&
      member.role !== UserBoardRoles.ADMIN
    )
      return true;
  };

  const roleList = [
    { roleName: "Admin", role: UserBoardRoles.ADMIN, icon: <Admin /> },
    { roleName: "Regular", role: UserBoardRoles.REGULAR, icon: <RegularUser /> },
    { roleName: "Guest", role: UserBoardRoles.GUEST, icon: <Visitor /> },
  ];

  return (
    <div className="board-user">
      <User username={member.user.username} imageSrc={member.user.avatarImageURL}>
        <div className="user-type" ref={userRoleAnchorElement}>
          {userTypeIcon(member.role)}
        </div>
        {member.role !== UserBoardRoles.OWNER && isAuthorized() && (
          <span ref={optionsAnchorElement}>
            <MoreVertIcon className="option-more" />
          </span>
        )}
        {member.role !== UserBoardRoles.OWNER && isAuthorized() && (
          <DropdownMenu className="user-roles" anchorEl={userRoleAnchorElement}>
            {roleList
              .filter(({ role }) => role !== member.role)
              .map(({ roleName, role, icon }) => (
                <DropdownMenuItem key={role}>
                  <div onClick={() => changeUserRole(member.user._id, role)}>
                    {icon}
                    <span>{roleName}</span>
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenu>
        )}
          {member.role !== UserBoardRoles.OWNER && isAuthorized() && (
          <DropdownMenu
            onClickClose={true}
            className="user-option-menu"
            anchorEl={optionsAnchorElement}>
            <span onClick={() => removeUser(member.user._id)}>remove</span>
          </DropdownMenu>
        )}
      </User>
    </div>
  );
};

export default BoardMemberUser;
