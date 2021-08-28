import React, { forwardRef, useRef, useEffect, useState, useCallback } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { UserInfoProps } from ".";
import "./UserInfo.scss";
import { getBoardMember } from "service";
import { BoardUserFullI, UserBoardRoles } from "types/general";
import Image from "components/general/Image";
import Button from "components/general/Button";
import DropdownMenu from "components/general/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import { FaShieldAlt, FaUserAlt, FaRegAddressCard, FaCrown, FaUserSlash } from "react-icons/fa";
import axios, { CancelTokenSource } from "axios";

const UserInfo = forwardRef<HTMLDivElement, UserInfoProps>(
  ({ userId, currentRole, removeUser, changeUserRole }, ref) => {
    const { pathname } = useLocation();
    const match = matchPath<{ boardId: string }>(pathname, {
      path: "/board/:boardId",
      exact: true,
    });
    const boardId = match?.params?.boardId || "";
    const [user, setUser] = useState<BoardUserFullI>({
      role: UserBoardRoles.REGULAR,
      user: {
        _id: "",
        name: "Loadind...",
        surname: "",
        username: "Loadind...",
        email: "Loadind...",
      },
    });
    const [isLoading, setLoading] = useState<boolean>(true);
    const rolesAnchor = useRef<HTMLButtonElement>(null);
    const source = useRef<CancelTokenSource | null>(null);

    const getBoardUserInfo = useCallback(async () => {

      const { data } = await getBoardMember({
        boardId,
        userId,
        setLoading,
        cancelToken: source.current?.token,
      });
      if (data) {
        const { member } = data;
        setUser(member);
      }
    }, [boardId, userId]);

    useEffect(() => {
      source.current = axios.CancelToken.source();

      getBoardUserInfo();

      return () => {
        source.current?.cancel();
      };
    }, [getBoardUserInfo]);

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

    const isAuthorizedAdmin = () => {
      return currentRole === UserBoardRoles.OWNER || currentRole === UserBoardRoles.ADMIN;
    };

    const kickUserHandler = () => {
      const shouldKickUser = window.confirm(`are you sure you want to kick ${user.user.username}?`);
      if (shouldKickUser) {
        removeUser(userId);
      }
    };

    return (
      <div ref={ref} className="user-info">
        <header>
          <h3 className="user-info__username">@{user.user.username}</h3>
        </header>
        <hr className="break-line" />
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
          <Button disabled={user.role === UserBoardRoles.OWNER || isLoading} ref={rolesAnchor}>
            {roleIcon(user.role)}
          </Button>
          <DropdownMenu offset={{ x: -125, y: 0 }} anchorEl={rolesAnchor} className="role-options">
            {availableRoles()}
          </DropdownMenu>
          <Button disabled={isLoading || !isAuthorizedAdmin()} onClick={kickUserHandler}>
            <FaUserSlash />
            kick
          </Button>
        </div>
      </div>
    );
  }
);

export default UserInfo;
