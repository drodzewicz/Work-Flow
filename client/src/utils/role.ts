import { DefaultRoleName } from "@/types/role";

import { IconType } from "react-icons";
import { FaEdit, FaRegEye, FaRegUserCircle, FaShieldAlt, FaUserAlt } from "react-icons/fa";

export const getRoleIcon = (type: string): IconType => {
  const typeIcon: Record<DefaultRoleName, IconType> = {
    ADMIN: FaShieldAlt,
    EDITOR: FaEdit,
    USER: FaUserAlt,
    VIEWER: FaRegEye,
  };
  return typeIcon[type as DefaultRoleName] ?? FaRegUserCircle;
};
