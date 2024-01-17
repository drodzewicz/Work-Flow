import React from "react";

const TaskSkeleton: React.FC = () => {
  return (
    <div data-testid="skeleton-task" aria-label="task-loading" className="task-card--loading">
      <h3 className="task-card--loading__title"></h3>
      <div className="task-card--loading__bottom">
        <div className="task-card--loading__avatar" />
      </div>
    </div>
  );
};

export default TaskSkeleton;
