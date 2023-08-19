import React from "react";

import useBoardTask from "@/hooks/useBoardTasks";

import Task from "@/components/board/Task";

import TaskDroppableContainer from "./TaskDroppableContainer";

const TaskContainer: React.FC<{ columnId: string; columnIndex: number }> = ({
  columnId,
  columnIndex,
}) => {
  const { getColumn } = useBoardTask();

  const tasks = getColumn(columnId)?.tasks;

  return (
    <TaskDroppableContainer columnId={columnId} className="task-column__container scrollbar">
      {tasks?.map(({ _id, title, tags, assignees }, index) => (
        <Task
          key={_id}
          taskId={_id}
          title={title}
          tags={[]}
          people={assignees}
          indexes={{ taskIndex: index, columnIndex }}
        />
      ))}
    </TaskDroppableContainer>
  );
};

export default TaskContainer;
