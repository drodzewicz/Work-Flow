import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "context/UserContext";
import SearchInput from "components/general/SearchInput";
import BoardMemberUser from "./BoardMemberUser/BoardMemberUser";
import Pagination, {PaginationI }  from "components/general/Pagination";
import "./BoardMembers.scss";
import { BoardMembersProps, Member, SearchedUser } from "./";
import { UserBoardRoles } from "types";
import {
  getBoardMembers,
  searchUsersByUsername,
  removeUserFromBoard,
  addUserToBoard,
  changeBoardUserRole,
} from "service";

import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const USER_LIMIT = 5;
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState<PaginationI>({current: 1,total: 1,});
  const [isPageLoading, setPageLoading] = useState(true);
  const [searchRes, setSearchRes] = useState<SearchedUser[]>([]);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  useEffect(() => {
    let _isMounted = true;

    const fetchBoardMembers = async () => {
      const { data } = await getBoardMembers({
        boardId,
        limit: USER_LIMIT,
        page: page.current,
      });
      if (_isMounted) setPageLoading(false);
      if (!!data && _isMounted) {
        const { totalPageCount, items } = data;
        setPage((pages) => ({ ...pages, total: totalPageCount }));
        setMembers(items);
      }
    };
    fetchBoardMembers();
    return () => {
      _isMounted = false;
    };
  }, [boardId, page.current]);

  const dynamicSearchHandler = async (username: string) => {
    const { data } = await searchUsersByUsername({ username });
    if (!!data) {
      const parsedResult = data.map((user: any) => ({
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
        return tempMembers;
      });
    }
  };
  const addUserToBoardHandler = async (user: any) => {
    setSearchRes([]);
    const { data } = await addUserToBoard({ boardId, userId: user._id });
    if (!!data && members.length < USER_LIMIT) {
      setMembers((members) => {
        const tempUsers = [...members];
        tempUsers.push({ user, role: UserBoardRoles.REGULAR });
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

  return (
    <div className="board-members-modal">
      {isAuthorized() && (
        <SearchInput
          search={dynamicSearchHandler}
          debounceTimeout={500}
          result={searchRes.filter(
            ({ _id }) => members.findIndex(({ user }) => user._id === _id) < 0
          )}
          clickResult={addUserToBoardHandler}
          clear={clearSearchResults}
        />
      )}
      <LoadingOverlay show={isPageLoading} opacity={0}>
        <div className="user-container">
          {members.map((member) => (
            <BoardMemberUser
              key={member.user._id}
              member={member}
              removeUser={removeUserFromBoardd}
              changeUserRole={changeUserRole}
            />
          ))}
        </div>
      </LoadingOverlay>

      <Pagination {...page} handleChange={changePageHandler} />
    </div>
  );
};

export default BoardMembers;
