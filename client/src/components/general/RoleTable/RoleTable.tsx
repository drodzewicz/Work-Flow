import React, { useMemo } from "react";

import { getRoleIcon } from "@/utils/role";

import "./RoleTable.scss";
import { Permissions } from "@/hooks/useRBAC";
import { FaCheck, FaTimes } from "react-icons/fa";

type RoleTableProps = {
    permissions: string[];
    roles: Record<string, { permissions: string[] }>;
};

const RoleTable: React.FC<RoleTableProps> = ({ roles }) => {
    const roleNames = useMemo(() => Object.keys(roles), [roles]);

    const groupedPemrissions: Record<string, Record<string, string>> = {
        Board: {
            [Permissions.BOARD_DELETE]: "Delete",
            [Permissions.BOARD_UPDATE]: "Update",
        },
        Task: {
            [Permissions.TASK_CREATE]: "Create",
            [Permissions.TASK_DELETE]: "Delete",
            [Permissions.TASK_MOVE]: "Move",
        },
        Column: {
            [Permissions.COLUMN_CREATE]: "Create",
            [Permissions.COLUMN_DELETE]: "Delete",
            [Permissions.COLUMN_MOVE]: "Move",
        },
        Tag: {
            [Permissions.TAG_CREATE]: "Create",
            [Permissions.TAG_DELETE]: "Delete",
        },
        Members: {
            [Permissions.MEMBER_ADD]: "Add",
            [Permissions.MEMBER_DELETE]: "Delete",
            [Permissions.MEMBER_ROLE_UPDATE]: "Role update",
        },
    };

    return (
        <div className="role-table">
            <div className="role-table__column">
                <div className="role-table__header">Role</div>
                {roleNames.map((role) => {
                    const Icons = getRoleIcon(role);
                    return (
                        <div key={`role-column-${role}`} className="role-table__row">
                            <Icons />
                            {role}
                        </div>
                    );
                })}
            </div>
            <div className="role-table__body">
                {Object.entries(groupedPemrissions).map(([group, permissions]) => (
                    <div key={group} className="role-table__column">
                        <div className="role-table__header">{group}</div>
                        <div className="role-table__grouped-column">
                            {Object.entries(permissions).map(([permission, label]) => (
                                <div key={`permission-column-${permission}`}>
                                    <div className="role-table__header">{label}</div>
                                    {roleNames.map((role) => (
                                        <div
                                            key={`role-permission-cell-${role}`}
                                            className="role-table__row"
                                        >
                                            {roles[role].permissions.includes(permission) ? (
                                                <div className="role-circle role-circle--active">
                                                    <FaCheck />
                                                </div>
                                            ) : (
                                                <div className="role-circle role-circle--inactive">
                                                    <FaTimes />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleTable;
