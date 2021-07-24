import React, { forwardRef, useRef, useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { UserInfoProps } from ".";
import "./UserInfo.scss";
import { getBoardMember } from "service";
import { BoardUserFullI, UserBoardRoles } from "types/general";
import Image from "components/general/Image";
import Button from "components/general/Button";
import DropdownMenu from "components/general/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import { FaShieldAlt, FaUserAlt, FaRegAddressCard, FaCrown } from "react-icons/fa";

const UserInfo = forwardRef<HTMLDivElement, UserInfoProps>(
  ({ userId, currentRole, removeUser, changeUserRole }, ref) => {
    const { pathname } = useLocation();
    const match = matchPath<{ boardId: string }>(pathname, {
      path: "/board/:boardId",
      exact: true,
    });
    const [user, setUser] = useState<BoardUserFullI>({
      role: UserBoardRoles.REGULAR,
      user: { _id: "", name: "", surname: "", username: "", email: "" },
    });
    const rolesAnchor = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const getBoardUserInfo = async () => {
        if (!match?.params) return;
        const { boardId } = match.params;
        const { data } = await getBoardMember({ boardId, userId });
        if (!!data) {
          const { member } = data;
          setUser(member);
        }
      };
      getBoardUserInfo();

      return () => {};
    }, []);

    const roleIcon = (role: UserBoardRoles) => {
      switch (role) {
        case UserBoardRoles.OWNER:
          return (
            <>
              <FaCrown />
              {UserBoardRoles.OWNER}
            </>
          );
        case UserBoardRoles.ADMIN:
          return (
            <>
              <FaShieldAlt />
              {UserBoardRoles.ADMIN}
            </>
          );
        case UserBoardRoles.GUEST:
          return (
            <>
              <FaRegAddressCard />
              {UserBoardRoles.GUEST}
            </>
          );
        default:
          return (
            <>
              <FaUserAlt />
              {UserBoardRoles.REGULAR}
            </>
          );
      }
    };

    const availableRoles = () => {
      const ownerRoles = [UserBoardRoles.ADMIN, UserBoardRoles.REGULAR, UserBoardRoles.GUEST];
      const adminRoles = [UserBoardRoles.REGULAR, UserBoardRoles.GUEST];
      let roles: UserBoardRoles[] = [];

      if (currentRole === UserBoardRoles.OWNER) roles = ownerRoles;
      else if (currentRole === UserBoardRoles.ADMIN) roles = adminRoles;

      return roles.map((role) => (
        <DropdownMenuItem onClick={() => changeUserRole(userId, role)} key={role}>
          {roleIcon(role)}
        </DropdownMenuItem>
      ));
    };

    return (
      <div ref={ref} className="user-info">
        <h3 className="user-info__username">
          @{user.user.username}
          <hr className="break-line" />
        </h3>
        <div className="user-info__main">
          <Image className="user-info__avatar" src={user.user.avatarImageURL} />
          <p className="user-info__info">
            <span className="user-info__name">
              {user.user.name} {user.user.surname}
            </span>
            <i className="user-info__email">{user.user.email}</i>
          </p>
        </div>
        <div className="user-info__control-btn">
          <Button disabled={user.role === UserBoardRoles.OWNER} ref={rolesAnchor}>
            {roleIcon(user.role)}
          </Button>
          <DropdownMenu
            offset={{
              x: -110,
              y: 0,
            }}
            anchorEl={rolesAnchor}>
            {availableRoles()}
          </DropdownMenu>
          <Button onClick={() => removeUser(userId)}>kick</Button>
        </div>
      </div>
    );
  }
);

export default UserInfo;
