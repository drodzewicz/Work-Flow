import React from "react";

import Image from "@/components/general/Image";

type TaskAssigneesPeops = {
  assignees: User[];
  avatarCount?: number;
};

const TaskAssignees: React.FC<TaskAssigneesPeops> = ({ assignees, avatarCount = 3 }) => {
  const headAssignees = assignees.slice(0, avatarCount);
  const tailCount = assignees.length - avatarCount;
  return (
    <div className="task-card__assignnees">
      {headAssignees.map((assignee) => (
        <Image
          className="task-card__avatar"
          key={assignee.username}
          src={assignee.avatarImageURL}
          title={assignee.username}
          aria-label="task-assignee"
        />
      ))}
      {tailCount > 0 && (
        <span data-testid="assignee-overflow-chip" className="task-card__count">
          {tailCount}
        </span>
      )}
    </div>
  );
};

export default TaskAssignees;
