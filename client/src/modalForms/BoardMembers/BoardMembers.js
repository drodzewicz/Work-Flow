import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import SearchInput from "components/SearchInput";
import BoardMemberUser from "./BoardMemberUser";
import Pagination from "components/Pagination/Pagination";
import "./BoardMembers.scss";
import PropTypes from "prop-types";
import {
  getBoardMembers,
  searchUsersByUsername,
  removeUserFromBoard,
  addUserToBoard,
  changeBoardUserRole,
} from "service";
import LoadingOverlay from "components/LoadingOverlay/LoadingOverlay";

const BoardMembers = ({ boardId }) => {
  const USER_LIMIT = 5;
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, amountOfPages: 1 });
  const [isPageLoading, setPageLoading] = useState(true);
  const [searchRes, setSearchRes] = useState([]);
  const [{ currentBoard }] = useContext(UserContext);

  useEffect(() => {
    let _isMounted = true;

    const fetchBoardMembers = async () => {
      const { data } = await getBoardMembers({
        boardId,
        limit: USER_LIMIT,
        page: page.currentPage,
      });
      if (_isMounted) setPageLoading(false);
      if (!!data && _isMounted) {
        const { totalPageCount, items } = data;
        setPage((pages) => ({ ...pages, amountOfPages: totalPageCount }));
        setMembers(items);
      }
    };
    fetchBoardMembers();
    return () => {
      _isMounted = false;
    };
  }, [boardId, page.currentPage]);

  const dynamicSearchHandler = async (username) => {
    const { data } = await searchUsersByUsername({ username });
    if (!!data) {
      const parsedResult = data.map((user) => ({
        ...user,
        text: user.username,
      }));
      setSearchRes(parsedResult);
    }
  };
  const changePageHandler = (pageNumber) => {
    setPage((pages) => ({ ...pages, currentPage: pageNumber }));
  };
  const removeUserFromBoardd = async (memberId) => {
	  const { data } = await removeUserFromBoard({ userId: memberId, boardId });
    if (!!data) {
      setMembers((members) => {
        const tempMembers = [...members];
        const indexOfFoundMember = tempMembers.findIndex(({ id }) => id === memberId);
        tempMembers.splice(indexOfFoundMember, 1);
        return tempMembers;
      });
    }
  };
  const addUserToBoardHandler = async (user) => {
    setSearchRes([]);
	  const { data } = await addUserToBoard({ boardId, userId: user._id });
		  
    if (!!data && members.length < USER_LIMIT) {
      setMembers((members) => {
        const tempUsers = [...members];
        tempUsers.push({ user, role: "regular" });
        return tempUsers;
      });
    }
  };
  const clearSearchResults = () => {
    setSearchRes([]);
  };
  const changeUserRole = async (userId, newRole) => {
    const foundUserIndex = members.findIndex(({ user }) => user._id === userId);
	  const { status } = await changeBoardUserRole({ boardId, userId, newRole });
    if (status === 200) {
      setMembers((members) => {
        const newMembers = [...members];
        newMembers[foundUserIndex].role = newRole;
        return newMembers;
      });
    }
  };

  const isAuthorized = () => {
    const { role } = currentBoard;
    return role === "owner" || role === "admin";
  };

  return (
    <div className="board-members-modal">
      {isAuthorized() && (
        <SearchInput
          search={dynamicSearchHandler}
          debouceTimeout={500}
          result={searchRes.filter(
            ({ _id }) => members.findIndex(({ user }) => user._id === _id) < 0
          )}
          clickResult={addUserToBoardHandler}
          clear={clearSearchResults}
        />
      )}
      <LoadingOverlay show={isPageLoading} opacity={0}>
        <div className="user-container">
          {members.map(({ user, role }) => (
            <BoardMemberUser
              key={user._id}
              removeUser={() => removeUserFromBoardd(user._id)}
              userId={user._id}
              username={user.username}
              imageURL={user.avatarImageURL}
              userType={role}
              changeUserRole={changeUserRole}
            />
          ))}
        </div>
      </LoadingOverlay>

      <Pagination
        amountOfPages={page.amountOfPages}
        currentPage={page.currentPage}
        handleChange={changePageHandler}
      />
    </div>
  );
};

BoardMembers.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export default BoardMembers;
