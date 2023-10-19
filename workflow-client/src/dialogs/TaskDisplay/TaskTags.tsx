import React from "react";

type TaskTagsProps = {
  tags?: Tag[];
};

const TaskTags: React.FC<TaskTagsProps> = ({ tags } = { tags: [] }) => {
  return (
    <div className="task-display__tag-container">
      {tags?.map(({ _id, key, name }) => (
        <div
          className="task-display__tag"
          key={_id}
          style={{ "--_tag-color": key } as React.CSSProperties}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default TaskTags;
