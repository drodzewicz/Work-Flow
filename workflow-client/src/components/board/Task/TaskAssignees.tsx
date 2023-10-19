import React from "react";

import Image from "@/components/general/Image/Image";

const TaskAssignees: React.FC<{ assignees: User[] }> = ({ assignees }) => {
  const headCount = 3;
  const headAssignees = assignees.slice(0, headCount);
  const tailCount = assignees.length - headCount;
  return (
    <div className="task-card__assignnees">
      {headAssignees.map((assignee) => (
        <Image
          className="task-card__avatar"
          key={assignee.username}
          src={assignee.avatarImageURL}
          title={assignee.username}
        />
      ))}
      {tailCount > 0 && <span className="task-card__count">{tailCount}</span>}
    </div>
  );
};

export default TaskAssignees;
