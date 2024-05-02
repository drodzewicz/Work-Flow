import React from "react";

import { ReactComponent as TaskColumns } from "@/assets/images/task_columns.svg";
import { ReactComponent as TaskColumnsDark } from "@/assets/images/task_columns_dark.svg";
import { ReactComponent as Person } from "@/assets/images/workflow-person.svg";
import { ReactComponent as PersonDark } from "@/assets/images/workflow-person_dark.svg";

import { env } from "@/config/env.config";

import { Link } from "react-router-dom";

import "./WelcomePage.scss";

const WelcomePage: React.FC = () => {
    return (
        <div className="welcome-section">
            <section className="welcome-section__introduction">
                <Person
                    role="presentation"
                    name="person_task_board"
                    className="person-image person-image--light"
                />
                <PersonDark
                    role="presentation"
                    name="person_task_board"
                    className="person-image person-image--dark"
                />

                <div className="welcome-section__introduction__text-subsection">
                    <h1>Work-Flow</h1>
                    <h2>work more collaboratively and get more done.</h2>
                    <p>
                        Work-Flow is a web-based Kanban-style list making application used to manage
                        work at personal or organizational level. Using this application organizing
                        your work will be easy!!
                    </p>
                    <div className="demo-banner">
                        <h2>Lets take a look around this app!!</h2>
                        <p>
                            Dont't want to create and account to checkout this app? Not a problem,{" "}
                            <Link to="#login" state={env.demoUser}>
                                click here
                            </Link>{" "}
                            to log in as a <strong>Demo user</strong>
                        </p>
                    </div>
                </div>
            </section>
            <section className="welcome-section__explainer">
                <div className="welcome-section__explainer__text-subsection">
                    <h2>Tasks</h2>
                    <ul>
                        <li>Create tasks</li>
                        <li>Assign them to your teammates</li>
                        <li>Add custom tags to differentiate tasks at a glance</li>
                        <li>Enjoy a smooth and organized workflow</li>
                    </ul>
                </div>
                <TaskColumns className="task-columns-image task-columns-image--light" />
                <TaskColumnsDark className="task-columns-image task-columns-image--dark" />
            </section>
        </div>
    );
};

export default WelcomePage;
