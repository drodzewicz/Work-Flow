import React from "react";

import { getRoleIcon } from "@/utils/role";

import Image from "@/components/general/Image/Image";

import "./CustomOption.scss";

type CustomRoleOptionProps = {
  role: string;
};

const CustomRoleOption: React.FC<CustomRoleOptionProps> = ({ role }) => {
  const RoleIcon = getRoleIcon(role);
  return (
    <div className="custom-role-option">
      <RoleIcon />
      <span>{role}</span>
    </div>
  );
};

export default CustomRoleOption;
