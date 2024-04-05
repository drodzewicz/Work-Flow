import React from "react";

type TableHeaderProps = {
    columns: string[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
    return (
        <thead>
            <tr>
                <th className="role-table__first-col"></th>
                {columns.map((column) => (
                    <th key={`${column}-th-empty`}></th>
                ))}
                <th className="role-table__last-col"></th>
            </tr>
            <tr>
                <th className="sticky-col role-table__first-col">Role</th>
                {columns.map((column) => (
                    <th key={`${column}-th`} className="vertical">
                        {column}
                    </th>
                ))}
                <th className="role-table__last-col"></th>
            </tr>
        </thead>
    );
};

export default TableHeader;
