import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchInput from "components/general/SearchInput";
import User from "components/board/User";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { searchUserInBoard } from "service";
import "./UserManager.scss";
import { UserManagerProps } from ".";

const UserManager: React.FC<UserManagerProps> = ({ users, setUsers, boardId }) => {
  const [userSearchResult, setUserSearchResult] = useState([]);

  const searchUser = async (username: string) => {
    const { data } = await searchUserInBoard({ boardId, username });
    setUserSearchResult(
      data
        .filter(({ user }: { user: any }) => users.findIndex(({ _id }) => _id === user._id) < 0)
        .map(({ user }: { user: any }) => ({ ...user, text: user.username }))
    );
  };
  const addUserToList = (user: any) => {
    setUsers((users: any) => {
      const newUsers = [...users];
      newUsers.push(user);
      return newUsers;
    });
    setUserSearchResult([]);
  };

  const removeUserFromList = (userIndex: number) => {
    setUsers((users: any) => {
      const newUsers = [...users];
      newUsers.splice(userIndex, 1);
      return newUsers;
    });
  };

  const clearUserSearchResults = () => {
    setUserSearchResult([]);
  };

  return (
    <div className="user-manager">
      <SearchInput
        search={searchUser}
        debounceTimeout={700}
        result={userSearchResult}
        clickResult={addUserToList}
        clear={clearUserSearchResults}
      />
      <div className="user-manager__users scrollbar">
        {users.map(({ _id, username, avatarImageURL }, index) => (
          <User key={_id} username={username} imageSrc={avatarImageURL}>
            <RemoveCircleOutlineIcon
              className="remove-user-icon"
              onClick={() => removeUserFromList(index)}
            />
          </User>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
