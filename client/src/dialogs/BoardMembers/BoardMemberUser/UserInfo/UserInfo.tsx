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
import { FaShieldAlt, FaUserAlt, FaRegAddressCard, FaCrown, FaUserSlash } from "react-icons/fa";

const UserInfo = forwardRef<HTMLDivElement, UserInfoProps>(
  ({ userId, currentRole, removeUser, changeUserRole }, ref) => {
    const { pathname } = useLocation();
    const match = matchPath<{ boardId: string }>(pathname, {
      path: "/board/:boardId",
      exact: true,
    });
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
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);

    const setLoadingMounted = (state: boolean) => {
       if (isMounted.current === true) setLoading(state);
    }

    useEffect(() => {
      const getBoardUserInfo = async () => {
        if (!match?.params) return;
        const { boardId } = match.params;
        const { data } = await getBoardMember({ boardId, userId, setLoading: setLoadingMounted });
        
        if (!!data && isMounted.current) {
          const { member } = data;
          setUser(member);
        }
      };
      getBoardUserInfo();

      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

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
          <Button disabled={isLoading} onClick={() => removeUser(userId)}>
            <FaUserSlash />
            kick
          </Button>
        </div>
      </div>
    );
  }
);

export default UserInfo;
