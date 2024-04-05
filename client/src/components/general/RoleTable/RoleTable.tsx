import React, { useMemo } from "react";

import { getRoleIcon } from "@/utils/role";
import { IconType } from "react-icons";

import "./RoleTable.scss";

import TableCheckboxCell from "./TableCheckboxCell";
import TableHeader from "./TableHeader";

type RoleTableProps = {
    permissions: string[];
    roles: Record<string, { permissions: string[] }>;
};

const RoleTable: React.FC<RoleTableProps> = ({ permissions, roles }) => {
    const data: { role: string; RoleIcon: IconType; rolePermissions: Record<string, boolean> }[] =
        useMemo(() => {
            return Object.keys(roles).map((role) => {
                const rolePermissions = permissions.reduce(
                    (acc, permission) => ({
                        ...acc,
                        [`${permission}`]: roles[role].permissions.includes(permission),
                    }),
                    {}
                );
                return { role, RoleIcon: getRoleIcon(role), rolePermissions };
            });
        }, [roles, permissions]);

    return (
        <div className="table-wrapper scrollbar">
            <table className="role-table">
                <TableHeader columns={permissions} />
                <tbody>
                    {data.map(({ role, RoleIcon, rolePermissions }) => (
                        <tr key={`${role}-row`}>
                            <td className="role-table__first-col">
                                <div className="role-table__role">
                                    <RoleIcon />
                                    {role}
                                </div>
                            </td>
                            {permissions.map((permission) => (
                                <TableCheckboxCell
                                    key={`${permission}-cell`}
                                    hasPermission={rolePermissions[permission]}
                                />
                            ))}
                            <td className="role-table__last-col"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleTable;
