import React, { useContext } from "react";
import "./WelcomePage.scss";
import Button from "components/general/Button";
import { ModalContext, ModalActionType } from "context/ModalContext";
import Register from "components/modalForms/Register/Register";

import { ReactComponent as Person } from "assets/images/workflow-person.svg";
import { ReactComponent as PersonDark } from "assets/images/workflow-person_dark.svg";
import { ReactComponent as TaskColumns } from "assets/images/task_columns.svg";
import { ReactComponent as TaskColumnsDark } from "assets/images/task_columns_dark.svg";

const WelcomePage: React.FC = () => {
  const { modalDispatch } = useContext(ModalContext);
  const appTheme = localStorage.getItem("theme");
  if (appTheme) document.body.className = `theme-${appTheme}`;

  const openRegisterModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: { render: <Register />, title: "Register" },
    });
  };

  return (
    <div className="welcome-section">
      <section className="welcome-section__introduction">
        {appTheme === "dark" ? (
          <PersonDark role="presentation" name="person_task_board" className="person-image" />
        ) : (
          <Person role="presentation" name="person_task_board" className="person-image" />
        )}

        <div className="welcome-section__text-subsection">
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
      <section className="welcome-section__explainer">
        <div className="welcome-section__text-subsection">
          <h1>Tasks</h1>
          <h2>
            Create tasks and assign them to your teammates - add custom tags to differentiate tasks
            at a glance
          </h2>
        </div>
        {appTheme === "dark" ? (
          <TaskColumnsDark className="task-columns-image" />
        ) : (
          <TaskColumns className="task-columns-image" />
        )}
      </section>
    </div>
  );
};

export default WelcomePage;
