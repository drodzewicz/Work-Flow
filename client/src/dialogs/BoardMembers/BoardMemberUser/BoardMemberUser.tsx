import React, { useRef, useContext, useState } from "react";
import { FaShieldAlt, FaUserAlt, FaRegAddressCard, FaCrown } from "react-icons/fa";

import User from "components/board/User";
import { UserContext } from "context/UserContext";
import "./BoardMemberUser.scss";
import { BoardMembersUserProps } from ".";
import { UserBoardRoles } from "types/general";
import UserInfo from "./UserInfo";
import { useClickOutside } from "Hooks/useClickOutside";

const BoardMemberUser: React.FC<BoardMembersUserProps> = ({ member, ...actions }) => {
  const userInfoCardRef = useRef<HTMLDivElement | null>(null);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  const userTypeIcon = (type: string) => {
    switch (type) {
      case UserBoardRoles.OWNER:
        return <FaCrown className="board-user__role-icon board-user__role-icon--owner" />;
      case UserBoardRoles.ADMIN:
        return <FaShieldAlt className="board-user__role-icon" />;
      case UserBoardRoles.REGULAR:
        return <FaUserAlt className="board-user__role-icon" />;
      case UserBoardRoles.GUEST:
        return <FaRegAddressCard className="board-user__role-icon" />;
      default:
        return null;
    }
  };

  const showUserInfoCard = () => setShowUserInfo(true);
  const hideShowUserInfoCard = () => setShowUserInfo(false);
  useClickOutside(userInfoCardRef, hideShowUserInfoCard);

  return (
    <User
      className="board-user"
      username={member.user.username}
      imageSrc={member.user.avatarImageURL}
      onClick={showUserInfoCard}>
      {userTypeIcon(member.role)}
      {showUserInfo && (
        <UserInfo
          {...actions}
          ref={userInfoCardRef}
          currentRole={currentBoard.role!}
          userId={member.user._id}
        />
      )}
    </User>
  );
};

export default BoardMemberUser;
