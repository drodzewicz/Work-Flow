import React, { useState, useContext } from "react";
import "./TaskColumn.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Task from "./Task";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ModalContext } from "context/ModalContext";

import { NewTaskForm } from "modalForms";

const TaskColumn = ({ columnName, listOfTasks }) => {
  const [options, setOptions] = useState(false);
  const toggleOptions = () => {
    setOptions(!options);
  };
  const [, modalDispatch] = useContext(ModalContext);
  const openBoardTagsModal = () => {
    modalDispatch({
      type: "OPEN",
      payload: { render: <NewTaskForm />, title: "Board Tags" },
    });
  };

  return (
    <div className="task-column">
      <div className="task-column-header">
        <h2 className="task-column-name">{columnName}</h2>
        <button onClick={openBoardTagsModal} className="add-new-task-btn">
          <PlaylistAddIcon />{" "}
        </button>
        <button onClick={toggleOptions} className="more-options">
          <MoreVertIcon />
        </button>
        {options && (
          <DropdownMenu closeMenu={toggleOptions}>
            <span>delete</span>
            <span>edit</span>
          </DropdownMenu>
        )}
      </div>
      <div className="task-container">
        {listOfTasks &&
          listOfTasks.map(({ id, name, tags, people, dueDate }) => (
            <Task
              key={id}
              taskId={id}
              name={name}
              tags={tags}
              people={people}
              dueDate={dueDate}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskColumn;
