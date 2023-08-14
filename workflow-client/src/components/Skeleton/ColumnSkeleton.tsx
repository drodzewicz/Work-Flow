import React from "react";

const ColumnSkeleton: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="task-column--loading">
      <header className="task-column--loading__header">
        <span className="task-column--loading__header__task-count"></span>
        <div className="task-column--loading__header__name"></div>
        <span className="task-column--loading__header__task-count"></span>
      </header>
      <div className="task-column--loading__container scrollbar">{children}</div>
    </div>
  );
};

export default ColumnSkeleton;
