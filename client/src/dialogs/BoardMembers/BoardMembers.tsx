import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import SearchInput from "components/general/SearchInput";
import BoardMemberUser from "./BoardMemberUser/BoardMemberUser";
import Pagination, { PaginationI } from "components/general/Pagination";
import "./BoardMembers.scss";
import { BoardMembersProps, SearchedUser } from ".";
import { UserBoardRoles, UserShortI } from "types/general";
import {
  getBoardMembers,
  searchUsersByUsername,
  removeUserFromBoard,
  addUserToBoard,
  changeBoardUserRole,
} from "service";
import { BoardUserI } from "types/general";

import LoadingOverlay from "components/layout/LoadingOverlay";

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const USER_LIMIT = 10;
  const [members, setMembers] = useState<BoardUserI[]>([]);
  const [page, setPage] = useState<PaginationI>({ current: 1, total: 1 });
  const [isPageLoading, setPageLoading] = useState(true);
  const [searchRes, setSearchRes] = useState<SearchedUser[]>([]);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  useEffect(() => {
    let _isMounted = true;

    const fetchBoardMembers = async () => {
      const { data } = await getBoardMembers({ boardId });
      if (_isMounted) setPageLoading(false);
      if (!!data && _isMounted) {
        const { members } = data;
        setPage((pages) => ({ ...pages, total: Math.ceil(members.length / USER_LIMIT) }));
        setMembers(members);
      }
    };
    fetchBoardMembers();
    return () => {
      _isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const dynamicSearchHandler = async (username: string) => {
    if (username.length < 3) return;
    const { data } = await searchUsersByUsername({ username });
    if (!!data) {
      const parsedResult = data
        .filter(({ _id }) => !members.find(({ user }) => user._id === _id))
        .map((user: UserShortI) => ({
          ...user,
          text: user.username,
        }));
      setSearchRes(parsedResult);
    }
  };
  const changePageHandler = (pageNumber: number) => {
    setPage((pages) => ({ ...pages, current: pageNumber }));
  };
  const removeUserFromBoardd = async (memberId: string) => {
    const { data } = await removeUserFromBoard({ userId: memberId, boardId });
    if (!!data) {
      setMembers((members) => {
        const tempMembers = [...members];
        const indexOfFoundMember = tempMembers.findIndex(({ user }) => user._id === memberId);
        tempMembers.splice(indexOfFoundMember, 1);
        setPage((pages) => ({ ...pages, total: Math.ceil(tempMembers.length / USER_LIMIT) }));
        return tempMembers;
      });
    }
  };
  const addUserToBoardHandler = async (user: UserShortI) => {
    setSearchRes([]);
    const { data } = await addUserToBoard({ boardId, userId: user._id });
    if (!!data) {
      setMembers((members) => {
        const tempUsers = [...members];
        tempUsers.push({ user, role: UserBoardRoles.REGULAR });
        setPage((pages) => ({ ...pages, total: Math.ceil(tempUsers.length / USER_LIMIT) }));
        return tempUsers;
      });
    
    }
  };
  const clearSearchResults = () => {
    setSearchRes([]);
  };
  const changeUserRole = async (userId: string, newRole: UserBoardRoles) => {
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
    return role === UserBoardRoles.OWNER || role === UserBoardRoles.ADMIN;
  };
  const paginatedMembers = () => {
    return members.slice(USER_LIMIT * (page.current - 1), USER_LIMIT * page.current);
  };

  return (
    <div className="board-members">
      {isAuthorized() && (
        <SearchInput
          search={dynamicSearchHandler}
          debounceTimeout={500}
          result={searchRes}
          clickResult={addUserToBoardHandler}
          clear={clearSearchResults}
        />
      )}
      <LoadingOverlay className="board-members__members" show={isPageLoading} opacity={0}>
        {paginatedMembers().map((member) => (
          <BoardMemberUser
            key={member.user._id}
            member={member}
            removeUser={removeUserFromBoardd}
            changeUserRole={changeUserRole}
          />
        ))}
      </LoadingOverlay>
      <Pagination {...page} handleChange={changePageHandler} />
    </div>
  );
};

export default BoardMembers;
