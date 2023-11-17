import React from "react";

type TableCheckboxCellProps = {
  hasPermission: boolean;
};

const TableCheckboxCell: React.FC<TableCheckboxCellProps> = ({ hasPermission }) => {
  return (
    <td>
      <div className="role-table__checkbox-cell">
        <input type="checkbox" checked={hasPermission} readOnly />
      </div>
    </td>
  );
};

export default TableCheckboxCell;
