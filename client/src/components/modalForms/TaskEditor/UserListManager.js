import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchInput from "components/general/SearchInput";
import User from "components/board/User";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { searchUserInBoard } from "service";


const UserListManager = ({ users, setUsers, boardId }) => {

    const [userSearchResult, setUserSearchResult] = useState([]);

    const searchUser = async (username) => {
        const { data } = await searchUserInBoard({ boardId, username });
        setUserSearchResult(
            data
                .filter(({ user }) => users.findIndex(({ _id }) => _id === user._id) < 0)
                .map(({ user }) => ({ ...user, text: user.username }))
        );
    };
    const addUserToList = (user) => {
		setUsers((users) => {
			const newUsers = [...users];
			newUsers.push(user);
			return newUsers;
		});
		setUserSearchResult([]);
    };
    
    const removeUserFromList = (userIndex) => {
		setUsers((users) => {
			const newUsers = [...users];
			newUsers.splice(userIndex, 1);
			return newUsers;
		});
    };
    
    const clearUserSearchResults = () => {
		setUserSearchResult([]);
	};

    return (
      <div className="user-container">
        <SearchInput
          search={searchUser}
          debounceTimeout={700}
          result={userSearchResult}
          clickResult={addUserToList}
          clear={clearUserSearchResults}
        />
        <div className={`user-card-container ${users.length > 4 ? "overflow-scroll" : ""}`}>
          {users.map(({ _id, username, avatarImageURL }, index) => (
            <User key={_id} username={username} imageURL={avatarImageURL}>
              <RemoveCircleOutlineIcon
                className="remove-user-icon"
                onClick={() => removeUserFromList(index)}
              />
            </User>
          ))}
        </div>
      </div>
    );
}

UserListManager.propTypes = {
    users: PropTypes.array.isRequired,
    setUsers: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired
}

export default UserListManager
