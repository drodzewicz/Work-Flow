import React, {useState} from 'react';
import TaskColumn from "components/Task/TaskColumn";
import "./BoardPage.scss";
import ExpandText from "components/ExpandText/ExpandText";
import Button from "components/Button/Button";
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AddBoxIcon from '@material-ui/icons/AddBox';

const BoardPage = ({boardId}) => {
  const [boardInfo, setBoardInfo] = useState({
    name: "testing new reat features",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore cum odit, reprehenderit exercitationem tempora perspiciatis nemo cumque ",
    });

    const [members, setMembers] = useState([
      {id: "1", username: "user1", imageLink: ""},
      {id: "2", username: "user2", imageLink: ""},
      {id: "3", username: "user3", imageLink: ""},
    ]);

    const [columns, setColumns] = useState([
      {id: "COL1", columnName: "test 1", listOfTasks: [
        {id:"TSK1", name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK2",name: "task2", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK3",name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]}
      ]},
      {id: "COL2", columnName: "test 2", listOfTasks: [
        {id:"TSK1", name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK2",name: "task2", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK3",name: "task2", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK4",name: "task2", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK5",name: "task2", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK6",name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK7",name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK8",name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK9",name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]}
      ]},
      {id: "COL3", columnName: "test 3", listOfTasks: [
        {id:"TSK1", name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK2",name: "task2", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]},
        {id:"TSK3",name: "task1", dueDate: "2020-11-20", tags: ["#D74530", "#25D68F"], people: [{id: "use1", username: "user1", imageLink: "kke"}, {id: "use2", username: "user2", imageLink: "kke"}]}
      ]},
    ]) 

  return (
    <div className="board-page">
      {/* <h1 className="board-title">{boardInfo.name}</h1> */}
      <ExpandText classes={["board-title"]} text={boardInfo.name}>
          <div>
            hallo Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Eum rem tempore ex numquam expedita. Blanditiis error eum officia
              unde, velit adipisci provident, doloribus, id quisquam harum
               reprehenderit ipsa! Earum reprehenderit accusamus ipsum ipsa 
               voluptate voluptatum corrupti ratione, doloribus, doloremque 
               amet magni adipisci? Recusandae nesciunt laborum assumenda 
               saepe quo facere dolor!
          </div>
        </ExpandText>
        <div className="board-button-group">
          <Button><PeopleIcon /><span>Peolpe</span></Button>
          <Button><LocalOfferIcon /><span>Tags</span></Button>
          <Button><AddBoxIcon /><span>New Column</span></Button>
        </div>
      <div className="board-page-container">
        {columns.map( ({id, listOfTasks, columnName}) => (
          <span  key={id}>
            <TaskColumn columnName={columnName} listOfTasks={listOfTasks} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default BoardPage
