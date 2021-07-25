import React, { useState } from "react";
import SearchInput from "components/general/SearchInput";
import User from "components/board/User";
import { FaUserMinus } from "react-icons/fa";
import { getBoardMembers } from "service";
import "./UserManager.scss";
import { UserManagerProps } from ".";
import { BoardUserI } from "types/general";

interface BoardUserSearchRes extends BoardUserI {
  _id: string;
  text: string;
}

const UserManager: React.FC<UserManagerProps> = ({ users, setUsers, boardId }) => {
  const [userSearchResult, setUserSearchResult] = useState<BoardUserSearchRes[]>([]);

  const searchUser = async (username: string) => {
    const { data } = await getBoardMembers({ boardId, username });
    if (!!data) {
      const { members } = data;
      const filteredMembers = members.filter(({ user }) => {
        const foundUser = users.find(({ _id }) => _id === user._id);
        return !foundUser;
      });

      setUserSearchResult(
        filteredMembers.map((member) => ({
          ...member,
          text: member.user.username,
          _id: member.user._id,
        }))
      );
    }
  };
  const addUserToList = (boardUser: any) => {
    setUsers((users: any) => {
      const newUsers = [...users];
      newUsers.push(boardUser.user);
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
            <FaUserMinus
              className="remove-user-icon"
              onClick={() => removeUserFromList(index)}
            />
          </User>
        ))}
        {users.length < 1 && (
          <i className="user-manager__no-content-msg">No user has been assinged</i>
        )}
      </div>
    </div>
  );
};

export default UserManager;
