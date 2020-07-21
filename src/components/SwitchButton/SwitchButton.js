import React from "react";
import "./SwitchButton.scss";
import {UserContext} from "context/UserContext";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';

const SwitchButton = () => {
  const [test, setTest] = React.useState(false);
  const [user, setUser] = React.useContext(UserContext);
  const toggle = () => {
    setTest(!test);
    // setUser({...user, theme: !user.theme })
  }
  return (
    <div onClick={toggle} className={`switch-button ${test ? "switch-on" : ""}`}>
      <div className="circle">
        {
          test ? <Brightness3Icon /> : <Brightness7Icon />
        }
      </div>
    </div>
  )
}

export default SwitchButton
