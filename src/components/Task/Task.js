import React, {useState} from 'react';
import "./Task.scss";
import Image from "components/Image/Image";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropdownMenu from "components/DropdownMenu/DropdownMenu"

const Task = ({name, tags, people, dueDate}) => {

  const [options, setOpntions] = useState(false);

  const toggleOptions = () => {
    setOpntions( options => !options);
  }
  return (
    <div className="task-card">
      {
        options && 
        <span className="drop-down-span">
          <DropdownMenu closeMenu={toggleOptions}>
          <span>delete</span>
          <span>edit</span>
          </DropdownMenu>
        </span>
      }
      <div className="card-head">
        <div className="due-date">{dueDate}</div>
        <MoreVertIcon onClick={toggleOptions} />
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
