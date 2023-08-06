import React from "react";

import { UserBoardRoles, UserShortI } from "@/types/general";

import { BoardMembersProps } from "./types";

import { Link } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";

import useGetBoardMembers from "@/service/useGetBoardMembers";
import useGetUserBoardPermissions from "@/service/useGetUserBoardPermissions";

import Button from "@/components/general/Button/Button";
import Pagination from "@/components/general/Pagination";
import SearchInput from "@/components/general/SearchInput";

import UserLoading from "@/components/board/User/UserLoading";

import "./BoardMembers.scss";

import BoardMemberUser from "./BoardMemberUser/BoardMemberUser";

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const { currentPage, totalPages, limit, setCurrentPage, setTotalItems } = usePagination({
    initialPage: 1,
    limit: 8,
  });

  const { data, isLoading } = useGetBoardMembers({
    boardId,
    page: currentPage,
    limit,
    onSuccess: (data) => {
      setTotalItems(data.totalCount);
    },
  });

  const { data: permissions } = useGetUserBoardPermissions({ boardId });

  const dynamicSearchHandler = async (username: string) => {
    //
  };
  const removeUserFromBoarHandler = async (memberId: string) => {
    //
  };
  const addUserToBoardHandler = async (user: UserShortI) => {
    //
  };
  const clearSearchResults = () => {
    //
  };
  const changeUserRole = async (userId: string, newRole: UserBoardRoles) => {
    //
  };

  return (
    <div className="board-members">
      <Link to={`/board/${boardId}/settings`}>Manage members</Link>
      <SearchInput
        search={dynamicSearchHandler}
        debounceTimeout={500}
        result={[]}
        clickResult={addUserToBoardHandler}
        clear={clearSearchResults}
      />
      {data?.members.map((member) => (
        <BoardMemberUser
          key={member.user._id}
          member={member}
          removeUser={removeUserFromBoarHandler}
          changeUserRole={changeUserRole}
        />
      ))}
      {isLoading && [...Array(limit)].map((_, index) => <UserLoading key={index} />)}

      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
    </div>
  );
};

export default BoardMembers;
