import React, { useContext } from "react";
import Navbar from "components/Navbar/Navbar";
import Button from "components/Button/Button";
import ContainerBox from "components/ContainerBox/ContainerBox";
import Modal from "components/Modal/Modal";
import { LoginForm, RegisterForm } from "modalForms";
import "./App.scss";
import { ModalContext } from "context/ModalContext";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes/Routes";

function App() {

  const [, setRenderComp] = useContext(ModalContext);

  const openLoginModal = () => {
    setRenderComp({ render: <LoginForm />, show: true });
  }
  const openRegisterModal = () => {
    setRenderComp({ render: <RegisterForm />, show: true });
  }
  return (
    <div className="App">
      <Modal />
      <Navbar>
        <Button clicked={openLoginModal}>Login</Button>
        <Button clicked={openRegisterModal}>Register</Button>
      </Navbar>
      <ContainerBox>
        <Router>
          <Routes />
        </Router>
      </ContainerBox>
    </div>
  );
}

export default App;
