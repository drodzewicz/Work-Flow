import React, { useContext, useState } from "react";
import Navbar from "components/Navbar/Navbar";
import ContainerBox from "components/ContainerBox/ContainerBox";
import Modal from "components/Modal/Modal";
import { Login, Register } from "modalForms";
import "./App.scss";
import { ModalContext } from "context/ModalContext";
import { UserContext } from "context/UserContext";
import { useHistory, Link } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Routes from "routes/Routes";
import NavItem from "components/Navbar/NavItem";
import SwitchButton from "components/SwitchButton/SwitchButton";
import Notification from "components/Notification/Notification";
import Footer from "components/Footer/Footer";

function App() {
  const [, modalDispatch] = useContext(ModalContext);
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const [notifications, setNotification] = useState([
    { board: "wix websiite", message: "you have been added to the board" },
    {
      board: "learing wordpress with friends",
      message:
        "you have been added to the boardyou have been addeddwd dwdwd dwdwd",
    },
    { board: "making apython game", message: "you got a new task" },
  ]);

  const openLoginModal = () => {
    modalDispatch({
      type: "OPEN",
      payload: { render: <Login />, title: "Login" },
    });
  };
  const openRegisterModal = () => {
    modalDispatch({
      type: "OPEN",
      payload: { render: <Register />, title: "Register" },
    });
  };
  const logOutUser = () => {
    console.log("log out");
    setUser({ ...user, username: null });
  };
  const removeMessage = (index) => {
    let tempNotification = [...notifications];
    tempNotification.splice(index, 1);
    setNotification(tempNotification);
  };
  const goToHomePage = () => {
    history.push("/");
  };

  const loggedInUserNavItems = () => {
    return (
      <>
        <NavItem clicked={goToHomePage} icon={<HomeIcon />} />
        <NavItem
          icon={<AccountBoxIcon />}
          navName={user.username}
          classes={["profile-nav"]}
        >
          <Link to="/profile">Profile</Link>
          <button className="logout-btn" onClick={logOutUser}>
            logout
          </button>
          <SwitchButton />
        </NavItem>
        <NavItem
          classes={["notification-nav"]}
          icon={
            <Badge
              color="secondary"
              variant="dot"
              invisible={notifications.length < 1}
            >
              <NotificationsIcon />
            </Badge>
          }
        >
          {notifications.map((data, index) => (
            <Notification
              key={data.board}
              message={data.message}
              boardTitle={data.board}
              removeNotification={() => removeMessage(index)}
            />
          ))}
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
      <Modal />
      <Navbar>
        {user.username ? loggedInUserNavItems() : loggedOutUserNavItems()}
      </Navbar>
      <ContainerBox>
        <Routes />
      </ContainerBox>
      <Footer />
    </div>
  );
}

export default App;
