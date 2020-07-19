import React, { useContext } from "react";
import Navbar from "components/Navbar/Navbar";
import Button from "components/Button/Button";
import ContainerBox from "components/ContainerBox/ContainerBox";
import { WelcomePage } from "pages";
import Modal from "components/Modal/Modal";

import "./App.scss";
import { ModalContext } from "context/ModalContext";

function App() {

  const [, setRenderComp] = useContext(ModalContext);

  const openLoginModal = () => {
    setRenderComp({ render: "Login form", show: true });
  }
  const openRegisterModal = () => {
    setRenderComp({ render: "Register form", show: true });
  }
  return (
    <div className="App">
      <Modal />
      <Navbar>
        <Button clicked={openLoginModal}>Login</Button>
        <Button clicked={openRegisterModal}>Register</Button>
      </Navbar>
      <ContainerBox>
        <WelcomePage />
      </ContainerBox>
    </div>
  );
}

export default App;
