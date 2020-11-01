import React, { useContext } from "react";
import "./WelcomePage.scss";
import Button from "components/Button/Button";
import { ModalContext } from "context/ModalContext";
import workflowPerson from "assets/images/workflow-person.svg";
import { Register } from "modalForms";
import ContainerBox from "components/ContainerBox/ContainerBox";
import taskColumns from "assets/images/task_columns.svg";

const WelcomePage = () => {
	const [, modalDispatch] = useContext(ModalContext);

	const openRegisterModal = () => {
		modalDispatch({ type: "OPEN", payload: { render: <Register />, title: "Register" } });
	};

	return (
		<ContainerBox classes={["welcome-section"]}>
			<section className="introduction-section">
				<img src={workflowPerson} alt="person-task" id="person-image" />
				<div className="text-subsection">
					<div className="main-text">
						<h1 className="home-page-title">Work-Flow</h1>
						<h2>work more collaboratively and get more done.</h2>
					</div>
					{/* <p className="home-page-description">
					Work-Flow is a web-based Kanban-style list making application used to manage work at personal or organizational level.
					Using this application organizing your team will be easy.
				</p> */}
					<div className="call-to-action home-page-description">
						<p className="call-toaction-text">start organizing now</p>
						<Button clicked={openRegisterModal} classes={["btn-accent"]}>
							Join Now
					</Button>
					</div>
				</div>
			</section>
			<section className="task-column-section">
				<div className="task-text">
					<h1>Tasks</h1>
					<h2>Create tasks and assign them to your teammates - add custom tags to differentiate tasks at a glance</h2>
				</div>
				<img src={taskColumns} alt="task-columns" className="task-columns-img" />
			</section>

		</ContainerBox>
	);
};

export default WelcomePage;
