import React, { useState } from "react";
import PropTypes from "prop-types";
import AutoCompleteInput from "components/AutoCompleteInput/AutoCompleteInput";
import User from "components/User/User";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import fetchData from "helper/fetchData";


const UserListManager = ({ users, setUsers, boardId }) => {

    const [userSearchResult, setUserSearchResult] = useState([]);

    const searchUser = async (username) => {
        const { data } = await fetchData({
            method: "GET",
            url: `/board/${boardId}/members?username=${username}`,
            token: true,
        });
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
            <AutoCompleteInput
                execMethod={searchUser}
                timeout={700}
                searchResult={userSearchResult}
                clickResult={addUserToList}
                clearResults={clearUserSearchResults}
            />
            <div
                className={`user-card-container ${users.length > 4 ? "overflow-scroll" : ""
                    }`}
            >
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
    )
}

UserListManager.propTypes = {
    users: PropTypes.array.isRequired,
    setUsers: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired
}

export default UserListManager
