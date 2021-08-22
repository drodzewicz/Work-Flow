import React, { useState, useContext, useRef } from "react";
import { UserContext } from "context/UserContext";
import SearchInput from "components/general/SearchInput";
import BoardMemberUser from "./BoardMemberUser/BoardMemberUser";
import Pagination from "components/general/Pagination";
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
import { usePagination } from "Hooks/usePagination";

import LoadingOverlay from "components/layout/LoadingOverlay";

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const isMounted = useRef<boolean>(false);
  const [isPageLoading, setPageLoading] = useState(true);
  const [searchRes, setSearchRes] = useState<SearchedUser[]>([]);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  const testfetchBoardMembers = async (page: number, limit: number) => {
    setPageLoading(true);
    const { data } = await getBoardMembers({ boardId, limit, page });
    setPageLoading(false);
    if (!!data) {
      const { members, totalPageCount } = data;
      return { items: members, totalPageCount: totalPageCount || 1 };
    }
    return { items: [], totalPageCount: 1 };
  };

  const {
    currentPage,
    totalPages,
    limit,
    setCurrentPage,
    setTotalPages,
    setItems: setMembers,
    items: members,
  } = usePagination<BoardUserI>({
    initialPage: 1,
    limit: 10,
    onPageChangeCallback: testfetchBoardMembers,
  });

  const fetchBoardMembers = async () => {
    setPageLoading(true);
    const { data } = await getBoardMembers({ boardId, limit, page: currentPage });
    if (isMounted.current) setPageLoading(false);

    if (!!data && isMounted.current) {
      const { members, totalPageCount } = data;
      setTotalPages(totalPageCount || 1);
      setMembers(members);
    }
  };
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
  const removeUserFromBoarHandler = async (memberId: string) => {
    const { data } = await removeUserFromBoard({ userId: memberId, boardId });
    if (!!data) fetchBoardMembers();
  };
  const addUserToBoardHandler = async (user: UserShortI) => {
    setSearchRes([]);
    const { data } = await addUserToBoard({ boardId, userId: user._id });
    if (!!data) fetchBoardMembers();
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
        {members.map((member) => (
          <BoardMemberUser
            key={member.user._id}
            member={member}
            removeUser={removeUserFromBoarHandler}
            changeUserRole={changeUserRole}
          />
        ))}
      </LoadingOverlay>
      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
    </div>
  );
};

export default BoardMembers;
