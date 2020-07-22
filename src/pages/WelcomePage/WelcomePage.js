import React, { useContext } from "react";
import "./WelcomePage.scss";
import Button from "components/Button/Button";
import { ModalContext } from "context/ModalContext";
import workflowPerson from "assets/images/workflow-person.svg";

const WelcomePage = () => {

  const [, setRenderComp] = useContext(ModalContext);

  const openRegisterModal = () => {
    setRenderComp({show: true, render: "register form"});
  }

  return (
    <section className="welcome-section">
      <img src={workflowPerson} alt="person-task" id="person-image" />
      <div className="text-subsection">
        <h1 className="home-page-title" >Work-Flow</h1>
        <p className="home-page-description" >Work-Flow is an application meant for assigning task to your tramamtes more lorem ipsum, cos potem wymysle</p>
        <Button clicked={openRegisterModal} classes={["btn-accent"]}>Join Now</Button>
      </div>
    </section>
  );
};

export default WelcomePage;