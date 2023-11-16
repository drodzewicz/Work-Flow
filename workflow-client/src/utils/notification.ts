import { NotificationKey } from "@/types/notification";

import { IconType } from "react-icons";
import {
  FaTrashAlt,
  FaUserPlus,
  FaUserMinus,
  FaShieldAlt,
  FaClipboardList,
  FaBell,
} from "react-icons/fa";

export const getNotificationIcon = (type: string): IconType => {
  const typeIcon: Record<string, IconType> = {
    [NotificationKey.DELETE_BOARD]: FaTrashAlt,
    [NotificationKey.ADD_USER_TO_BOARD]: FaUserPlus,
    [NotificationKey.REMOVE_USER_FROM_BOARD]: FaUserMinus,
    [NotificationKey.MODIFY_USER_ROLE]: FaShieldAlt,
    [NotificationKey.ASSIGN_USER_TO_TASK]: FaClipboardList,
    [NotificationKey.DELETE_TASK]: FaTrashAlt,
  };
  return typeIcon[type] ?? FaBell;
};

export const buildNotificationLink = (type: string, attributes: Record<string, string>) => {
  switch (type) {
    case NotificationKey.ADD_USER_TO_BOARD:
      return `board/${attributes?.boardId}`;
    case NotificationKey.MODIFY_USER_ROLE:
      return `board/${attributes?.boardId}`;
    case NotificationKey.ASSIGN_USER_TO_TASK:
      return `board/${attributes?.boardId}/task/${attributes?.taskId}`;
    case NotificationKey.DELETE_TASK:
      return `board/${attributes?.boardId}`;
    default:
      return null;
  }
};
