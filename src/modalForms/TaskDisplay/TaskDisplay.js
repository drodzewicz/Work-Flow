import React, { useState } from "react";
import "./TaskDisplay.scss";
import User from "components/User/User";

const TaskDisplay = ({ taskId }) => {
  const [taskDetails] = useState({
    dueDate: "2020-12-11 21:20",
    title: "Test Task",
    description:
      "this is some lorem ipsum text to fill out the gaps is the template",
    tags: [
      { id: "12de", tagCode: "4fgh", tagName: "" },
      { id: "2345ff", tagCode: "fr5", tagName: "front end" },
    ],
    taskAuthor: { id: "fdefe43", username: "Darko", imageLink: "ddwdwd" },
    peopleAssigned: [
      { id: "wddwd", username: "kekus", imageLink: "ddwdwd" },
      { id: "3fedf", username: "mek", imageLink: "ddwdwd" },
    ],
  });

  return (
    <div className="display-task">
      <div className="text-details">
        <span className="due-date">{taskDetails.dueDate}</span>
        <h1 className="task-title">{taskDetails.title}</h1>
        <p className="task-description">{taskDetails.description}</p>
        <div className="tag-container">
          {taskDetails.tags.map(({ id, tagCode, tagName }) => (
            <div key={id} className={`task-tag ${tagCode}`}>
              {tagName}
            </div>
          ))}
        </div>
      </div>
      <div className="people-details">
        <h2 className="added-by user-title">Task Author</h2>
        <User
          username={taskDetails.taskAuthor.username}
          imageLink={taskDetails.taskAuthor.imageLink}
        />
        <h2 className="assigned-people-title user-title">People</h2>
        <div className="assigned-people-container">
          {taskDetails.peopleAssigned.map(({ id, username, imageLink }) => (
            <User key={id} username={username} imageLink={imageLink} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDisplay;
