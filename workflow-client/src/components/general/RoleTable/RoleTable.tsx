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
    <div className="view">
      <div className="wrapper">
        <table className="table">
          <thead>
            <tr style={{height: '2rem'}}></tr>
            <tr>
              <th className="sticky-col first-col">Role</th>
              {allPermissions.map((permission) => (
                <th key={`${permission}-th`} className="vertical">
                  {permission}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(roles).map(([role, { permissions }]) => {
              const RoleIcon = getRoleIcon(role);
              return (
                <tr key={role}>
                  <td className="sticky-col first-col">
                    <RoleIcon />
                    {role}
                  </td>
                  {allPermissions.map((permission) => (
                    <td key={`${permission}-tr`}>
                      <input type="checkbox" checked={permissions.includes(permission)} readOnly />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleTable;
