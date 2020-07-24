import React from 'react';
import "./TaskColumn.scss";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Task from "./Task";

const TaskColumn = ({columnName, listOfTasks}) => {
  return (
    <div className="task-column">
      <div className="task-column-header">
        <h2 className="task-column-name">{columnName}</h2>
        <button className="add-new-task-btn"><PlaylistAddIcon /></button>
        <button className="more-options"><MoreVertIcon /></button>
      </div>
      <div>
        {
          listOfTasks && listOfTasks.map(({id, name, tags, people, dueDate}) => (
            <Task
              key={id}
              name={name}
              tags={tags}
              people={people}
              dueDate={dueDate}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TaskColumn
