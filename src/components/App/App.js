import React, { useContext } from "react";
import Navbar from "components/Navbar/Navbar";
import ContainerBox from "components/ContainerBox/ContainerBox";
import Modal from "components/Modal/Modal";
import { LoginForm, RegisterForm } from "modalForms";
import "./App.scss";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Routes from "routes/Routes";
import NavItem from "components/Navbar/NavItem";
import DropdownMenu from "components/DropdownMenu/DropdownMenu"

function App() {

  const [, setRenderComp] = useContext(ModalContext);
  const [user, setUser] = useContext(UserContext);

  const openLoginModal = () => {
    setRenderComp({ render: <LoginForm />, show: true });
  }
  const openRegisterModal = () => {
    setRenderComp({ render: <RegisterForm />, show: true });
  }
  const logOutUser = () => {
    console.log("log out");
    setUser(null);
  }

  const loggedInUserNavItems = () => {
    return (
      <>
        <NavItem icon={<HomeIcon />} />
        <NavItem icon={<AccountBoxIcon />} navName={user} >
          <Link to="/profile">Profile</Link>
          <span onClick={logOutUser}>logout</span>
          <span>switch</span>
        </NavItem>
        <NavItem
          icon={
            <Badge color="secondary" variant="dot" invisible={false} >
              <NotificationsIcon />
            </Badge>
          } >
        </NavItem>
      </>
    );
  };
  const loggedOutUserNavItems = () => {
    return (
      <>
        <NavItem navName="Login" clicked={openLoginModal} />
        <NavItem navName="Register" clicked={openRegisterModal} />
      </>
    );
  };

  return (
    <div className="App">
      <Router>
        <Modal />
        <Navbar>
          {
            user
              ? loggedInUserNavItems()
              : loggedOutUserNavItems()
          }

        </Navbar>
        <ContainerBox>
          <Routes />
        </ContainerBox>
      </Router>

    </div>
  );
}

export default App;
