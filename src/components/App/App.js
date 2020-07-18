import React from "react";
import Navbar from "components/Navbar/Navbar";
import Button from "components/Button/Button";


import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Button>Login</Button>
        <Button>Register</Button>
      </Navbar>
      <section className="welcome-section">
        <img src="images/workflow-person.svg" alt="person-task" id="person-image"/>
        <div className="text-subsection">
          <h1 className="home-page-title" >Work-Flow</h1>
          <p className="home-page-description" >Work-Flow is an application meant for assigning task to your tramamtes more lorem ipsum, cos potem wymysle</p>
          <Button classes={["btn-accent"]}>Join Now</Button>
        </div>
      </section>
    </div>
  );
}

export default App;
