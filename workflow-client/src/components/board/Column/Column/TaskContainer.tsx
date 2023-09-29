import React from "react";

import useBoardId from "@/hooks/useBoardId";

import { useGetTasks } from "@/service/task";

import Task from "@/components/board/Task";

import TaskDroppableContainer from "./TaskDroppableContainer";

const TaskContainer: React.FC<{ columnId: string; columnIndex: number }> = ({
  columnId,
  columnIndex,
}) => {
  const boardId = useBoardId();
  const { data = [] } = useGetTasks({ boardId });
  const { tasks } = data[columnIndex];

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
