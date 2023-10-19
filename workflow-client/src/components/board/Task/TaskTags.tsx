import React from "react";

const TaskTags: React.FC<{ tags: Tag[] }> = ({ tags }) => (
  <div className="task-card__tags">
    {tags.map((tag) => (
      <span
        key={tag._id}
        className="task-card__tag"
        style={{ "--_tag-color": tag.key } as React.CSSProperties}
      >
        {tag.name}
      </span>
    ))}
  </div>
);

export default TaskTags;
