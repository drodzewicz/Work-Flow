import React, { useRef, useContext, useState } from "react";

import { UserBoardRoles } from "@/types/general";

import { BoardMembersUserProps } from "./types";

import { FaShieldAlt, FaUserAlt, FaRegAddressCard, FaCrown } from "react-icons/fa";

import User from "@/components/board/User";

import "./BoardMemberUser.scss";

const BoardMemberUser: React.FC<BoardMembersUserProps> = ({ member }) => {
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

  return (
    <User
      className="board-user"
      username={member.user.username}
      imageSrc={member.user.avatarImageURL}
    >
      {userTypeIcon(member.role)}
    </User>
  );
};

export default BoardMemberUser;
