import React, { useContext } from "react";
import "./WelcomePage.scss";
import Button from "components/general/Button";
import { ModalContext } from "context/ModalContext";
import workflowPerson from "assets/images/workflow-person.svg";
import workflowPersonDark from "assets/images/workflow-person_dark.svg";
import { Register } from "components/modalForms";
import taskColumns from "assets/images/task_columns.svg";
import taskColumnsDark from "assets/images/task_columns_dark.svg";

const WelcomePage: React.FC = () => {
  const [, modalDispatch] = useContext(ModalContext);
  const appTheme = localStorage.getItem("theme");
  console.log(appTheme);
  if(appTheme) document.body.className = `theme-${appTheme}`;

  const openRegisterModal = () => {
    modalDispatch({ type: "OPEN", payload: { render: <Register />, title: "Register" } });
  };

  return (
    <div className="welcome-section">
      <section className="introduction-section">
        <img
          src={appTheme === "dark" ? workflowPersonDark : workflowPerson}
          alt="person-task"
          className="person-image"
        />
        <div className="text-subsection">
          <h1>Work-Flow</h1>
          <h2>work more collaboratively and get more done.</h2>
          <p>
            Work-Flow is a web-based Kanban-style list making application used to manage work at
            personal or organizational level. Using this application organizing your work will be
            easy.
          </p>
          <Button onClick={openRegisterModal} variant="glow" className="join-now">
            Join us Now
          </Button>
        </div>
      </section>
      <section className="task-column-section">
        <div className="task-text">
          <h1>Tasks</h1>
          <h2>
            Create tasks and assign them to your teammates - add custom tags to differentiate tasks
            at a glance
          </h2>
        </div>
        <img
          src={appTheme === "dark" ? taskColumnsDark : taskColumns}
          alt="task-columns"
          className="task-columns-img"
        />
      </section>
    </div>
  );
};

export default WelcomePage;
