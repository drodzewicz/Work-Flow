import React, { useState } from 'react';
import "./BoardCard.scss";
import { useHistory } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {ReactComponent as Pin} from "assets/images/pin-empty.svg";
import {ReactComponent as Pined} from "assets/images/pin-full.svg";
import DropdownMenu from "components/DropdownMenu/DropdownMenu"

const BoardCard = ({boardTitle, isPinned, to}) => {

  const [options, setOptions] = useState(false);
  const history = useHistory();
  const toggleOptions = (e) => {
    e.stopPropagation();
    setOptions(!options);
  }
  const stopPropagation = (e) => {
    e.stopPropagation();
  }
  const editEventModal = (e) => {
    e.stopPropagation();
    console.log("editing event");
  }
  const leavingEvent = (e) => {
    e.stopPropagation();
    console.log("leave event");
  }
  const gToBoard = () => {
    history.push(to);
  }
  

  return (
    <div className="board-card"> 
      <div className="bg-columns">
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
      <div className="board-card-body" onClick={gToBoard}>
        <h1 className="board-title">{boardTitle}</h1>
        <div className="board-menu">
          {isPinned ? <Pined /> : <Pin />}
          <MoreVertIcon onClick={toggleOptions} />
        </div>
      </div>
      {
        options && 
        <DropdownMenu onClick={stopPropagation} closeMenu={toggleOptions}>
          <span onClick={editEventModal}>edit</span>
          <span onClick={leavingEvent}>leave</span>
        </DropdownMenu>
        }
    </div>
  )
}

export default BoardCard
