import React, { useState, useContext } from "react";
import "./Task.scss";
import Image from "components/Image/Image";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { TaskDisplay } from "modalForms";
import { ModalContext } from "context/ModalContext";

const Task = ({ taskId, name, tags, people, dueDate }) => {
  const [options, setOpntions] = useState(false);

  const [, modalDispatch] = useContext(ModalContext);

  const openTaskDetailsModal = () => {
    modalDispatch({
      type: "OPEN",
      payload: {
        render: <TaskDisplay taskId={taskId} />,
        title: "Task Details",
      },
    });
  };
  const toggleOptions = (event) => {
    event.stopPropagation();
    setOpntions((options) => !options);
  };
  return (
    <div className="task-card" onClick={openTaskDetailsModal}>
      {options && (
        <span className="drop-down-span">
          <DropdownMenu closeMenu={toggleOptions}>
            <span>delete</span>
            <span>edit</span>
          </DropdownMenu>
        </span>
      )}
      <div className="card-head">
        <div className="due-date">{dueDate}</div>
        <MoreVertIcon onClick={toggleOptions} />
      </div>
      <h3 className="task-title">{name}</h3>
      <div className="card-bottom">
        <div className="task-tags">
          {tags &&
            tags.map((tag) => (
              <div
                key={tag}
                className="tag"
                style={{ backgroundColor: tag }}
              ></div>
            ))}
        </div>
        <div className="task-people">
          {people &&
            people.map(({ id, imageLink }) => (
              <Image key={id} classes={["avatar"]} imageLink={imageLink} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
