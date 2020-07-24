import React from 'react';
import "./Task.scss";
import Image from "components/Image/Image";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Task = ({name, tags, people, dueDate}) => {
  return (
    <div className="task-card">
      <div className="card-head">
        <div className="due-date">{dueDate}</div>
        <MoreVertIcon />
      </div>
      <h3 className="task-title">{name}</h3>
      <div className="card-bottom">
        <div className="task-tags">
          {tags && tags.map(tag => (
            <div key={tag} className="tag" style={{backgroundColor: tag}}></div>
          ))}
        </div>
        <div className="task-people">
            {people && people.map(({id, imageLink}) => (
              <Image key={id} classes={["avatar"]} imageLink={imageLink} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Task
