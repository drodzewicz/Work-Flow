import React from "react";

import { getRoleIcon } from "@/utils/role";

import useBoardId from "@/hooks/useBoardId";

import { useGetAvailablePermissions, useGetBoardRoles } from "@/service/permission";

import "./RoleTable.scss";

const RoleTable: React.FC = () => {
  const boardId = useBoardId();
  const { data: allPermissions = [] } = useGetAvailablePermissions();
  const { data: roles = {} } = useGetBoardRoles({ boardId });
  return (
    <table className="role-table">
      <thead>
        <td></td>
        {allPermissions.map((permission) => (
          <td key={`${permission}-td`}>{permission}</td>
        ))}
      </thead>
      <tbody>
        {Object.entries(roles).map(([role, { permissions }]) => {
          const RoleIcon = getRoleIcon(role);
          return (
            <tr key={role}>
              <td>
                <RoleIcon />
                {role}
              </td>
              {allPermissions.map((permission) => (
                <td key={`${permission}-tr`}>{permissions.includes(permission) ? "YES" : "NO"}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RoleTable;
