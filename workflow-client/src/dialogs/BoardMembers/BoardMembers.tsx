import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import {
  addUserToBoard,
  changeBoardUserRole,
  getBoardMembers,
  removeUserFromBoard,
  searchUsersByUsername,
} from "@/service";
import { UserBoardRoles, UserShortI } from "@/types/general";
import { BoardUserI } from "@/types/general";
import axios, { CancelTokenSource } from "axios";

import { UserContext } from "@/context/UserContext";

import { usePagination } from "@/hooks/usePagination";

import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";

import LoadingOverlay from "@/components/layout/LoadingOverlay";

import BoardMemberUser from "./BoardMemberUser/BoardMemberUser";
import "./BoardMembers.scss";
import { BoardMembersProps, SearchedUser } from "./types";

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const [isPageLoading, setPageLoading] = useState(true);
  const [searchRes, setSearchRes] = useState<SearchedUser[]>([]);
  const [members, setMembers] = useState<BoardUserI[]>([]);
  const source = useRef<CancelTokenSource | null>(null);

  const {
    userState: { currentBoard },
  } = useContext(UserContext);
  const { currentPage, totalPages, limit, setCurrentPage, setTotalPages } = usePagination({
    initialPage: 1,
    limit: 10,
  });

  const fetchBoardMembers = useCallback(async () => {
    const { data } = await getBoardMembers({
      boardId,
      limit,
      page: currentPage,
      cancelToken: source.current?.token,
      setLoading: setPageLoading,
    });

    if (data) {
      const { members, totalPageCount } = data;
      setTotalPages(totalPageCount || 1);
      setMembers(members);
    }
  }, [boardId, limit, currentPage, setTotalPages]);

  useEffect(() => {
    source.current = axios.CancelToken.source();
    fetchBoardMembers();
    return () => {
      source.current?.cancel();
    };
  }, [fetchBoardMembers]);

  const dynamicSearchHandler = async (username: string) => {
    if (username.length < 3) return;
    const { data } = await searchUsersByUsername({ username });
    if (data) {
      const parsedResult = data
        .filter(({ _id }: any) => !members.find(({ user }) => user._id === _id))
        .map((user: UserShortI) => ({
          ...user,
          text: user.username,
        }));
      setSearchRes(parsedResult);
    }
  };
  const removeUserFromBoarHandler = async (memberId: string) => {
    const { data } = await removeUserFromBoard({ userId: memberId, boardId });
    if (data) fetchBoardMembers();
  };
  const addUserToBoardHandler = async (user: UserShortI) => {
    setSearchRes([]);
    const { data } = await addUserToBoard({ boardId, userId: user._id });
    if (data) fetchBoardMembers();
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
          result={searchRes as any}
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
