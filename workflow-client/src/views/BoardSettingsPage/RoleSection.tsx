import React from "react";

import { getRoleIcon } from "@/utils/role";

import useBoardId from "@/hooks/useBoardId";

import { useGetBoardRoles, useGetAvailablePermissions } from "@/service/permission";

import RoleTable from "@/components/general/RoleTable/RoleTable";

const RoleSection = () => {
  const boardId = useBoardId();

  const { data: allPermissions = [] } = useGetAvailablePermissions();
  const { data: roles = {} } = useGetBoardRoles({ boardId });

  return (
    <section>
      <h2 className="text-lg font-bold mb-3">User Roles</h2>
      <hr />
      <RoleTable />
    </section>
  );
};

export default RoleSection;
