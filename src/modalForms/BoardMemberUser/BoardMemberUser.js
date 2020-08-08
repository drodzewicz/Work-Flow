import React, { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { ReactComponent as Admin } from "assets/images/Admin.svg";
import { ReactComponent as Crown } from "assets/images/crown.svg";
import { ReactComponent as Visitor } from "assets/images/visitor.svg";
import { ReactComponent as RegularUser } from "assets/images/regular-user.svg";
import User from "components/User/User";
import "./BoardMemberUser.scss";

const BoardMemberUser = ({ username, imageLink, userType }) => {
  const [userTypeOption, setUserTypeOption] = useState(false);
  const [options, setOptions] = useState(false);

  const toggleOptions = (e) => {
    e.stopPropagation();
    setOptions(!options);
  };
  const toggleUserTypeOptions = (e) => {
    e.stopPropagation();
    setUserTypeOption(!userTypeOption);
  };

  const userTypeIcon = (type) => {
    switch (type) {
      case "owner":
        return <Crown />;
      case "admin":
        return <Admin />;
      case "regular":
        return <RegularUser />;
      case "guest":
        return <Visitor />;
      default:
        return null;
    }
  };
  return (
    <div className="board-user">
      <User username={username} imageLink={imageLink}>
        <div className="user-type" onClick={toggleUserTypeOptions}>
          {userTypeIcon(userType)}
        </div>
        <MoreVertIcon onClick={toggleOptions} />
        {userType !== "owner" && userTypeOption && (
          <DropdownMenu closeMenu={toggleUserTypeOptions}>
            {userType !== "admin" && <Admin />}
            {userType !== "regular" && <RegularUser />}
            {userType !== "guest" && <Visitor />}
          </DropdownMenu>
        )}
        {options && (
          <DropdownMenu closeMenu={toggleOptions}>
            <span>remove</span>
          </DropdownMenu>
        )}
      </User>
    </div>
  );
};

export default BoardMemberUser;
